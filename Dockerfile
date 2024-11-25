FROM node:20-slim AS base-node
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base-node AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build
RUN pnpm deploy --filter=server --prod /prod/server

FROM base-node AS server
COPY --from=build /prod/server /prod/server
WORKDIR /prod/server
EXPOSE 3001
CMD [ "pnpm", "start" ]

FROM build AS migrator
WORKDIR /usr/src/app
CMD [ "pnpm", "run", "migrate" ]

