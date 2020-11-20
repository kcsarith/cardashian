from flask import Blueprint, request
from cardashian_app.models import db, Game, CardCategory,CardImage,User
from flask_login import login_required
import datetime


bp = Blueprint('games', __name__)

@bp.route('/featured')
def get_all_high_promoted_games():
    response = Game.query.order_by(Game.promotion_points.desc()).limit(8)
    users = User.query.all()
    list_games = [game.as_dict() for game in response]
    i = 0
    for ele in list_games:
        print('8'*50)
        print(ele['user_id'])
        ele.update(User = users[ele['user_id']-1].as_dict())
        i+=1
    return {"games": [game for game in list_games]}

@bp.route('/')
def get_all_games():
    response = Game.query.order_by(Game.promotion_points.desc())
    users = User.query.all()
    list_games = [game.as_dict() for game in response]
    i = 0
    for ele in list_games:
        print('8'*50)
        print(ele['user_id'])
        ele.update(User = users[ele['user_id']-1].as_dict())
        i+=1
    return {"games": [game for game in list_games]}

@bp.route('/new/user/<int:user_id>', methods=['POST'])
def add_new_game_by_user(user_id):

    i = len(list(Game.query.filter(Game.user_id == user_id)))

    while len(list(Game.query.filter(Game.name == f'Untitled {i}'))):
        i += 1
    print('*'*100)
    print(i)
    print('*' * 100)


    new_game = Game(
        user_id=user_id,
        name=f'Untitled {i}'
    )

    db.session.add(new_game)
    db.session.commit()
    return {"game": new_game.as_dict()}
    # return {}

@bp.route('/delete/<int:game_id>', methods=['DELETE'])
def delete_game_by_id(game_id):
    deleted_game = Game.query.filter(Game.id == game_id).delete()
    return {'response': deleted_game}

@bp.route('/user/<int:user_id>')
def get_games_by_user(user_id):
    games = Game.query.filter(Game.user_id == user_id)
    users = User.query.all()
    list_games = [game.as_dict() for game in response]
    i = 0
    for ele in list_games:
        print('8'*50)
        print(ele['user_id'])
        ele.update(User = users[ele['user_id']-1].as_dict())
        i+=1
    return {'games': [game.as_dict() for game in list_games]}

@bp.route('/user/<username>/<gamename>',methods=['GET', 'DELETE', 'PATCH'])
def get_games_by_user_and_name(username, gamename):
    user = User.query.filter(User.username==username).first()
    game = Game.query.filter(Game.name == gamename).filter(Game.user_id == user.id)
    if request.method == 'GET':
        first_game = game.first()
        list_game = first_game.as_dict()
        list_game.update(User = user.as_dict())
        return ({'game': list_game})
    if request.method == 'DELETE':
        deleted_categories = CardCategory.query.filter(CardCategory.game_id == game[0].id).delete()
        deleted_images = CardImage.query.filter(CardImage.game_id == game[0].id).delete()
        game.delete()
        return {'response': 'deleted_game'}
    if request.method == 'PATCH':
        first_game = game.first()
        new_id = request.json.get("id")
        new_is_public = request.json.get("is_public")
        new_user_id = request.json.get("user_id")
        new_promotion_points = request.json.get("promotion_points")
        new_name =request.json.get("name")
        new_description = request.json.get("description")
        new_home_bg_src = request.json.get("home_bg_src")
        new_game_logo_src = request.json.get("game_logo_src")
        new_player_health_term = request.json.get("player_health_term")
        new_player_currency_term = request.json.get("player_currency_term")
        new_character_card_term = request.json.get("character_card_term")
        new_spell_card_term = request.json.get("spell_card_term")
        new_rank_term = request.json.get("rank_term")
        new_rank_type = request.json.get("rank_type")
        new_rank_icon_src = request.json.get("rank_icon_src")
        new_hp_term = request.json.get("hp_term")
        new_atk_term = request.json.get("atk_term")
        new_def_term = request.json.get("def_term")
        new_special_card_term = request.json.get("special_card_term")
        new_use_atk = request.json.get("use_atk")
        new_use_def = request.json.get("use_def")

        if new_is_public is not None:
            first_game.is_public = new_is_public
        if new_user_id is not None:
            first_game.user_id = new_user_id
        if new_promotion_points is not None:
            first_game.promotion_points = new_promotion_points
        if new_name is not None:
            first_game.name = new_name
        if new_description is not None:
            first_game.description = new_description
        if new_home_bg_src is not None:
            first_game.home_bg_src = new_home_bg_src
        if new_game_logo_src is not None:
            first_game.game_logo_src = new_game_logo_src
        if new_player_health_term is not None:
            first_game.player_health_term = new_player_health_term
        if new_player_currency_term is not None:
            first_game.player_currency_term = new_player_currency_term
        if new_character_card_term is not None:
            first_game.character_card_term = new_character_card_term
        if new_spell_card_term is not None:
            first_game.spell_card_term = new_spell_card_term
        if new_rank_term is not None:
            first_game.rank_term = new_rank_term
        if new_rank_type is not None:
            first_game.rank_type = new_rank_type
        if new_rank_icon_src is not None:
            first_game.rank_icon_src = new_rank_icon_src
        if new_hp_term is not None:
            first_game.hp_term = new_hp_term
        if new_atk_term is not None:
            first_game.atk_term = new_atk_term
        if new_def_term is not None:
            first_game.def_term = new_def_term
        if new_special_card_term is not None:
            first_game.special_card_term = new_special_card_term
        if new_use_atk is not None:
            first_game.use_atk = new_use_atk
        if new_use_def is not None:
            first_game.use_def = new_use_def

        first_game.updated_at = datetime.datetime.utcnow()

        db.session.commit()
        return {"game": first_game.as_dict()}

