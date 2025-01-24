# https://github.com/casey/just
# https://just.systems/

dev:
    bun run dev

build:
    bun run build

start: build
    bun run preview

lint:
    bun run lint

format: lint
    bun run format

install:
    bun install
