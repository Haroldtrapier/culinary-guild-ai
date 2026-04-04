# API Reference

Base URL: `http://localhost:8000`

## Health

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |

## Vision

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/vision/identify` | Identify ingredient from image URL |
| POST | `/api/vision/safety-check` | Safety check for identified item |

## Recipes

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/recipes/generate` | Generate a recipe |
| POST | `/api/recipes/from-ingredient` | Get recipes for a given ingredient |

## Anime

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/anime/infer-style` | Infer food style from anime title |
| POST | `/api/anime/recreate-dish` | Generate inspired dish recreation |

## Trials

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/trials/generate` | Generate a mystery basket trial |
| POST | `/api/trials/judge` | Judge a submitted dish |
