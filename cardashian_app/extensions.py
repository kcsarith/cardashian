from flask_sqlalchemy import SQLAlchemy
import flask_praetorian

db = SQLAlchemy()
guard = flask_praetorian.Praetorian()
