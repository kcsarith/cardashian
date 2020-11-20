from flask import Blueprint, jsonify, request
from cardashian_app.models import db, User
from flask_login import login_required
from sqlalchemy.orm import joinedload


bp = Blueprint('users', __name__)

@bp.route('/<username>')
def get_by_username(username):
    user = User.query.filter_by(username=username).options(joinedload('games')).first()
    return ({'user': user.as_dict()})

@bp.route('/')
def index():
    response = User.query.all()
    return {"users": [user.as_dict() for user in response]}


# @bp.route("/<int:user_id>/favorites", methods=["GET", "POST", "DELETE"])
# @login_required
# def user_favorites(user_id):
#     if request.method == "POST":
#         if not request.is_json:
#             return jsonify({"msg": "Missing JSON in request"}), 400
#         user = User.query.get_or_404(user_id)
#         restaurant_id = request.json.get("restaurant_id", None)
#         rest = Restaurant.query.get(restaurant_id)
#         user.restaurants.append(rest)
#         db.session.add(user)
#         db.session.commit()
#         return 'Restaurant added to favorites', 200
#     else:
#         response = db.session.query(Restaurant).order_by(
#                       Restaurant.name).options(
#                       joinedload(Restaurant.users)
#                       ).filter(Restaurant.users.any(id=user_id)).all()
#         return {'favorites': [rest.as_dict() for rest in response]}

# @bp.route("/<int:user_id>/favorites/delete/<int:rest_id>", methods=["DELETE"])
# @login_required
# def delete_favorite(rest_id, user_id):
#     user = User.query.get_or_404(user_id)
#     restaurant = Restaurant.query.filter_by(id=rest_id).first()
#     user.restaurants.clear(restaurant)
#     db.session.add(user)
#     db.session.commit()
#     return 'Delete worked', 200
