from flask import Blueprint, request
from cardashian_app.models import db, Card, CardComment, Game, User
from flask_login import login_required
import datetime


bp = Blueprint('card-comments', __name__)

@bp.route('/<username>/<gamename>/<cardname>', methods=['GET', 'POST'])
def get_comments_from_card(gamename, cardname, username):
    user = User.query.filter(User.username == username).first()
    game = Game.query.filter(Game.user_id == user.id).first()
    card = Card.query.filter(Card.game_id == game.id).first()
    if request.method == 'GET':
        comments = CardComment.query.filter(CardComment.card_id == card.id)
        return {'comments': [comment.to_dict() for comment in comments]}
    if request.method == 'POST':
        message = request.json.get("message")
        user_id = request.json.get("user_id")
        new_comment = CardComment(message=message, card_id=card.id, user_id=user_id)
        db.session.add(new_comment)
        return {'comment': new_comment.to_dict()}

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
