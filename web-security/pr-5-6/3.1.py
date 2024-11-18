# settings.py - Использовать разные схемы базы данных для разных сред
if DEBUG:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': 'dev_db',
            'USER': 'dev_user',
            'PASSWORD': 'dev_password',
            'HOST': 'localhost',
            'PORT': '5432',
            'OPTIONS': {
                'options': '-c search_path=dev'
            }
        }
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': 'prod_db',
            'USER': 'prod_user',
            'PASSWORD': 'prod_password',
            'HOST': 'localhost',
            'PORT': '5432',
            'OPTIONS': {
                'options': '-c search_path=prod'
            }
        }
    }
    
