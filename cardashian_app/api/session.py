from flask import Blueprint, request, jsonify, session
from flask_login import current_user, login_user, logout_user, login_required
from cardashian_app.models import User, db
from ..extensions import guard
import flask_praetorian
# from flask_praetorian import auth_required

bp = Blueprint("session", __name__)

@bp.route('/load')
def load_user():
    XSRF_TOKEN = request.cookies.get('XSRF_TOKEN')
    extracted_data = guard.extract_jwt_token(XSRF_TOKEN)
    try:
        user = User.query.get_or_404(extracted_data['id'])
        return {'user': user.to_dict()}
    except:
        return {'message': 'Cannot get user based on Token'}

@bp.route('/token-verify')
def verify_token():
    get_user_from_registration_token()

@bp.route('/login', methods=['post'])
def login():
    json_data = request.get_json()
    username = json_data['username']
    password = json_data['password']
    user = guard.authenticate(username, password)

    return jsonify({'access_token': guard.encode_jwt_token(user), 'user': user.to_dict()},200)

@bp.route('/refresh')
def refresh():
    json.data = request.get_json()
    return jsonify({'access_token': guard.encode_jwt_token(user)},200)


@bp.route('/protected')
@flask_praetorian.auth_required
def protected():
    return jsonify(
        message="protected endpoint (roles: {})".format(flask_praetorian.current_user().roles))

@bp.route('/protected/member')
@flask_praetorian.roles_required('Member')
def protected_admin():
    return jsonify(message='You are a member!')

@bp.route('/register', methods=['post'])
def register():
    json_data = request.get_json()
    username = json_data['username']
    email = json_data['email']
    password = json_data['password']

    new_user = User(
        username= username,
        email= email,
        hashed_password= guard.hash_password(password)
    )
    db.session.add(new_user)
    db.session.commit()

    user = guard.authenticate(username, password)
    return jsonify({'message': 'sucessfully registred a new user!','access_token': guard.encode_jwt_token(user)},200)
    # ret = {'message': 'successfully sent registration email to user {}'.format(
    #     new_user.username
    # )}
    # return (jsonify(ret), 201)

@bp.route('/finalize')
def finalize():
    registration_token = guard.read_token_from_header()
    user = guard.get_user_from_registration_token(registration_token)
    user.is_active = True
    db.session.commit()

    return jsonify({'access_token': guard.encode_jwt_token(user)},200)
