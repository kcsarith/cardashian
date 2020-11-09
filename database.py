from dotenv import load_dotenv
from cardashian_app.models import User
from cardashian_app import app, db, sess
from cardashian_app.extensions import guard
from datetime import date

load_dotenv()


with app.app_context():
    db.drop_all()
    db.create_all()
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

    db.session.add_all([ian, javier, dean, angela, soonmi, alissa, demo])

    db.session.commit()
