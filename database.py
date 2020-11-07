from dotenv import load_dotenv
from cardashian_app.models import CardFavorite,Deck,CharacterCategory,CardImage,CardEffect,CardComment,Card,Game,UserTag,CardTag,GameTag,User
from cardashian_app import app, db
from datetime import date

load_dotenv()


with app.app_context():
    db.drop_all()
    db.create_all()
    ian = User(name='Ian', email='ian@aa.io', city='Philadelphia',
               country="PA", password='password', promotion_points=300)
    javier = User(name='Javier', email='javier@aa.io', city='Las Vegas',
                  country="NV", password='password', promotion_points=400)
    dean = User(name='Dean', email='dean@aa.io', city='Boise',
                country="ID", password='password', promotion_points=500)
    angela = User(name='Angela', email='angela@aa.io', city='Baltimore',
                  country="MD", password='password', promotion_points=800)
    soonmi = User(name='Soon-Mi', email='soonmi@aa.io', city='Birmingham',
                  country="AL", password='password', promotion_points=500)
    alissa = User(name='Alissa', email='alissa@aa.io', city='Houston',
                  country="TX", password='password', promotion_points=600)
    demo = User(name='demo', email='demo@example.com', city='New York',
                country="NY", password='password', promotion_points=745)

    db.session.add(ian)
    db.session.add(javier)
    db.session.add(dean)
    db.session.add(angela)
    db.session.add(soonmi)
    db.session.add(alissa)
    db.session.add(demo)

    db.session.commit()
