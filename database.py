from dotenv import load_dotenv
from cardashian_app.models import User, CardImage, Game, CardCategory
from cardashian_app import app, db, sess
from cardashian_app.extensions import guard
from datetime import date

load_dotenv()


with app.app_context():
    db.drop_all()
    db.create_all()
    guest = User(username='guest', email='guest@guest.guest', city='San Francisco',
               country="United States", hashed_password=guard.hash_password('password'), promotion_points=0)
    ian = User(username='Ian', email='ian@aa.io', city='Philadelphia',
               country="PA", hashed_password=guard.hash_password('password'), promotion_points=300)
    javier = User(username='Javier', email='javier@aa.io', city='Las Vegas',
                  country="NV", hashed_password=guard.hash_password('password'), promotion_points=400)
    dean = User(username='Dean', email='dean@aa.io', city='Boise',
                country="ID", hashed_password=guard.hash_password('password'), promotion_points=500)
    angela = User(username='Angela', email='angela@aa.io', city='Baltimore',
                  country="MD", hashed_password=guard.hash_password('password'), promotion_points=800)
    soonmi = User(username='Soon-Mi', email='soonmi@aa.io', city='Birmingham',
                  country="AL", hashed_password=guard.hash_password('password'), promotion_points=500)
    alissa = User(username='Alissa', email='alissa@aa.io', city='Houston',
                  country="TX", hashed_password=guard.hash_password('password'), promotion_points=600)
    demo = User(username='demo', email='demo@example.com', city='New York',
                country="NY", hashed_password=guard.hash_password('password'), promotion_points=745)
    db.session.add_all([guest, ian, javier, dean, angela, soonmi, alissa, demo])
    db.session.commit()

    default_game = Game(owner_id=7)
    db.session.add(default_game)
    db.session.commit()

    default_card_image = CardImage(game_id=1, name='default', category='card', src='https://www.thepokerdepot.com/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/t/p/tpd-standard-fronts-product.jpg')
    db.session.add(default_card_image)
    db.session.commit()

    default_card_category = CardCategory(game_id=1, list_order=1)
    db.session.add(default_card_category)
    db.session.commit()
