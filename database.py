from dotenv import load_dotenv
from faker import Faker

from cardashian_app.models import User, CardImage, Game, CardCategory, Card
from cardashian_app import app, db, sess
from cardashian_app.extensions import guard
from datetime import date
import random

true_faker = Faker()
fake_en = Faker(['en_US'])
fake_it = Faker(['it_IT'])
fake_pt = Faker(['pt_PT'])
fake_jp = Faker(['jp_JP'])
fake_ta = Faker(['ta_IN'])

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

    game_iterable = 1
    while game_iterable <= 8:
        db.session.add(Game(owner_id=game_iterable,name=fake_en.company(), description=true_faker.paragraph(nb_sentences=2), home_bg_src=true_faker.image_url(), game_logo_src=true_faker.image_url()))
        db.session.commit()
        db.session.add(CardCategory(game_id=game_iterable, list_order=1))
        game_iterable += 1
        db.session.commit()


    for fake_game in range(50):
        rand_num = random.randint(1, 8)
        new_fake_game = Game(owner_id=rand_num, name=fake_en.company(), home_bg_src=true_faker.image_url(), description=true_faker.paragraph(nb_sentences=4), game_logo_src=true_faker.image_url())
        db.session.add(new_fake_game)
        db.session.commit()
        new_fake_category = CardCategory(game_id=new_fake_game.id, name=fake_en.color_name(), list_order=1, frame_color=fake_en.hex_color())
        db.session.add(new_fake_category)
        db.session.commit()

    unique_fake_names_en = [fake_en.unique.name() for i in range(50)]
    unique_fake_names_it = [fake_it.unique.name() for i in range(50)]
    unique_fake_names_pt = [fake_pt.unique.name() for i in range(50)]
    unique_fake_names_jp = [fake_jp.unique.name() for i in range(50)]
    unique_fake_names_ta = [fake_ta.unique.name() for i in range(50)]
    faker_names_list = [unique_fake_names_en, unique_fake_names_it, unique_fake_names_pt, unique_fake_names_jp, unique_fake_names_ta]
    for i in range(58):
        random_faker_language_int = random.randint(0, 4)
        for fake_name in faker_names_list[random_faker_language_int]:
            db.session.add(Card(game_id=i+1, name=fake_name, artist=fake_en.name(), description_title=fake_en.color_name(), manual_description=true_faker.paragraph(nb_sentences=2), card_image_src=true_faker.image_url()))
            db.session.commit()

    default_card_image = CardImage(game_id=1, name='default', category='card', src='https://cardashian-storage-dev.s3-us-west-1.amazonaws.com/generic_card.jpg')
    db.session.add(default_card_image)
    db.session.commit()
