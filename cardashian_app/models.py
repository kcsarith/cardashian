from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
import datetime

from .extensions import db, guard

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    roles = db.Column(db.Text, default='Member')
    is_public = db.Column(db.Boolean, default=True)
    # featured_game_id = db.Column(db.Integer, db.ForeignKey('game.id'), nullable=True)
    promotion_points = db.Column(db.Integer, default=1000)
    online_status = db.Column(db.String(15), default='Online')
    alias = db.Column(db.String(15), default='No Alias')
    username = db.Column(db.String(15), default='No Name', nullable=False, unique=True)
    email = db.Column(db.String(255))
    country = db.Column(db.String(127),default='United States')
    city = db.Column(db.String(127), default='San Francisco')
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
    __table_args__ = (db.UniqueConstraint('owner_id', 'name'),)

    id = db.Column(db.Integer, primary_key=True)
    is_public = db.Column(db.Boolean, default=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    promotion_points = db.Column(db.Integer, default=1000)
    name = db.Column(db.String(63), default='Untitled', nullable=False )
    description = db.Column(db.String(63), default='No description' )
    home_bg_src = db.Column(db.String(255), default=None)
    game_logo_src = db.Column(db.String(255), default=None)
    player_health_term = db.Column(db.String(15), default='LP')
    player_currency_term = db.Column(db.String(15), default='DKP')
    character_card_term = db.Column(db.String(15), default='Character')
    spell_card_term = db.Column(db.String(15), default='Skratch')
    rank_term = db.Column(db.String(15), default='Rank')
    rank_type = db.Column(db.String(15), default='Alphabetic')
    rank_icon_src = db.Column(db.String(255), default=None)
    hp_term = db.Column(db.String(15), default='BP')
    atk_term = db.Column(db.String(15), default='Atk')
    def_term = db.Column(db.String(15), default='Def')
    special_card_term = db.Column(db.String(15), default='POW')
    use_atk = db.Column(db.Boolean, default=False)
    use_def = db.Column(db.Boolean, default=False)
    frame_color = db.Column(db.String(9), default='CCC')
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'is_public': self.is_public,
            'owner_id' : self.owner_id,
            'promotion_points': self.promotion_points,
            'name' : self.name,
            'description' : self.description,
            'home_bg_src' : self.home_bg_src,
            'game_logo_src' : self.game_logo_src,
            'player_health_term' : self.player_health_term,
            'player_currency_term' : self.player_currency_term,
            'character_card_term' : self.character_card_term,
            'spell_card_term': self.spell_card_term,
            'rank_term' : self.rank_term,
            'rank_type': self.rank_type,
            'rank_icon_src' : self.rank_icon_src,
            'hp_term' : self.hp_term,
            'atk_term' : self.atk_term,
            'def_term' : self.def_term,
            'special_card_term' : self.special_card_term,
            'use_atk' : self.use_atk,
            'use_def' : self.use_def,
            'frame_color' : self.frame_color,
            'created_at' : self.created_at,
            'updated_at' : self.updated_at
        }
class Card(db.Model):
    __tablename__ = 'cards'
    __table_args__ = (db.UniqueConstraint('game_id', 'name'),)

    id = db.Column(db.Integer, primary_key=True)
    is_public = db.Column(db.Boolean, default=True)
    is_special_card = db.Column(db.Boolean, default=True)
    is_spell = db.Column(db.Boolean, default=False)
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'), nullable=False)
    card_image_id = db.Column(db.Integer, db.ForeignKey('card_images.id'), default=1)
    category_id = db.Column(db.Integer, db.ForeignKey('card_categories.id'), default=1)
    promotion_points = db.Column(db.Integer, default=1000)
    name = db.Column(db.String(63), default='Untitled', nullable=False)
    artist = db.Column(db.String(63), default='Anonymous')
    description_title = db.Column(db.String(63), default='Unknown')
    manual_description = db.Column(db.Text, default='')
    auto_description = db.Column(db.Text, default='')
    rank = db.Column(db.Integer, default=1)
    is_charge = db.Column(db.Boolean, default=False)
    health = db.Column(db.Integer, default=100)
    attack = db.Column(db.Integer, default=100)
    defense = db.Column(db.Integer, default=100)
    cost = db.Column(db.Integer, default=1)
    turns = db.Column(db.Integer, default=1)
    longevity = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'is_public': self.is_public,
            'is_special_card': self.is_special_card,
            'is_spell': self.is_spell,
            'game_id': self.game_id,
            'card_image_id': self.card_image_id,
            'category_id': self.category_id,
            'promotion_points': self.promotion_points,
            'name': self.name,
            'artist': self.artist,
            'description_title': self.description_title,
            'manual_description': self.manual_description,
            'auto_description': self.auto_description,
            'rank': self.rank,
            'is_charge': self.is_charge,
            'health': self.health,
            'attack': self.attack,
            'defense': self.defense,
            'cost': self.cost,
            'turns': self.turns,
            'longevity': self.longevity,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }

