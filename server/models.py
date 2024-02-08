from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()

class User(db.Model,SerializerMixin):
    __tablename__ ='users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    blogs = db.relationship('Blog', backref='user')  # one user can have many blogs
    comments = db.relationship('Comment', backref= 'user')   # a user can comment on other users’ posts

    def serialize(self):
        return{'username':self.username}


class Blog(db.Model,SerializerMixin):
    __tablename__ = 'blogs'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    content = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))


    def serialize(self):
        return{'id':self.id, 'title':self.title, 'content':self.content}


class Comment(db.Model,SerializerMixin):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    comments = db.Column(db.String(150), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    blog_id = db.Column(db.Integer, db.ForeignKey('blogs.id'), nullable=False)

    def serialize(self):
        return {'Comment': self.comments}