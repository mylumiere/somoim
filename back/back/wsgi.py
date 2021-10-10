"""
WSGI config for back project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

settings_module = "back.production" if 'WEBSITE_HOSTNAME' in os.environ else 'back.settings'
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'back.settings')

application = get_wsgi_application()