@bp.route('/user/<int:user_id>/<int:game_id>', methods=['GET', 'DELETE', 'PATCH'])
def crud_by_user_and_name(user_id, game_id):
    if request.method == 'GET':
        user = User.query.get_or_404(user_id)
        game = Game.query.filter(Game.user_id == user_id).filter(Game.id == game_id).first()
        list_game = game.as_dict()
        list_game.update(User=user.as_dict())
        return {"game": list_game}
    elif request.method == 'DELETE':
        game = Game.query.filter(Game.user_id == user_id).filter(Game.name == game_id)
        deleted_categories = CardCategory.query.filter(CardCategory.game_id == game[0].id).delete()
        deleted_images = CardImage.query.filter(CardImage.game_id == game[0].id).delete()
        game.delete()
        return {'response': 'deleted_game'}
    elif request.method == 'PATCH':
        game = Game.query.filter(Game.user_id == user_id).filter(Game.name == game_id).first()

        new_id = request.json.get("id")
        new_is_public = request.json.get("is_public")
        new_user_id = request.json.get("user_id")
        new_promotion_points = request.json.get("promotion_points")
        new_name =request.json.get("name")
        new_description = request.json.get("description")
        new_home_bg_src = request.json.get("home_bg_src")
        new_game_logo_src = request.json.get("game_logo_src")
        new_player_health_term = request.json.get("player_health_term")
        new_player_currency_term = request.json.get("player_currency_term")
        new_character_card_term = request.json.get("character_card_term")
        new_spell_card_term = request.json.get("spell_card_term")
        new_rank_term = request.json.get("rank_term")
        new_rank_type = request.json.get("rank_type")
        new_rank_icon_src = request.json.get("rank_icon_src")
        new_hp_term = request.json.get("hp_term")
        new_atk_term = request.json.get("atk_term")
        new_def_term = request.json.get("def_term")
        new_special_card_term = request.json.get("special_card_term")
        new_use_atk = request.json.get("use_atk")
        new_use_def = request.json.get("use_def")

        if new_is_public is not None:
            game.is_public = new_is_public
        if new_user_id is not None:
            game.user_id = new_user_id
        if new_promotion_points is not None:
            game.promotion_points = new_promotion_points
        if new_name is not None:
            game.name = new_name
        if new_description is not None:
            game.description = new_description
        if new_home_bg_src is not None:
            game.home_bg_src = new_home_bg_src
        if new_game_logo_src is not None:
            game.game_logo_src = new_game_logo_src
        if new_player_health_term is not None:
            game.player_health_term = new_player_health_term
        if new_player_currency_term is not None:
            game.player_currency_term = new_player_currency_term
        if new_character_card_term is not None:
            game.character_card_term = new_character_card_term
        if new_spell_card_term is not None:
            game.spell_card_term = new_spell_card_term
        if new_rank_term is not None:
            game.rank_term = new_rank_term
        if new_rank_type is not None:
            game.rank_type = new_rank_type
        if new_rank_icon_src is not None:
            game.rank_icon_src = new_rank_icon_src
        if new_hp_term is not None:
            game.hp_term = new_hp_term
        if new_atk_term is not None:
            game.atk_term = new_atk_term
        if new_def_term is not None:
            game.def_term = new_def_term
        if new_special_card_term is not None:
            game.special_card_term = new_special_card_term
        if new_use_atk is not None:
            game.use_atk = new_use_atk
        if new_use_def is not None:
            game.use_def = new_use_def

        game.updated_at = datetime.datetime.utcnow()

        db.session.commit()
        return {"game": game.as_dict()}
