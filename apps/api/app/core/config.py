from pydantic import Field
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "The Culinary Guild API"
    debug: bool = False
    openai_api_key: str = Field(default="", alias="OPENAI_API_KEY")

    class Config:
        env_file = ".env"


settings = Settings()
