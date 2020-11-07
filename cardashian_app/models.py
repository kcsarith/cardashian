from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
import datetime
db = SQLAlchemy()


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    is_public = db.Column(db.Boolean, default=True, nullable=False)
    # featured_game_id = db.Column(db.Integer, db.ForeignKey('game.id'), nullable=True)
    promotion_points = db.Column(db.Integer, default=1000, nullable=False)
    online_status = db.Column(db.String(15), default='Online', nullable=False)
    alias = db.Column(db.String(15), default='No Alias', nullable=False)
    name = db.Column(db.String(15), default='No Name', nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    country = db.Column(db.String(127), nullable=False)
    city = db.Column(db.String(127), nullable=False)
    about_me = db.Column(db.Text, default='I just joined and need to update my profile later.')
    profile_pic_src = db.Column(db.String(255), default=None)
    background_src = db.Column(db.String(255), default=None)
    hashed_password = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)


    # Relationships
    # favorites = db.relationship('CardFavorite', backref='owner', lazy=True)
    # reservations = db.relationship('Reservation', backref='user', lazy=True)
    # reviews = db.relationship('Review', backref='user', lazy=True)
    # restaurants = db.relationship('Restaurant', secondary=favorites)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
          "id": self.id,
          "name": self.name,
          "email": self.email,
          "city": self.city,
          "country": self.country,
          "hashed_password": self.hashed_password,
          "promotion_points": self.promotion_points
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
