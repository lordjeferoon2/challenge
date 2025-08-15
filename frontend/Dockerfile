# Etapa de build
# Cambiar AS builder a AS build-stage
# Cambiar AS builder a AS build-stage
FROM node:20-alpine AS build-stage
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=build-stage /app ./
EXPOSE 3000
CMD ["npm", "run", "start"]
