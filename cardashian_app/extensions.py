from flask_sqlalchemy import SQLAlchemy
from cardashian_app.config_s3 import S3_BUCKET, S3_KEY, S3_SECRET_ACCESS_KEY
import flask_praetorian
import boto3

db = SQLAlchemy()
guard = flask_praetorian.Praetorian()
s3 =  boto3.client('s3', aws_access_key_id=S3_KEY, aws_secret_access_key=S3_SECRET_ACCESS_KEY)
