create table if not exists users (
  id uuid primary key,
  email text unique not null,
  display_name text,
  created_at timestamptz default now()
);

create table if not exists user_profiles (
  user_id uuid primary key references users(id) on delete cascade,
  xp integer default 0,
  streak_days integer default 0,
  favorite_cuisines text[],
  dietary_preferences text[]
);

create table if not exists ingredients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text,
  aliases text[],
  seasonality text,
  is_anime_friendly boolean default false
);

create table if not exists ingredient_scans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete set null,
  image_url text not null,
  top_match text,
  confidence_score numeric(4,3),
  detected_at timestamptz default now(),
  saved_to_pantry boolean default false
);

create table if not exists safety_flags (
  id uuid primary key default gen_random_uuid(),
  scan_id uuid references ingredient_scans(id) on delete cascade,
  risk_level text not null,
  warning_type text,
  recommended_action text,
  notes text
);

create table if not exists anime_series (
  id uuid primary key default gen_random_uuid(),
  title text unique not null,
  dominant_food_style text,
  setting_type text,
  food_presence_score integer,
  notes text
);

create table if not exists challenges (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  mode text,
  difficulty text,
  time_limit integer,
  theme text
);
