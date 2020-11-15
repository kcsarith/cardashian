from flask import session
from flask_sqlalchemy import SQLAlchemy
from cardashian_app.config_aws import S3_BUCKET, S3_ACCESS_KEY, S3_SECRET_KEY
import flask_praetorian
import boto3

db = SQLAlchemy()
guard = flask_praetorian.Praetorian()

s3 =  boto3.client('s3', aws_access_key_id=S3_ACCESS_KEY, aws_secret_access_key=S3_SECRET_KEY)

def _get_s3_resource():
    if S3_ACCESS_KEY and S3_SECRET_KEY:
        return boto3.resource(
            's3',
            aws_access_key_id=S3_ACCESS_KEY,
            aws_secret_access_key=S3_SECRET_KEY
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

def get_objects_from_path(username, pathname):
    client = boto3.client('s3')
    result = client.list_objects(Bucket=S3_BUCKET, Prefix=f'users/{username}/{pathname}/', Delimiter='/')
    return result['Contents']
