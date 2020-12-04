from flask import Blueprint, request
from cardashian_app.models import db, ProfileComment, User
from flask_login import login_required
import datetime


bp = Blueprint('profile-comments', __name__)

@bp.route('/profile/<username>', methods=['GET', 'POST'])
def get_comments_from_profile( username):
    profile_user = User.query.filter(User.username == username).first()
    if request.method == 'GET':
        comments = ProfileComment.query.filter(ProfileComment.profile_id == profile_user.id).limit(10)
        result_comments = []
        for comment in comments:
            dict_comment = comment.as_dict()
            new_user = User.query.get_or_404(dict_comment['user_id'])
            dict_new_user = new_user.as_dict()
            dict_comment.update(User=dict_new_user)
            result_comments.append(dict_comment)
        return {'comments': result_comments}
    if request.method == 'POST':
        message = request.json.get("message")
        user_id = request.json.get("user_id")
        dict_profile_user = profile_user.as_dict()
        new_comment = ProfileComment(message=message, profile_id=profile_user.profile_id, user_id=user_id)
        print('8' * 30)
        print(user.as_dict())
        db.session.add(new_comment)
        db.session.commit()
        return {'comment': new_comment.as_dict()}

@bp.route('/')
def get_all_profile_comments():
    response = ProfileComment.query.all()
    print('8' * 100)
    print(response)
    print('8'*100)
    return {"comments": [comment.as_dict() for comment in response]}

@bp.route('/<int:profile_comment_id>', methods=['DELETE', 'PATCH'])
def update_read_delete_card_comment(profile_comment_id):
    if request.method == 'GET':
        card_comment = ProfileComment.get_or_404(profile_comment_id)
        return {"card_comment": card_comment.as_dict()}

    if request.method == 'DELETE':
        response = ProfileComment.query.filter(ProfileComment.id == profile_comment_id)
        amount = response.delete()
        return {'delete': f'deleted {amount} card comment(s)'}

    if request.method == 'PATCH':
        profile_comment = ProfileComment.query.get_or_404(profile_comment_id)

        new_message = request.json.get("message")

        if new_message == profile_comment.message:
            return {"message": "no updates"}

        elif new_message is not None:
            profile_comment.message = new_message
            profile_comment.updated_at = datetime.datetime.utcnow()
            db.session.commit()
            return {"profile_comment": profile_comment.as_dict()}
