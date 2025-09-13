from fastapi import FastAPI
from .api.routers.cats import router as cats_router
from .api.routers.missions import router as missions_router
from .api.routers.targets import router as targets_router
from .core.config import settings
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Spy Cat Agency API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(cats_router, prefix=settings.API_V1_STR)
app.include_router(missions_router, prefix=settings.API_V1_STR)
app.include_router(targets_router, prefix=settings.API_V1_STR)
