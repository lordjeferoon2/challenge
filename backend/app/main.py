from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.database import get_client, close_client
from app.routes import auth_routes, user_routes
from app.config import settings  # <-- importar la configuración

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    get_client()
    print("✅ Conexión a MongoDB inicializada")
    yield
    # Shutdown
    close_client()
    print("🛑 Conexión a MongoDB cerrada")

app = FastAPI(lifespan=lifespan)

# Configuración de CORS desde variable de entorno
origins = [origin.strip() for origin in settings.frontend_origins.split(",")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,      # dominios permitidos
    allow_credentials=True,     # permite enviar cookies/autenticación
    allow_methods=["*"],        # permite todos los métodos (GET, POST, etc.)
    allow_headers=["*"],        # permite todos los headers
)

# Incluir rutas
app.include_router(auth_routes.router, prefix="/api")
app.include_router(user_routes.router, prefix="/api")
