-- ==========================================
-- The Culinary Guild — PostgreSQL Schema
-- ==========================================
-- Version: 1.0.0
-- Last updated: 2026-03-21

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==========================================
-- USERS & PROGRESSION
-- ==========================================

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    avatar_url TEXT,
    rank_id VARCHAR(50) DEFAULT 'novice',
    xp INTEGER DEFAULT 0,
    completed_trials INTEGER DEFAULT 0,
    favorite_guild_id VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_active_at TIMESTAMPTZ DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE,
    preferences JSONB DEFAULT '{}'::jsonb,
    CONSTRAINT xp_non_negative CHECK (xp >= 0)
);

CREATE TABLE IF NOT EXISTS ranks (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    tier INTEGER NOT NULL,
    min_xp INTEGER NOT NULL,
    max_xp INTEGER,
    icon VARCHAR(10),
    color VARCHAR(20),
    description TEXT,
    CONSTRAINT tier_positive CHECK (tier > 0),
    CONSTRAINT min_xp_non_negative CHECK (min_xp >= 0)
);

CREATE TABLE IF NOT EXISTS badges (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(10),
    rarity VARCHAR(20) DEFAULT 'common' CHECK (rarity IN ('common', 'uncommon', 'rare', 'epic', 'legendary')),
    condition_description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    badge_id VARCHAR(100) NOT NULL REFERENCES badges(id),
    earned_at TIMESTAMPTZ DEFAULT NOW(),
    earned_from_trial_id UUID,
    UNIQUE(user_id, badge_id)
);

-- ==========================================
-- GUILDS
-- ==========================================

CREATE TABLE IF NOT EXISTS guilds (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    icon VARCHAR(10),
    tagline TEXT,
    description TEXT,
    philosophy TEXT,
    color VARCHAR(20),
    signature_techniques TEXT[],
    featured_dishes TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS guild_ranks (
    id VARCHAR(100) PRIMARY KEY,
    guild_id VARCHAR(50) NOT NULL REFERENCES guilds(id),
    name VARCHAR(100) NOT NULL,
    tier INTEGER NOT NULL,
    requirements TEXT,
    perks TEXT[],
    icon VARCHAR(10),
    CONSTRAINT tier_positive CHECK (tier > 0)
);

CREATE TABLE IF NOT EXISTS guild_memberships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    guild_id VARCHAR(50) NOT NULL REFERENCES guilds(id),
    rank_id VARCHAR(100) REFERENCES guild_ranks(id),
    xp INTEGER DEFAULT 0,
    quests_completed INTEGER DEFAULT 0,
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, guild_id)
);

CREATE TABLE IF NOT EXISTS guild_lessons (
    id VARCHAR(100) PRIMARY KEY,
    guild_id VARCHAR(50) NOT NULL REFERENCES guilds(id),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    difficulty VARCHAR(30),
    duration_minutes INTEGER,
    topics TEXT[],
    content JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS guild_quests (
    id VARCHAR(100) PRIMARY KEY,
    guild_id VARCHAR(50) NOT NULL REFERENCES guilds(id),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    objectives TEXT[],
    reward TEXT,
    xp_reward INTEGER DEFAULT 0,
    difficulty VARCHAR(30),
    deadline TIMESTAMPTZ,
    is_seasonal BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_quest_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    quest_id VARCHAR(100) NOT NULL REFERENCES guild_quests(id),
    status VARCHAR(20) DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'failed', 'abandoned')),
    progress_data JSONB DEFAULT '{}'::jsonb,
    started_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    UNIQUE(user_id, quest_id)
);

-- ==========================================
-- KITCHEN TRIALS
-- ==========================================

