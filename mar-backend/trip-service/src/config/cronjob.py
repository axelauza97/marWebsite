import os, shutil
def cronjob():

    folder = '../api/migrations'
    for filename in os.listdir(folder):
        file_path = os.path.join(folder, filename)
        print(file_path)
        try:
            if os.path.isfile(file_path) or os.path.islink(file_path):
                os.unlink(file_path)
            elif os.path.isdir(file_path):
                shutil.rmtree(file_path)
        except Exception as e:
            print('Failed to delete %s. Reason: %s' % (file_path, e))
    try:
        os.remove('../db.sqlite3')
    except:
        pass
    os.chdir('../')
    os.system("python manage.py makemigrations api")
    os.system("python manage.py migrate api")
    os.system("python manage.py migrate")
    os.system("python load_fixtures.py")
    

cronjob()