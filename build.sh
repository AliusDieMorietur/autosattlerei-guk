export POSTGRES_URL=postgresql://main:example@0.0.0.0:1234/main
export SECRET_TOKEN=42
export NEXT_PUBLIC_SERVER_URL=http://0.0.0.0:6732
export NEXT_PUBLIC_HOST_URL=https://autosattlerei-guk.de
export POSTGRES_USER=main
export POSTGRES_PASSWORD=example
export POSTGRES_DB=main
docker compose up --build -d 