CREATE TABLE IF NOT EXISTS trials (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    type VARCHAR(30) DEFAULT 'trial' CHECK (type IN ('trial', 'campaign', 'arena', 'studio', 'daily')),
    difficulty VARCHAR(30) NOT NULL,
    basket JSONB NOT NULL,
    constraints TEXT[],
    bonus_objective TEXT,
    scoring_focus TEXT[],
    time_limit_minutes INTEGER NOT NULL,
    cuisine_style VARCHAR(100),
    description TEXT,
    hints TEXT[],
    judge_personality VARCHAR(30) DEFAULT 'classical',
    guild_id VARCHAR(50) REFERENCES guilds(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS daily_trials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trial_id VARCHAR(100) NOT NULL REFERENCES trials(id),
    date DATE NOT NULL UNIQUE,
    participants INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS trial_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trial_id VARCHAR(100) NOT NULL REFERENCES trials(id),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    dish_name VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    techniques_used TEXT[],
    plating_notes TEXT,
    completion_time_minutes INTEGER,
    ingredients_used TEXT[],
    bonus_objective_met BOOLEAN DEFAULT FALSE,
    submitted_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS trial_scores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    submission_id UUID NOT NULL UNIQUE REFERENCES trial_submissions(id) ON DELETE CASCADE,
    trial_id VARCHAR(100) NOT NULL REFERENCES trials(id),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    total_score INTEGER NOT NULL CHECK (total_score BETWEEN 0 AND 100),
    flavor_score INTEGER CHECK (flavor_score BETWEEN 0 AND 30),
    technique_score INTEGER CHECK (technique_score BETWEEN 0 AND 25),
    creativity_score INTEGER CHECK (creativity_score BETWEEN 0 AND 20),
    presentation_score INTEGER CHECK (presentation_score BETWEEN 0 AND 15),
    constraint_score INTEGER CHECK (constraint_score BETWEEN 0 AND 10),
    judge_commentary TEXT,
    suggestions TEXT[],
    highlights TEXT[],
    xp_earned INTEGER DEFAULT 0,
    judged_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- RECIPES
-- ==========================================

CREATE TABLE IF NOT EXISTS recipes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(300) NOT NULL,
    description TEXT,
    cuisine VARCHAR(100),
    difficulty VARCHAR(30),
    prep_time_minutes INTEGER,
    cook_time_minutes INTEGER,
    servings INTEGER,
    ingredients JSONB NOT NULL,
    instructions JSONB NOT NULL,
    flavor_tags TEXT[],
    technique_tags TEXT[],
    sauce_suggestions TEXT[],
    spice_suggestions TEXT[],
    pairing_suggestions JSONB,
    cultural_notes TEXT,
    author_note TEXT,
    is_ai_generated BOOLEAN DEFAULT TRUE,
    created_by_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    guild_id VARCHAR(50) REFERENCES guilds(id),
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_saved_recipes (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
    saved_at TIMESTAMPTZ DEFAULT NOW(),
    notes TEXT,
    PRIMARY KEY (user_id, recipe_id)
);

-- ==========================================
-- ANIME
-- ==========================================

CREATE TABLE IF NOT EXISTS anime_series (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(300) NOT NULL,
    alternate_title VARCHAR(300),
    year INTEGER,
    studio VARCHAR(200),
    food_style TEXT,
    cuisine_family VARCHAR(200),
    setting_type TEXT,
    recurring_themes TEXT[],
    real_world_analogs TEXT[],
    food_philosophy TEXT,
    overview TEXT,
    image_url TEXT,
    tags TEXT[],
    member_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS anime_dishes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    series_id VARCHAR(100) NOT NULL REFERENCES anime_series(id),
    name VARCHAR(300) NOT NULL,
    original_name VARCHAR(300),
    episode_reference VARCHAR(100),
    ingredients TEXT[],
    technique TEXT,
    difficulty VARCHAR(30),
    plating_notes TEXT,
    flavor_profile TEXT[],
    recreation_guide TEXT,
    cultural_context TEXT,
    immersion_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS anime_food_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    series_id VARCHAR(100) NOT NULL UNIQUE REFERENCES anime_series(id),
    atmospheric_notes TEXT,
    recommended_difficulty VARCHAR(30),
    confidence_score INTEGER CHECK (confidence_score BETWEEN 0 AND 100),
    inference_source VARCHAR(30) DEFAULT 'curated' CHECK (inference_source IN ('curated', 'ai', 'community')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- SPICES
-- ==========================================

CREATE TABLE IF NOT EXISTS spices (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    alternate_name VARCHAR(200),
    origin VARCHAR(200),
    region VARCHAR(100),
    flavor_profile TEXT[],
    intensity INTEGER CHECK (intensity BETWEEN 1 AND 5),
    best_uses TEXT[],
    cuisine_families TEXT[],
    pairing_suggestions TEXT[],
    historical_notes TEXT,
    preparation_tips TEXT,
    storage_notes TEXT,
    medical_notes TEXT,
    color VARCHAR(50),
    form TEXT[],
    tags TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- REGIONAL CUISINES
-- ==========================================

CREATE TABLE IF NOT EXISTS regional_cuisines (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    region VARCHAR(200) NOT NULL,
    country VARCHAR(200),
    signature_spices TEXT[],
    cooking_techniques TEXT[],
    staple_ingredients TEXT[],
    traditional_dishes JSONB,
    cultural_context TEXT,
    historical_notes TEXT,
    flavor_profile TEXT[],
    influenced_by TEXT[],
    influences TEXT[],
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- FLAVOR PAIRINGS
-- ==========================================

CREATE TABLE IF NOT EXISTS flavor_pairings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ingredient_a VARCHAR(200) NOT NULL,
    ingredient_b VARCHAR(200) NOT NULL,
    confidence INTEGER CHECK (confidence BETWEEN 0 AND 100),
    reason TEXT,
    category VARCHAR(50),
    cuisine_contexts TEXT[],
    source VARCHAR(30) DEFAULT 'curated',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(ingredient_a, ingredient_b)
);

-- ==========================================
-- INDEXES
-- ==========================================

CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_rank ON users(rank_id);
CREATE INDEX IF NOT EXISTS idx_guild_memberships_user ON guild_memberships(user_id);
CREATE INDEX IF NOT EXISTS idx_guild_memberships_guild ON guild_memberships(guild_id);
CREATE INDEX IF NOT EXISTS idx_trial_submissions_user ON trial_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_trial_submissions_trial ON trial_submissions(trial_id);
CREATE INDEX IF NOT EXISTS idx_trial_scores_total ON trial_scores(total_score DESC);
CREATE INDEX IF NOT EXISTS idx_trial_scores_user ON trial_scores(user_id);
CREATE INDEX IF NOT EXISTS idx_recipes_cuisine ON recipes(cuisine);
CREATE INDEX IF NOT EXISTS idx_recipes_difficulty ON recipes(difficulty);
CREATE INDEX IF NOT EXISTS idx_anime_series_title ON anime_series USING gin(to_tsvector('english', title));
CREATE INDEX IF NOT EXISTS idx_spices_region ON spices(region);
CREATE INDEX IF NOT EXISTS idx_daily_trials_date ON daily_trials(date);

-- ==========================================
-- UPDATED AT TRIGGERS
-- ==========================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_recipes_updated_at
    BEFORE UPDATE ON recipes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
