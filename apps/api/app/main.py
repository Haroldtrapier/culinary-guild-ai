from fastapi import FastAPI
from app.routers import health, vision, recipes, anime, trials

app = FastAPI(title="The Culinary Guild API", version="0.1.0")

app.include_router(health.router)
app.include_router(vision.router, prefix="/api/vision", tags=["vision"])
app.include_router(recipes.router, prefix="/api/recipes", tags=["recipes"])
app.include_router(anime.router, prefix="/api/anime", tags=["anime"])
app.include_router(trials.router, prefix="/api/trials", tags=["trials"])
