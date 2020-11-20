from dotenv import load_dotenv
from faker import Faker

from cardashian_app.models import User, CardImage, Game, CardCategory, Card, CardComment, Friend, ProfileComment
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
    guest = User(username='guest', email='guest@guest.guest', city='San Francisco', profile_pic_src=true_faker.image_url(),background_src=true_faker.image_url(),
               country="United States", hashed_password=guard.hash_password('password'), promotion_points=0)
    ian = User(username='Ian', email='ian@aa.io', city='Philadelphia',profile_pic_src=true_faker.image_url(),background_src=true_faker.image_url(),
               country="PA", hashed_password=guard.hash_password('password'), promotion_points=300)
    javier = User(username='Javier', email='javier@aa.io', city='Las Vegas',profile_pic_src=true_faker.image_url(),background_src=true_faker.image_url(),
                  country="NV", hashed_password=guard.hash_password('password'), promotion_points=400)
    dean = User(username='Dean', email='dean@aa.io', city='Boise',profile_pic_src=true_faker.image_url(),background_src=true_faker.image_url(),
                country="ID", hashed_password=guard.hash_password('password'), promotion_points=500)
    angela = User(username='Angela', email='angela@aa.io', city='Baltimore',profile_pic_src=true_faker.image_url(),background_src=true_faker.image_url(),
                  country="MD", hashed_password=guard.hash_password('password'), promotion_points=800)
    soonmi = User(username='Soon-Mi', email='soonmi@aa.io', city='Birmingham',profile_pic_src=true_faker.image_url(),background_src=true_faker.image_url(),
                  country="AL", hashed_password=guard.hash_password('password'), promotion_points=500)
    alissa = User(username='Alissa', email='alissa@aa.io', city='Houston',profile_pic_src=true_faker.image_url(),background_src=true_faker.image_url(),
                  country="TX", hashed_password=guard.hash_password('password'), promotion_points=600)
    demo = User(username='demo', email='demo@example.com', city='New York',profile_pic_src=true_faker.image_url(),background_src=true_faker.image_url(),
                country="NY", hashed_password=guard.hash_password('password'), promotion_points=745)
    default_users = [guest, ian, javier, dean, angela, soonmi, alissa, demo]
    db.session.add_all(default_users)
    # db.session.commit()

    game_iterable = 1
    while game_iterable <= 8:
        new_game = Game(user_id=game_iterable, name=fake_en.company(), description=true_faker.paragraph(nb_sentences=2), home_bg_src=true_faker.image_url(), game_logo_src=true_faker.image_url(), users=default_users[game_iterable-1])
        # db.session.commit()
        db.session.add(CardCategory(game_id=game_iterable, list_order=1))
        game_iterable += 1
    db.session.commit()


    for fake_game in range(16):
        rand_num = random.randint(1, 8)
        new_fake_game = Game(user_id=rand_num, name=fake_en.company(), home_bg_src=true_faker.image_url(), description=true_faker.paragraph(nb_sentences=4), game_logo_src=true_faker.image_url())
        db.session.add(new_fake_game)
        db.session.commit()
        new_fake_category = CardCategory(game_id=new_fake_game.id, name=fake_en.color_name(), list_order=1, frame_color=fake_en.hex_color())
        db.session.add(new_fake_category)
        db.session.commit()

    unique_fake_names_en = [fake_en.unique.name() for i in range(20)]
    unique_fake_names_it = [fake_it.unique.name() for i in range(20)]
    unique_fake_names_pt = [fake_pt.unique.name() for i in range(20)]
    unique_fake_names_jp = [fake_jp.unique.name() for i in range(20)]
    unique_fake_names_ta = [fake_ta.unique.name() for i in range(20)]
    faker_names_list = [unique_fake_names_en, unique_fake_names_it, unique_fake_names_pt, unique_fake_names_jp, unique_fake_names_ta]
    for i in range(6):
        random_faker_language_int = random.randint(0, 4)
        for fake_name in faker_names_list[random_faker_language_int]:
            new_fake_card =Card(game_id=i+1, name=fake_name, artist=fake_en.name(), description_title=fake_en.color_name(), manual_description=true_faker.paragraph(nb_sentences=2), card_image_src=true_faker.image_url())
            db.session.add(new_fake_card)
            db.session.commit()
            for k in range(5):
                db.session.add(CardComment(user_id=random.randint(1, 8), card_id=new_fake_card.id, message=true_faker.paragraph(nb_sentences=2)))
    for i in range(1,9):
        for k in range(1, 9):
            new_comment = ProfileComment(message=true_faker.paragraph(nb_sentences=5), user_id=random.randint(1, 8), profile_id=random.randint(1, 8) )
            db.session.add(Friend(user_id=i, friend_id=k))
            db.session.add(new_comment)
            db.session.commit()

    default_card_image = CardImage(game_id=1, name='default', category='card', src='https://cardashian-storage-dev.s3-us-west-1.amazonaws.com/generic_card.jpg')
    db.session.add(default_card_image)
    db.session.commit()
