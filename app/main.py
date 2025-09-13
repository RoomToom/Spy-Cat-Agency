from fastapi import FastAPI
from .api.routers.cats import router as cats_router
from .api.routers.missions import router as missions_router
from .api.routers.targets import router as targets_router
from .core.config import settings

app = FastAPI(title="Spy Cat Agency API")
app.include_router(cats_router, prefix=settings.API_V1_STR)
app.include_router(missions_router, prefix=settings.API_V1_STR)
app.include_router(targets_router, prefix=settings.API_V1_STR)
