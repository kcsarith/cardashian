from flask import Blueprint, request
from cardashian_app.models import db, Friend, User


bp = Blueprint('friends', __name__)

@bp.route('/user/<int:user_id>')
def get_all_user_friends(user_id):
    user = User.query.get_or_404(user_id)
    friends = Friend.query.filter(Friend.user_id == user_id)
    dict_friends =[]
    for friend in friends:
        dict_friend = friend.as_dict()
        print('g'*40)
        print(dict_friend)
        print('r'*40)
        new_friend = User.query.get_or_404(dict_friend['friend_id'])
        dict_new_friend = new_friend.as_dict()
        print('9' * 40)
        print(dict_new_friend)
        print('9'*40)
        dict_friend.update(Friend=dict_new_friend)
        dict_user = user.as_dict()
        dict_friend.update(User=dict_user)
        dict_friends.append(dict_friend)
        print('z' * 40)
        print(dict_friend)
        print('z'*40)
    return {'friends': dict_friends}


@bp.route('/friend/<int:friend_id>')
def get_all_friend_users(friend_id):
    friends = Friend.query.filter(Friend.friend_id == friend_id)
    current_friend = Friend.query.get_or_404(friend_id)
    dict_current_friend = current_friend.as_dict()
    result_friends =[]
    for friend in friends:
        dict_friend = friend.as_dict()
        user = User.query.get_or_404(dict_friend['user_id'])
        dict_user = user.as_dict()
        print('g'*40)
        print(dict_friend)
        print('r'*40)
        dict_friend.update(Friend=dict_current_friend)
        dict_friend.update(User=dict_user)
        result_friends.append(dict_friend)
    return {'friends': result_friends}

@bp.route('/user/<int:user_id>/friend/<int:friend_id>', methods=['POST', 'DELETE'])
def add_remove_friend(user_id, friend_id):
    if request.method == 'POST':
        new_friend = Friend(user_id=user_id, friend_id=friend_id)
        db.session.add(new_friend)
        db.session.commit()
        return {'friend': new_friend.as_dict()}
    if request.method == 'DELETE':

        friend = Friend.query.filter(Friend.user_id == user_id).filter(Friend.friend_id == friend_id).delete()
        return {'message': f'User {user_id} no longer follows {friend_id}'}
