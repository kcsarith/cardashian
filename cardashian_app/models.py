from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.orm import relationship
import datetime

from .extensions import db, guard

class User(db.Model, UserMixin):
    # __tablename__ = 'users'
    __table_args__ = {'extend_existing': True}

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

    games = db.relationship("Game", backref=db.backref("users", lazy=True) )
    card_favorites = db.relationship("CardFavorite", backref="user", lazy=True, )
    decks = db.relationship("Deck", backref="user", lazy=True)
    card_comments = db.relationship("CardComment", backref="user", lazy=True, )
    user_tags = db.relationship("UserTag", backref="user", lazy=True, )
    # games = relationship("Game", back_populates="user")
    # card_favorites = relationship("CardFavorite", back_populates="user")
    # decks = relationship("Deck", back_populates="user")
    # card_comments = relationship("CardComment", back_populates="user")
    # user_tags = relationship("UserTag", back_populates="user")

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


    def as_dict(self):
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
          "created_at": self.created_at,
          "updated_at": self.updated_at,
          "is_active": self.is_active
        }
    def to_dict_show_hashed(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class Game(db.Model):
    # __tablename__ = 'games'
    __table_args__ = (db.UniqueConstraint('user_id', 'name'),{'extend_existing': True})

    id = db.Column(db.Integer, primary_key=True)
    is_public = db.Column(db.Boolean, default=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    promotion_points = db.Column(db.Integer, default=1000)
    name = db.Column(db.String(63), default='Untitled', nullable=False )
    description = db.Column(db.String(255), default='No description' )
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
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)


    cards= db.relationship("Card", backref="game", lazy=True, )
    card_categories= db.relationship("CardCategory", backref="game", lazy=True, )
    card_images= db.relationship("CardImage", backref="game", lazy=True, )
    game_tags = db.relationship("GameTag", backref="game", lazy=True, )

    # cards= relationship("Card", back_populates="game")
    # card_categories= relationship("CardCategory", back_populates="game")
    # card_images= relationship("CardImage", back_populates="game")
    # game_tags = relationship("GameTag", back_populates="game")

    # user= relationship("User", back_populates="games")


    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class Card(db.Model):
    # __tablename__ = 'cards'
    __table_args__ = (db.UniqueConstraint('game_id', 'name'), {'extend_existing': True})

    id = db.Column(db.Integer, primary_key=True)
    is_public = db.Column(db.Boolean, default=True)
    is_special_card = db.Column(db.Boolean, default=True)
    is_spell = db.Column(db.Boolean, default=False)
    game_id = db.Column(db.Integer, db.ForeignKey('game.id'), nullable=False)
    card_image_src = db.Column(db.Text, default='https://cardashian-storage-dev.s3-us-west-1.amazonaws.com/generic_card.jpg')
    category_id = db.Column(db.Integer, db.ForeignKey('card_category.id'), default=1)
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

    card_favorites = db.relationship("CardFavorite", backref="card", )
    decks = db.relationship("Deck", backref="card", )
    card_effects = db.relationship("CardEffect", backref="card", )
    card_comments = db.relationship("CardComment", backref="card", )
    card_tags = db.relationship("CardTag", backref="card", )

    # card_favorites = relationship("CardFavorite", back_populates="card")
    # decks = relationship("Deck", back_populates="card")
    # card_effects = relationship("CardEffect", back_populates="card")
    # card_comments = relationship("CardComment", back_populates="card")
    # card_tags = relationship("CardTag", back_populates="card")

    # game = relationship("Game", back_populates="cards")
    # card_category = relationship("CardCategory", back_populates="cards")
    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class CardFavorite(db.Model):
    # __tablename__ = 'card_favorites'
    __table_args__ = (db.UniqueConstraint('card_id', 'user_id', 'folder'),{'extend_existing': True})

    id = db.Column(db.Integer, primary_key=True)
    card_id= db.Column(db.Integer, db.ForeignKey('card.id'), nullable=False)
    user_id= db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    folder = db.Column(db.String(31), nullable=False)
    date_added = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    # user = relationship("User", back_populates="card_favorites")
    # card = relationship("Card", back_populates="card_favorites")

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class Deck(db.Model):
    # __tablename__ = 'decks'
    __table_args__ = (db.UniqueConstraint('card_id', 'user_id', 'name') ,{'extend_existing': True})
    id = db.Column(db.Integer, primary_key=True)
    card_id= db.Column(db.Integer, db.ForeignKey('card.id'), nullable=False)
    user_id= db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(31), default='Untitled Deck', nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    # user= relationship("User", back_populates="decks")
    # card = relationship("Card", back_populates="decks")

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class CardCategory(db.Model):
    # __tablename__ = 'card_categories'
    __table_args__ = (db.UniqueConstraint('game_id', 'list_order', 'name'),{'extend_existing': True})

    id = db.Column(db.Integer, primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey('game.id'), nullable=False)
    id_prefix = db.Column(db.String(2), default='XX', nullable=False)
    list_order = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(31), default='Generic', nullable=False)
    frame_color = db.Column(db.String(9), default='#cccccc', nullable=False)

    cards = db.relationship("Card", backref="card_category")
    # cards = relationship("Card", back_populates="card_category")

    # game = relationship("Game", back_populates="card_categories")

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class CardImage(db.Model):
    # __tablename__ = 'card_images'
    __table_args__ ={'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True)
    game_id= db.Column(db.Integer, db.ForeignKey('game.id'), nullable=False)
    src = db.Column(db.String(255), default=None)
    name = db.Column(db.String(31), default='Untitled', nullable=False)
    category = db.Column(db.String(31), default='none', nullable=False)

    # game = relationship("Game", back_populates="card_images")

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class CardEffect(db.Model):
    # __tablename__ = 'card_effect_pieces'
    __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key=True)
    card_id = db.Column(db.Integer, db.ForeignKey('card.id'), nullable=False)
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

    # card = relationship("Card", back_populates="card_effects")

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class CardComment(db.Model):
    # __tablename__ = 'card_comments'
    __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key=True)
    card_id = db.Column(db.Integer, db.ForeignKey('card.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    parent_comment_id = db.Column(db.Integer, db.ForeignKey('card_comment.id'), default=None)
    message = db.Column(db.Text, default='')
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    # user = relationship("User", back_populates="card_comments")
    # card = relationship("Card", back_populates="card_comments")

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class ProfileComment(db.Model):
    # __tablename__ = 'card_comments'
    __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key=True)
    profile_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    message = db.Column(db.Text, default='')
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    # user = relationship("User", back_populates="card_comments")
    # card = relationship("Card", back_populates="card_comments")

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class UserTag(db.Model):
    # __tablename__ = 'user_tags'
    __table_args__ = (db.UniqueConstraint('user_id'),{'extend_existing': True})
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(15), default='no tag', nullable=False)

    # user = relationship("User", back_populates="user_tags")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name
        }

class CardTag(db.Model):
    # __tablename__ = 'card_tags'
    __table_args__ = (db.UniqueConstraint('card_id', 'name'),{'extend_existing': True})
    id = db.Column(db.Integer, primary_key=True)
    card_id = db.Column(db.Integer, db.ForeignKey('card.id'), nullable=False)
    name = db.Column(db.String(15), default='no tag', nullable=False)

    # card = relationship("Card", back_populates="card_tags")

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class GameTag(db.Model):
    # __tablename__ = 'game_tags'
    __table_args__ = (db.UniqueConstraint('game_id', 'name'),{'extend_existing': True})
    id = db.Column(db.Integer, primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey('game.id'), nullable=False)
    name = db.Column(db.String(15), default='no tag', nullable=False)


    # game = relationship("Game", back_populates="game_tags")

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class Friend(db.Model):
    # __table_args__ = (db.UniqueConstraint('user_id, friend_id'),)
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    friend_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def as_dict(self):
       return {'id': self.id, 'user_id': self.user_id, 'friend_id': self.friend_id}
