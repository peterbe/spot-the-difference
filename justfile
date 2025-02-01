# https://github.com/casey/just
# https://just.systems/

dev:
    bun run dev

build:
    bun run build

start: build
    bun run preview

lint:
    bun run lint:check

format:
    bun run lint

install:
    bun install

outdated:
    bun outdated
    bunx npm-check-updates --interactive
