from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
import datetime

from .extensions import db, guard

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    roles = db.Column(db.Text, default='Member', nullable=False)
    is_public = db.Column(db.Boolean, default=True, nullable=False)
    # featured_game_id = db.Column(db.Integer, db.ForeignKey('game.id'), nullable=True)
    promotion_points = db.Column(db.Integer, default=1000, nullable=False)
    online_status = db.Column(db.String(15), default='Online', nullable=False)
    alias = db.Column(db.String(15), default='No Alias', nullable=False)
    username = db.Column(db.String(15), default='No Name', nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    country = db.Column(db.String(127),default='United States', nullable=False)
    city = db.Column(db.String(127), default='San Francisco', nullable=False)
    about_me = db.Column(db.Text, default='I just joined and need to update my profile later.')
    profile_pic_src = db.Column(db.String(255), default=None)
    background_src = db.Column(db.String(255), default=None)
    hashed_password = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True, server_default="true")

    @property
    def rolenames(self):
        try:
            return self.roles.split(',')
        except Exception:
            return []

    @classmethod
    def lookup(cls, username):
        return User.query.filter_by(username=username).one_or_none()

    @property
    def identity(self):
        return self.id

    @classmethod
    def identify(cls, id):
        return User.query.filter_by(id=id).one_or_none()

    @property
    def password(self):
        return self.hashed_password

    def is_valid(self):
        return self.is_active

    # Relationships

    # @property
    # def password(self):
    #     return self.hashed_password

    # @password.setter
    # def password(self, password):
    #     self.hashed_password = generate_password_hash(password)

    # def check_password(self, password):
    #     return check_password_hash(self.password, password)

    def to_dict(self):
        return {
          "id": self.id,
          "roles": self.roles,
          "is_public": self.is_public,
          "promotion_points": self.promotion_points,
          "online_status": self.online_status,
          "alias": self.alias,
          "username": self.username,
          "email": self.email,
          "country": self.country,
          "city": self.city,
          "about_me": self.about_me,
          "profile_pic_src": self.profile_pic_src,
          "background_src": self.background_src,
        #   "hashed_password": self.hashed_password,
          "created_at": self.created_at,
          "updated_at": self.updated_at,
          "is_active": self.is_active
        }
    def to_dict_show_hashed(self):
        return {
          "id": self.id,
          "roles": self.roles,
          "is_public": self.is_public,
          "promotion_points": self.promotion_points,
          "online_status": self.online_status,
          "alias": self.alias,
          "username": self.username,
          "email": self.email,
          "country": self.country,
          "city": self.city,
          "about_me": self.about_me,
          "profile_pic_src": self.profile_pic_src,
          "background_src": self.background_src,
          "hashed_password": self.hashed_password,
          "created_at": self.created_at,
          "updated_at": self.updated_at,
          "is_active": self.is_active
        }


