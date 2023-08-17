# Mar Website

This project is focused to show a Website SPA with responsive design in React.js framework.

Here you can create a new user and then create new trips, customize others and also delete it.

## Installation

```bash
docker network create mar_network
```

```bash
docker-compose up --build
```

#### Develop by Axel Auza

#### 🚀 Thanks for being here

## For running individual

This is a project where I developed a microservice architecture with Django, dividing authentication form fetching trip data

```bash
python manage.py collectstatic
mkdir migrations
python manage.py makemigrations api
python manage.py migrate api
python manage.py migrate
python load_fixtures.py
python manage.py crontab add
```

http://localhost:4000/auth/
