npm-build:
	npm run build

clean:
	rm -rf ./dist

deploy:
	npm run ci

bootstrap:
	pnpm install   