.PHONY: setup test
all: test
setup:
	asdf install
	npm init playwright@latest
test: 
	npx playwright test
test-ui: 
	npx playwright test --ui
