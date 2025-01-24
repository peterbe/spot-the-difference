# https://github.com/casey/just
# https://just.systems/

dev:
    bun run dev -- --port 3000

build:
    bun run build

start: build
    bun run preview -- --port 3000

lint:
    bun run lint

format: lint
    bun run format

install:
    bun install
