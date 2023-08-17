from os import listdir, system
import json
from django.contrib.auth.hashers import make_password
import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()


def create_user_fixture(email, password):
    """Creates a user fixture with a hashed password."""
    user = {
        "email": email,
        "password": make_password(password),
    }
    return user


jsonFiles = []
for fixture in listdir("fixtures"):
    if fixture == "1_user.json":
        f = open("fixtures/" + fixture)
        data = json.load(f)
        data[0]["fields"] = create_user_fixture(
            data[0]["fields"]["email"], data[0]["fields"]["password"]
        )
        f.close()
        f = open("fixtures/hash_" + fixture, mode="w")
        f.write(json.dumps(data))
        f.close()
        system("python manage.py loaddata fixtures/hash_" + fixture)
    elif not fixture.startswith("hash"):
        system("python manage.py loaddata fixtures/" + fixture)
