"""
The Culinary Guild — FastAPI Backend
Main application entry point with CORS, routers, and health check.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
from dotenv import load_dotenv

from routers import recipes, trials, anime, flavor

load_dotenv()

app = FastAPI(
    title="The Culinary Guild API",
    description="Premium AI culinary ecosystem — recipes, trials, anime food detection, and flavor intelligence.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS
origins = [
    "http://localhost:3000",
    "https://culinary-guild.vercel.app",
    os.getenv("FRONTEND_URL", "http://localhost:3000"),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(recipes.router, prefix="/api/recipes", tags=["Recipes"])
app.include_router(trials.router, prefix="/api/trials", tags=["Kitchen Trials"])
app.include_router(anime.router, prefix="/api/anime", tags=["Anime"])
app.include_router(flavor.router, prefix="/api/flavor", tags=["Flavor"])


@app.get("/")
async def root():
    return {
        "service": "The Culinary Guild API",
        "version": "1.0.0",
        "status": "operational",
        "modules": ["recipes", "trials", "anime", "flavor"],
    }


@app.get("/health")
async def health_check():
    """Health check endpoint for deployment monitoring."""
    return JSONResponse(
        status_code=200,
        content={
            "status": "healthy",
            "service": "culinary-guild-api",
            "version": "1.0.0",
        },
    )


@app.get("/api/status")
async def api_status():
    """Full API status with service availability."""
    import anthropic
    import openai

    anthropic_available = bool(os.getenv("ANTHROPIC_API_KEY"))
    openai_available = bool(os.getenv("OPENAI_API_KEY"))
    supabase_available = bool(os.getenv("SUPABASE_URL") and os.getenv("SUPABASE_ANON_KEY"))

    return {
        "status": "operational",
        "services": {
            "anthropic": "connected" if anthropic_available else "not configured",
            "openai": "connected" if openai_available else "not configured",
            "supabase": "connected" if supabase_available else "not configured",
        },
        "endpoints": {
            "recipes": "/api/recipes",
            "trials": "/api/trials",
            "anime": "/api/anime",
            "flavor": "/api/flavor",
        },
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8000)),
        reload=os.getenv("ENVIRONMENT", "development") == "development",
        log_level="info",
    )
