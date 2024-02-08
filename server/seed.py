from random import choice as rc
import faker
from models import db, User, Blog, Comment
fake = faker.Faker()

from app  import app

with app.app_context():
    User.query.delete()
    Blog.query.delete()
    Comment.query.delete()

    for p in range (10):
        username =fake.name()
        username = User(username=username)
        db.session.add(username)
        db.session.commit()

    for p in range(10):
        title = fake.sentence(nb_words=6)
        content = fake.paragraphs(nb=5)[0]
        user_id=  rc(User.query.all()).id  
        blog = Blog(title=title, content=content, user_id=user_id)
        db.session.add(blog)
        db.session.commit()
        
    for p in range(15):
        comment = fake.sentence(nb_words=6)
        user_id = rc(User.query.all()).id  
        blog_id = rc(Blog.query.all()).id  
        comments =Comment(comments=comment, user_id=user_id, blog_id=blog_id)
        db.session.add(comments)
        db.session.commit()