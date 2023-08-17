from os import listdir, system
from os.path import isfile, join


print(listdir("fixtures"))
for fixture in listdir("fixtures"):
    system("python manage.py loaddata fixtures/" + fixture)
