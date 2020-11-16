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

    user = json_data['user']
    print('8' * 80)
    print(user)
    new_user = User(
        username= user['username'],
        hashed_password= guard.hash_password(user['password'])
    )
    if 'alias' in user:
        new_user.alias = user['alias']
    if 'email' in user:
        new_user.email = user['email']
    if 'country' in user:
        new_user.country = user['country']
    if 'city' in user:
        new_user.city = user['city']
    if 'about_me' in user:
        new_user.about_me = user['about_me']
    if 'profile_pic_src' in user:
        new_user.profile_pic_src = user['profile_pic_src']
    if 'background_src' in user:
        new_user.background_src = user['background_src']
    db.session.add(new_user)
    db.session.commit()

    user = guard.authenticate(new_user.username, user['password'])
    return jsonify({'user': new_user.to_dict(),'access_token': guard.encode_jwt_token(user)},200)

@bp.route('/finalize')
def finalize():
    registration_token = guard.read_token_from_header()
    user = guard.get_user_from_registration_token(registration_token)
    user.is_active = True
    db.session.commit()

    return jsonify({'access_token': guard.encode_jwt_token(user)},200)
