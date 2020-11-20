from flask import Blueprint, request
from cardashian_app.models import db, Card, Game,User
from flask_login import login_required
import datetime


bp = Blueprint('cards', __name__)


@bp.route('/featured')
def get_all_high_promoted_cards():
    response = Card.query.order_by(Card.promotion_points.desc()).limit(24)
    print('dd8'*40)
    print(response)
    return {"cards": [card.as_dict() for card in response]}


@bp.route('/game/<int:game_id>', methods=['GET','POST'])
def crud_card_to_game(game_id):
    print('8'*100)
    print(request)
    if request.method == 'GET':
        cards = Card.query.filter(Card.game_id == game_id)
        print('8'*100)
        print(cards)
        return {'cards': [card.as_dict() for card in cards]}
    if request.method == 'POST':
        i = len(list(Card.query.filter(Card.game_id == game_id)))

        while len(list(Card.query.filter(Card.name == f'Untitled {i}'))):
            i += 1
        print('*'*100)
        print(i)
        print('*' * 100)
        new_card = Card(
            game_id=game_id,
            name=f'Untitled {i}'
        )
        db.session.add(new_card)
        db.session.commit()
        return {"card": new_card.as_dict()}

@bp.route('/user/<int:user_id>')
def get_all_cards_by_user(user_id):
    games = Game.query.filter(Game.user_id == user_id)
    cards = []
    for game in games:
        game_dict = game.as_dict()
        cards_in_game = Card.query.filter(Card.game_id == game.id)
        for card_in_game in cards_in_game:
            card_in_game_dict = card_in_game.as_dict()
            card_in_game_dict.update(game=game_dict)
            cards.append(card_in_game_dict)

    print('8' * 100)
    print(cards)
    print('8'*100)
    # return {}
    return {"cards": cards}


@bp.route('/<username>/<gamename>/<cardname>', methods=['GET','PATCH','DELETE'])
def patch_delete_card_to_game(gamename, cardname, username):
    user = User.query.filter(User.username == username).first()
    game = Game.query.filter(Game.user_id == user.id).filter(Game.name== gamename).first()
    card_filt = Card.query.filter(Card.game_id == game.id).filter(Card.name==cardname)
    if request.method == 'GET':
        card = card_filt.first()
        print('8'*100)
        print(card)
        return {'card': card.as_dict(), 'user': user.as_dict(), 'game':game.as_dict()}
    if request.method == 'DELETE':
        card_filt.delete()
        return {'response': deleted_card}
    if request.method == 'PATCH':
        new_is_public = request.json.get("is_public")
        new_is_special_card = request.json.get("is_special_card")
        new_is_spell = request.json.get("is_spell")
        new_card_image_src = request.json.get("card_image_src")
        new_category_id = request.json.get("category_id")
        new_promotion_points = request.json.get("promotion_points")
        new_name = request.json.get("name")
        new_artist = request.json.get("artist")
        new_description_title = request.json.get("description_title")
        new_manual_description = request.json.get("manual_description")
        new_auto_description = request.json.get("auto_description")
        new_rank = request.json.get("rank")
        new_health = request.json.get("health")
        new_attack = request.json.get("attack")
        new_defense = request.json.get("defense")
        new_cost = request.json.get("cost")
        new_is_charge = request.json.get("is_charge")
        new_turns = request.json.get("turns")
        new_longevity = request.json.get("longevity")

        if new_is_public is not None:
            card.is_public = new_is_public
        if new_is_special_card is not None:
            card.is_special_card = new_is_special_card
        if new_is_spell is not None:
            card.is_spell = new_is_spell
        if new_card_image_src is not None:
            card.card_image_src = new_card_image_src
        if new_category_id is not None:
            card.category_id = new_category_id
        if new_promotion_points is not None:
            card.promotion_points = new_promotion_points
        if new_name is not None:
            card.name = new_name
        if new_artist is not None:
            card.artist = new_artist
        if new_description_title is not None:
            card.description_title = new_description_title
        if new_manual_description is not None:
            card.manual_description = new_manual_description
        if new_auto_description is not None:
            card.auto_description = new_auto_description
        if new_rank is not None:
            card.rank = new_rank
        if new_health is not None:
            card.health = new_health
        if new_attack is not None:
            card.attack = new_attack
        if new_defense is not None:
            card.defense = new_defense
        if new_cost is not None:
            card.cost = new_cost
        if new_is_charge is not None:
            card.is_charge = new_is_charge
        if new_turns is not None:
            card.turns = new_turns
        if new_longevity is not None:
            card.longevity = new_longevity

        card.updated_at = datetime.datetime.utcnow()

        db.session.commit()
        return {"card": card.as_dict()}

@bp.route('/<int:card_id>', methods=['GET','DELETE', 'PATCH'])
def edit_delete_one_card(card_id):
    if request.method == 'GET':
        card = Card.query.get_or_404(card_id)
        return {'card': card.as_dict()}
    if request.method == 'DELETE':
        deleted_card = Card.query.filter(Card.id == card_id).delete()
        return {'response': deleted_card}

    if request.method == 'PATCH':
        card = Card.query.get_or_404(card_id)

        new_is_public = request.json.get("is_public")
        new_is_special_card = request.json.get("is_special_card")
        new_is_spell = request.json.get("is_spell")
        new_card_image_src = request.json.get("card_image_src")
        new_category_id = request.json.get("category_id")
        new_promotion_points = request.json.get("promotion_points")
        new_name = request.json.get("name")
        new_artist = request.json.get("artist")
        new_description_title = request.json.get("description_title")
        new_manual_description = request.json.get("manual_description")
        new_auto_description = request.json.get("auto_description")
        new_rank = request.json.get("rank")
        new_health = request.json.get("health")
        new_attack = request.json.get("attack")
        new_defense = request.json.get("defense")
        new_cost = request.json.get("cost")
        new_is_charge = request.json.get("is_charge")
        new_turns = request.json.get("turns")
        new_longevity = request.json.get("longevity")

        if new_is_public is not None:
            card.is_public = new_is_public
        if new_is_special_card is not None:
            card.is_special_card = new_is_special_card
        if new_is_spell is not None:
            card.is_spell = new_is_spell
        if new_card_image_src is not None:
            card.card_image_src = new_card_image_src
        if new_category_id is not None:
            card.category_id = new_category_id
        if new_promotion_points is not None:
            card.promotion_points = new_promotion_points
        if new_name is not None:
            card.name = new_name
        if new_artist is not None:
            card.artist = new_artist
        if new_description_title is not None:
            card.description_title = new_description_title
        if new_manual_description is not None:
            card.manual_description = new_manual_description
        if new_auto_description is not None:
            card.auto_description = new_auto_description
        if new_rank is not None:
            card.rank = new_rank
        if new_health is not None:
            card.health = new_health
        if new_attack is not None:
            card.attack = new_attack
        if new_defense is not None:
            card.defense = new_defense
        if new_cost is not None:
            card.cost = new_cost
        if new_is_charge is not None:
            card.is_charge = new_is_charge
        if new_turns is not None:
            card.turns = new_turns
        if new_longevity is not None:
            card.longevity = new_longevity

        card.updated_at = datetime.datetime.utcnow()

        db.session.commit()
        return {"card": card.as_dict()}


@bp.route('/')
def get_all_cards():
    response = Card.query.all()
    print('8' * 100)
    print(response)
    print('8'*100)
    return {"cards": [card.as_dict() for card in response]}
