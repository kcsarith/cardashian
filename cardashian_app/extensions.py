from flask import session
from flask_sqlalchemy import SQLAlchemy
from cardashian_app.config_s3 import S3_BUCKET, S3_KEY, S3_SECRET_ACCESS_KEY
import flask_praetorian
import boto3

db = SQLAlchemy()
guard = flask_praetorian.Praetorian()
s3 =  boto3.client('s3', aws_access_key_id=S3_KEY, aws_secret_access_key=S3_SECRET_ACCESS_KEY)

def _get_s3_resource():
    if S3_KEY and S3_SECRET:
        return boto3.resource(
            's3',
            aws_access_key_id=S3_KEY,
            aws_secret_access_key=S3_SECRET
        )
    else:
        return boto3.resource('s3')


def get_bucket():
    s3_resource = _get_s3_resource()
    if 'bucket' in session:
        bucket = session['bucket']
    else:
        bucket = S3_BUCKET

    return s3_resource.Bucket(bucket)


def get_buckets_list():
    client = boto3.client('s3')
    return client.list_buckets().get('Buckets')
