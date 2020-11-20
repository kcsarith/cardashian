from flask import Blueprint, request
from cardashian_app.models import db, CardCategory, Game
from flask_login import login_required
import datetime


bp = Blueprint('categories', __name__)

@bp.route('/')
def get_all_categories():
    response = CardCategory.query.all()
    print('8' * 100)
    print(response)
    print('8'*100)
    return {"categories": [category.as_dict() for category in response]}

@bp.route('/game/<int:game_id>', methods=['GET','POST', 'DELETE'])
def crd_category_to_game(game_id):
    if request.method == 'GET':
        categories = CardCategory.query.filter(CardCategory.game_id == game_id)
        print('8' * 100)
        print(categories)
        print('8'*100)
        # return {}
        return {"categories": [category.as_dict() for category in categories]}
    if request.method == 'POST':
        categories = CardCategory.query.filter(CardCategory.game_id == game_id)
        new_list_order = len(list(categories))+1
        new_category = CardCategory(
            game_id=game_id,
            list_order=new_list_order
        )
        db.session.add(new_category)
        db.session.commit()
        return {"category": new_category.as_dict()}

    if request.method == 'DELETE':
        deleted_category = CardCategory.query.filter(CardCategory.game_id == game_id).delete()
        return {'response': f'deleted {deleted_category} category(s)'}

@bp.route('/<int:category_id>', methods=['GET','PATCH', 'DELETE'])
def patch_category(category_id):
    if request.method == 'GET':
        category = CardCategory.query.get_or_404(category_id)
        return {'category': category.as_dict()}

    if request.method == 'DELETE':
        filtered = CardCategory.query.filter(CardCategory.id == category_id)
        category = filtered.first()
        filtered.delete()
        categories_from_game_id = CardCategory.query.filter(CardCategory.game_id==category.game_id)
        iteration = 1
        for category_from_game_id in categories_from_game_id:
            category_from_game_id.list_order = iteration
            iteration += 1
        db.session.commit()
        print(category.name *50)
        # amount_deleted = deleted_category.delete()
        # return {'response': f'deleted {amount_deleted} category(s)'}
        return {'this': category.as_dict()}

    if request.method == 'PATCH':
        category = CardCategory.query.get_or_404(category_id)

        new_id_prefix = request.json.get("id_prefix")
        new_list_order = request.json.get("list_order")
        new_name = request.json.get("name")
        new_frame_color = request.json.get("frame_color")

        if new_id_prefix is not None:
            category.id_prefix = new_id_prefix
        if new_list_order is not None:
            category.list_order = new_list_order
        if new_name is not None:
            category.name = new_name
        if new_frame_color is not None:
            category.frame_color = new_frame_color

        db.session.commit()
        return {"category": category.as_dict()}