class CardFavorite(db.Model):
    __tablename__ = 'card_favorites'
    __table_args__ = (db.UniqueConstraint('card_id', 'owner_id', 'folder'),)

    id = db.Column(db.Integer, primary_key=True)
    card_id= db.Column(db.Integer, db.ForeignKey('cards.id'), nullable=False)
    owner_id= db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    folder = db.Column(db.String(31), nullable=False)
    date_added = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def to_dict(self):
        return {
            'id' : self.id,
            'card_id' : self.card_id,
            'owner_id' : self.owner_id,
            'folder'  : self.folder,
            'date_added' : self.date_added
        }

class Deck(db.Model):
    __tablename__ = 'decks'
    __table_args__ = (db.UniqueConstraint('card_id', 'owner_id', 'name') ,)
    id = db.Column(db.Integer, primary_key=True)
    card_id= db.Column(db.Integer, db.ForeignKey('cards.id'), nullable=False)
    owner_id= db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(31), default='Untitled Deck', nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'card_id': self.card_id,
            'owner_id': self.owner_id,
            'name' : self.name,
            'created_at' : self.created_at,
            'updated_at' : self.updated_at,
        }

class CardCategory(db.Model):
    __tablename__ = 'card_categories'
    __table_args__ = (db.UniqueConstraint('game_id', 'list_order', 'name'),)

    id = db.Column(db.Integer, primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'), nullable=False)
    id_prefix = db.Column(db.String(2), default='XX', nullable=False)
    list_order = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(31), default='Generic', nullable=False)
    frame_color = db.Column(db.String(9), default='CCC', nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'game_id': self.game_id,
            'id_prefix' : self.id_prefix,
            'list_order' : self.list_order,
            'name': self.name,
            'frame_color' : self.frame_color,
        }

class CardImage(db.Model):
    __tablename__ = 'card_images'

    id = db.Column(db.Integer, primary_key=True)
    game_id= db.Column(db.Integer, db.ForeignKey('games.id'), nullable=False)
    src = db.Column(db.String(255), default=None)
    name = db.Column(db.String(31), default='Untitled', nullable=False)
    category = db.Column(db.String(31), default='none', nullable=False)
    # Categories are 1. profile_pic 2. background. 3. card
    def to_dict(self):
        return {
            'id': self.id,
            'game_id': self.game_id,
            'src' : self.src,
            'name' : self.name,
            'category' : self.category,
        }

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

    def to_dict(self):
        return {
            'id': self.id,
            'card_id': self.card_id,
            'list_order': self.list_order,
            'player_condition_target' : self.player_condition_target,
            'player_condition' : self.player_condition,
            'player_condition_operator': self.player_condition_operator,
            'player_condition_value' : self.player_condition_value,
            'card_condition_target' : self.card_condition_target,
            'card_condition' : self.card_condition,
            'card_condition_operator' : self.card_condition_operator,
            'card_condition_value' : self.card_condition_value,
            'effect' : self.effect,
            'target' : self.target,
            'value' : self.value,
            'turns' : self.turns,
        }

class CardComment(db.Model):
    __tablename__ = 'card_comments'

    id = db.Column(db.Integer, primary_key=True)
    card_id = db.Column(db.Integer, db.ForeignKey('cards.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    parent_comment_id = db.Column(db.Integer, db.ForeignKey('card_comments.id'), default=None)
    message = db.Column(db.Text, default='')
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'card_id' : self.card_id,
            'user_id' : self.user_id,
            'parent_comment_id': self.parent_comment_id,
            'message' : self.message,
            'created_at' : self.created_at,
            'updated_at' : self.updated_at
        }


class UserTag(db.Model):
    __tablename__ = 'user_tags'
    __table_args__ = (db.UniqueConstraint('user_id', 'name'),)
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(15), default='no tag', nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name
        }

class CardTag(db.Model):
    __tablename__ = 'card_tags'
    __table_args__ = (db.UniqueConstraint('card_id', 'name'),)

    id = db.Column(db.Integer, primary_key=True)
    card_id = db.Column(db.Integer, db.ForeignKey('cards.id'), nullable=False)
    name = db.Column(db.String(15), default='no tag', nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'card_id': self.card_id,
            'name': self.name
        }

class GameTag(db.Model):
    __tablename__ = 'game_tags'
    __table_args__ = (db.UniqueConstraint('game_id', 'name'),)

    id = db.Column(db.Integer, primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'), nullable=False)
    name = db.Column(db.String(15), default='no tag', nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'game_id': self.game_id,
            'name': self.name
        }
