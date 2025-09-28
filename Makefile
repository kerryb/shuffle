.PHONY: setup lint test
all: lint test
setup:
	asdf install
	npm init @eslint/config@latest
	npm init playwright@latest
lint:
	npx eslint
test: 
	npx playwright test
test-ui: 
	npx playwright test --ui
