# Imagen base con Python 3.12
# Imagen base con Python 3.12
FROM python:3.12-slim

# Establecer directorio de trabajo
WORKDIR /app

# Copiar y instalar dependencias
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el resto del proyecto
COPY . .

# Exponer puerto de FastAPI
EXPOSE 8000

# Comando para iniciar la app
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
