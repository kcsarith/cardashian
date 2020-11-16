from flask import Flask, Blueprint,request, url_for, flash, Response, session, jsonify
# from cardashian_app.filters import datetimeformat, file_type
from cardashian_app.extensions import get_bucket, get_buckets_list,get_objects_from_path

bp = Blueprint('aws', __name__)

@bp.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        bucket = request.form['bucket']
        session['bucket'] = bucket
        return redirect(url_for('files'))
    else:
        buckets = get_buckets_list()
        return {'buckets': buckets}


@bp.route('/files')
def files():
    my_bucket = get_bucket()
    summaries = my_bucket.objects.all()
    items = []
    for item in summaries:
        items.append(item.key)
        # items.append(item)
    print('8'*60)
    print(items)
    print('8' * 60)
    # return {}
    return {'items': items}

@bp.route('/users/<username>/<pathname>', methods=['POST'])
def files_from_user_and_path(username, pathname):
    if request.method=='GET':
        result = get_objects_from_path(username, pathname)
        items = []
        for item in result:
            items.append(item['Key'])
            # items.append(item)
        print('8' * 50)
        print(items)
        return {'items': items}

    if request.method =='POST':
        file = request.files['file']
        print('8'*50)
        print(files)
        print('8'*50)
        my_bucket = get_bucket()
        # my_bucket.Object(file.filename).put(Body=file)

        my_bucket.Object(f'users/{username}/{pathname}/{file.filename}').put(Body=file,ACL='public-read')

        return {'message': f'successfully uploaded image {file.filename} to {username}/{pathname}/ '}
        # return{'request': 'request.json'}


@bp.route('/delete', methods=['POST'])
def delete():
    key = request.form['key']

    my_bucket = get_bucket()
    my_bucket.Object(key).delete()

    flash('File deleted successfully')
    return redirect(url_for('files'))


@bp.route('/download', methods=['POST'])
def download():
    key = request.form['key']

    my_bucket = get_bucket()
    file_obj = my_bucket.Object(key).get()

    return Response(
        file_obj['Body'].read(),
        mimetype='text/plain',
        headers={"Content-Disposition": "attachment;filename={}".format(key)}
    )
