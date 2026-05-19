hello:
	@echo "Hello, World!"

install:
	copy .env.example .env
	cd frontend && copy .env.example .env

install-backend-dependencies:
	cd Green-Market-Laravel && npm install

install-frontend-dependencies:
	cd frontend && npm install

start:
	docker compose up -d --build

setup:
	make install
	make start

container-stop:
	docker compose down

stop-frontend:
	docker compose stop frontend

restart-frontend:
	docker compose restart frontend

stop-backend:
	docker compose stop Green-Market-Laravel

restart-backend:
	docker compose restart Green-Market-Laravel

log-backend:
	docker compose logs -f Green-Market-Laravel

stop-mysql:
	docker compose stop mysql

restart-mysql:
	docker compose restart mysql

stop-phpmyadmin:
	docker compose stop phpmyadmin

restart-phpmyadmin:
	docker compose restart phpmyadmin

start-eslint-backend:
	cd Green-Market-Laravel && npm run lint

start-eslint-frontend:
	cd frontend && npm run lint

test-backend:
	cd Green-Market-Laravel && npm run test

test-frontend:
	cd frontend && npm run test

