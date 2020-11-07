from cardashian_app.models import User
from cardashian_app import db

def seed_users():
    ian = User(name='Ian', email='ian@aa.io', city='Philadelphia',
                state="PA", password='password', points=300)
    javier = User(name='Javier', email='javier@aa.io', city='Las Vegas',
                    state="NV", password='password', points=400)
    dean = User(name='Dean', email='dean@aa.io', city='Boise',
                    state="ID", password='password', points=500)
    angela = User(name='Angela', email='angela@aa.io', city='Baltimore',
                    state="MD", password='password', points=800)
    soonmi = User(name='Soon-Mi', email='soonmi@aa.io', city='Birmingham',
                    state="AL", password='password', points=500)
    alissa = User(name='Alissa', email='alissa@aa.io', city='Houston',
                    state="TX", password='password', points=600)
    demo = User(name='demo', email='demo@example.com', city='New York',
                    state="NY", password='password', points=745)

    db.session.commit()
