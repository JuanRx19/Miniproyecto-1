## Miniproyecto 1
### Juan Miguel Rojas - Rafael Hermida - Bairon Torres - Miguel Sanchez

Pasos para inicializar el proyecto:

1. Tener MySQL instalado https://dev.mysql.com/downloads/installer/
2. CREATE DATABASE crud_db;
3. Configurar settings.py con la configuración correspondiente para acceder a la BD.
   - Aquí un pequeño ejemplo de como debería ir:
     DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'crud_db',
        'USER': 'root',
        'PASSWORD': 'admin',
        'HOST': 'localhost',
        'PORT': '3307',
    }
    }
5. Inicializar el backend con "python3 manage.py runserver".
6. Inicializar el front con "npm run dev".
7. Proyecto correctamente instalado.
