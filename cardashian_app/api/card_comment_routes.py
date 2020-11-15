from flask import Blueprint, request
from cardashian_app.models import db, Card, CardComment
from flask_login import login_required
import datetime


bp = Blueprint('card-comments', __name__)

@bp.route('/')
def get_all_card_comments():
    response = CardComment.query.all()
    print('8' * 100)
    print(response)
    print('8'*100)
    return {"cards": [card_comment.to_dict() for card_comment in response]}

@bp.route('/<int:card_comment_id>', methods=['DELETE', 'PATCH'])
def update_read_delete_card_comment(card_comment_id):
    if request.method == 'GET':
        card_comment = CardComment.get_or_404(card_comment_id)
        return {"card_comment": card_comment.to_dict()}

    if request.method == 'DELETE':
        response = CardComment.query.filter(CardComment.id == card_comment_id)
        card_comment = response.first()
        child_card_comments = CardComment.query.filter(CardComment.parent_comment_id == card_comment.id)
        for child_card_comment in child_card_comments:
            child_card_comment.parent_comment_id = None
            db.session.commit()
        amount = response.delete()
        return {'delete': f'deleted {amount} card comment(s)'}

    if request.method == 'PATCH':
        card_comment = CardComment.query.get_or_404(card_comment_id)

        new_message = request.json.get("message")

        if new_message == card_comment.message:
            return {"message": "no updates"}

        elif new_message is not None:
            card_comment.message = new_message
            card_comment.updated_at = datetime.datetime.utcnow()
            db.session.commit()
            return {"card_comment": card_comment.to_dict()}