class Game(db.Model):
    __tablename__ = 'games'

    id = db.Column(db.Integer, primary_key=True)
    is_public = db.Column(db.Boolean, default=True, nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    promotion_points = db.Column(db.Integer, default=1000, nullable=False)
    name = db.Column(db.String(63), default='Untitled', nullable=False)
    home_bg_src = db.Column(db.String(255), default=None)
    game_logo_src = db.Column(db.String(255), default=None)
    player_health_term = db.Column(db.String(15), default='LP', nullable=False)
    player_currency_term = db.Column(db.String(15), default='DKP', nullable=False)
    character_card_term = db.Column(db.String(15), default='Character', nullable=False)
    spell_card_term = db.Column(db.String(15), default='Skratch', nullable=False)
    rank_term = db.Column(db.String(15), default='Rank', nullable=False)
    rank_type = db.Column(db.String(15), default='Alphabetic', nullable=False)
    rank_icon_src = db.Column(db.String(255), default=None)
    hp_term = db.Column(db.String(15), default='BP', nullable=False)
    atk_term = db.Column(db.String(15), default='Atk', nullable=False)
    def_term = db.Column(db.String(15), default='Def', nullable=False)
    special_card_term = db.Column(db.String(15), default='POW')
    use_atk = db.Column(db.Boolean, default=False, nullable=False)
    use_def = db.Column(db.Boolean, default=False, nullable=False)
    frame_color = db.Column(db.String(9), default='CCC', nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

class Card(db.Model):
    __tablename__ = 'cards'

    id = db.Column(db.Integer, primary_key=True)
    is_public = db.Column(db.Boolean, default=True, nullable=False)
    is_special_card = db.Column(db.Boolean, default=True, nullable=False)
    is_spell = db.Column(db.Boolean, default=True, nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'), nullable=False)
    card_image_id = db.Column(db.Integer, db.ForeignKey('card_images.id'), default=0, nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('character_categories.id'), nullable=False)
    promotion_points = db.Column(db.Integer, default=1000, nullable=False)
    name = db.Column(db.String(63), default='Untitled', nullable=False)
    artist = db.Column(db.String(63), default='Anonymous', nullable=False)
    description_title = db.Column(db.String(63), default='Unknown', nullable=False)
    manual_description = db.Column(db.Text, default='', nullable=False)
    auto_description = db.Column(db.Text, default='', nullable=False)
    rank = db.Column(db.Integer, default=1, nullable=False)
    health = db.Column(db.Integer, default=100, nullable=False)
    attack = db.Column(db.Integer, default=100, nullable=False)
    defense = db.Column(db.Integer, default=100, nullable=False)
    cost = db.Column(db.Integer, default=1, nullable=False)
    is_charge = db.Column(db.Boolean, default=False, nullable=False)
    turns = db.Column(db.Integer, default=1, nullable=False)
    longevity = db.Column(db.Integer, default=0, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)


class CardFavorite(db.Model):
    __tablename__ = 'card_favorites'

    id = db.Column(db.Integer, primary_key=True)
    card_id= db.Column(db.Integer, db.ForeignKey('cards.id'), nullable=False)
    owner_id= db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(31), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

class Deck(db.Model):
    __tablename__ = 'decks'

    id = db.Column(db.Integer, primary_key=True)
    card_id= db.Column(db.Integer, db.ForeignKey('cards.id'), nullable=False)
    owner_id= db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(31), default='Untitled Deck', nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

class CharacterCategory(db.Model):
    __tablename__ = 'character_categories'

    id = db.Column(db.Integer, primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'), nullable=False)
    id_prefix = db.Column(db.String(2), default='XX', nullable=False)
    list_order = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(31), default='Generic', nullable=False)
    frame_color = db.Column(db.String(9), default='CCC', nullable=False)

class CardImage(db.Model):
    __tablename__ = 'card_images'

    id = db.Column(db.Integer, primary_key=True)
    game_id= db.Column(db.Integer, db.ForeignKey('games.id'), nullable=False)
    src = db.Column(db.String(255), default=None)
    name = db.Column(db.String(31), default='Untitled', nullable=False)

class CardEffect(db.Model):
    __tablename__ = 'card_effect_pieces'
    id = db.Column(db.Integer, primary_key=True)
    card_id = db.Column(db.Integer, db.ForeignKey('cards.id'), nullable=False)
    list_order = db.Column(db.Integer, nullable=False)
    player_condition_target = db.Column(db.String(15), default=None)
    player_condition = db.Column(db.String(255), default=None)
    player_condition_operator = db.Column(db.String(15), default=None)
    player_condition_value = db.Column(db.Integer, default=None)
    card_condition_target = db.Column(db.String(15), default=None)
    card_condition = db.Column(db.String(255), default=None)
    card_condition_operator = db.Column(db.String(15), default=None)
    card_condition_value = db.Column(db.Integer, default=None)
    effect = db.Column(db.String(255), default=None)
    target = db.Column(db.String(255), default=None)
    value = db.Column(db.Integer, default=0)
    turns = db.Column(db.Integer, default=0)

class CardComment(db.Model):
    __tablename__ = 'card_comments'

    id = db.Column(db.Integer, primary_key=True)
    card_id = db.Column(db.Integer, db.ForeignKey('cards.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    parent_comment_id = db.Column(db.Integer, db.ForeignKey('card_comments.id'), default=None)
    message = db.Column(db.Text, default='')
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)



class UserTag(db.Model):
    __tablename__ = 'user_tags'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(15), default='no tag', nullable=False)

class CardTag(db.Model):
    __tablename__ = 'card_tags'

    id = db.Column(db.Integer, primary_key=True)
    card_id = db.Column(db.Integer, db.ForeignKey('cards.id'), nullable=False)
    name = db.Column(db.String(15), default='no tag', nullable=False)

class GameTag(db.Model):
    __tablename__ = 'game_tags'

    id = db.Column(db.Integer, primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'), nullable=False)
    name = db.Column(db.String(15), default='no tag', nullable=False)
