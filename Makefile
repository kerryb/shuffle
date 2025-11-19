.PHONY: setup lint test
all: lint test
setup:
	asdf install
	npm install
	npx playwright install
lint:
	npx eslint
test: 
	npx playwright test
test-ui: 
	npx playwright test --ui
server: 
	npx ws -d app
open:
	open http://localhost:8000
