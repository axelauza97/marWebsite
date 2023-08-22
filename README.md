# Mar Website

- This project is focused to show a Website SPA with responsive design in React.js framework.

- Here you can Create a new user and then Create new trips, Customize others and also Delete them.

- This is a project where I developed a microservice backend architecture with Django, dividing authentication from fetching trip data.

## Architecture

![architecture](https://github.com/axelauza97/portfolio/assets/35442831/1cbad16a-fc33-4d6e-8333-f5d86185f57b)

### Note

- Auth service use JWT token authentication.
- On request to protected endpoints on Trip service it validates the token with the same key that has Auth service.
- This architecture can be translated to Kubernetes files for production environment.

## Installation

```bash
docker network create mar_network
```

```bash
docker-compose up --build
```

## For running each Django service individual

Run in bash

```bash
python manage.py collectstatic
mkdir migrations
python manage.py makemigrations api
python manage.py migrate api
python manage.py migrate
python load_fixtures.py
python manage.py crontab add
```

#### Develop by Axel Auza

#### 🚀 Thanks for being here and feel free to contribute or give feedback
