import os
from cardashian_app.models import db

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    SQLALCHEMY_ECHO = True
    JWT_ACCESS_LIFESPAN = {'days': 365}
    SESSION_TYPE = 'sqlalchemy'
    SESSION_SQLALCHEMY = db
