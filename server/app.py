import os
from http.client import BAD_REQUEST
from flask import Flask, make_response, request, jsonify, abort, render_template
from flask_migrate import Migrate
from flask_restful import Api, Resource
from werkzeug.exceptions import NotFound


from models import db, User, Blog, Comment
from dotenv import load_dotenv
load_dotenv()

app = Flask(
    __name__,
    static_url_path='',
    static_folder='../client/build',
    template_folder='../client/build'
    )
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DATABASE_URI")
# postgresql://blog_3dxg_user:rxWCNeYDLIzzSxF4qp1Pr7g6Jt2oRnDG@dpg-cn55f4a1hbls7390qurg-a.oregon-postgres.render.com/blog_3dxg
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False



migrate = Migrate(app, db)

db.init_app(app)

api= Api(app)


@app.errorhandler(NotFound)
def handle_not_found(e):
    return render_template('index.html', title='Homepage', message='Welcome to our website!')

# @app.route('/')
# def home():
#     return "<h1>Welcome to Blog spot Application</h1>"

class UsersList(Resource):
    def get(self):
        users = User.query.all()
        return [{"id": user.id, "name": user.username} for user in users]

    def post(self):
        data = request.get_json()
        username = data['username']

        if not username:
            abort(400, description="Username is required.")

        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            abort(400, description="User with this username already exists.")

        new_user = User(username=username)
        db.session.add(new_user)
        db.session.commit()

        response = make_response(jsonify(new_user.serialize()), 201)
        return response

api.add_resource(UsersList, "/users")

class UsersByID(Resource):
    def get(self, user_id):
        user = User.query.get(user_id)
        if user:
            return {"id": user.id, "name": user.username}
        else:
            raise NotFound("User not found")
        
    def delete(self, user_id):
        user = User.query.get(user_id)
        if not user:
            return {'error':'User does not exist'},404
        else:
            db.session.delete(user)
            db.session.commit()
            response = make_response(jsonify({'Message':'User deleted'}), 200)
            return response
    
    def patch(self, user_id):

        existing_user = User.query.get(user_id)
        if not existing_user:
            return {'error':'User does not exist'},404
        
        data = request.get_json()
        name = data['username']
        if name:
            existing_user.username = name
            db.session.commit()

            response = make_response(jsonify(existing_user.serialize()), 200)
            return response

api.add_resource(UsersByID, "/users/<int:user_id>")


class Blogs(Resource):
    def get(self):
        blogs = Blog.query.all()
        return [{"id": blog.id, "title": blog.title, "content": blog.content} for blog in blogs]

    def post(self):
        data = request.get_json()
        title = data['title']
        content = data['content']
        user_id = data['user_id']
        new_blog=Blog(title=title, content=content, user_id=user_id)

        db.session.add(new_blog)
        db.session.commit()
        response_dict = new_blog.serialize()
        response = make_response(jsonify(response_dict), 201)
        return  response   


api.add_resource(Blogs, "/blogs")


class BlogsByID(Resource):
    def get(self, blog_id):
        blog = Blog.query.get(blog_id)
        if blog:
            return {"id": blog_id, "title": blog.title, "content": blog.content}
        else:
            raise NotFound("Blog not found")
        
        
    def delete(self, blog_id):
        blog = Blog.query.get(blog_id)
        if not blog:
            return {'error':'Blog does not exist'},404
        else:
            db.session.delete(blog)
            db.session.commit()
            response = make_response(jsonify({'Message':'Blog deleted'}), 200)
            return response
        
    def patch(self, blog_id):

        existing_content = Blog.query.get(blog_id)
        if not existing_content:
            return {'error':'Blog does not exist'},404
        
        data = request.get_json()
        content = data['content']
        if content:
            existing_content.content = content
            db.session.commit()

            response = make_response(jsonify(existing_content.serialize()), 200)
            return response

api.add_resource(BlogsByID, "/blogs/<int:blog_id>")

class Comments(Resource):
    def get(self):
        comments = Comment.query.all()
        return [{"id": Comment.id, "Comments": Comment.comments} for Comment in comments]
    

    def post(self):
        data = request.get_json()
        comments = data['comments']
        user_id = data['user_id']
        blog_id = data['blog_id']
        new_comment=Comment(comments=comments,user_id=user_id, blog_id=blog_id)

        db.session.add(new_comment)
        db.session.commit()
        response_dict = new_comment.serialize()
        response = make_response(jsonify(response_dict), 201)
        return  response 

api.add_resource(Comments, "/comments")


class CommentsByID(Resource):
    def get (self, comment_id):
        comment = Comment.query.get(comment_id)
        if comment:
            return {"id": comment_id, "Comments": comment.comments}
        else:
            raise NotFound("Comment not found")     


    def delete(self, comment_id):
        comment = Comment.query.get(comment_id)
        if not comment:
            return {'error':'comment does not exist'},404
        else:
            db.session.delete(comment)
            db.session.commit()
            response = make_response(jsonify({'Message':'comment deleted'}), 200)
            return response
        
    def patch(self, comment_id):

        existing_comment = Comment.query.get(comment_id)
        if not existing_comment:
            return {'error':'comment does not exist'},404
        
        data = request.get_json()
        comment = data['comments']
        if comment:
            existing_comment.comments = comment
            db.session.commit()

            response = make_response(jsonify(existing_comment.serialize()), 200)
            return response

api.add_resource(CommentsByID, "/comments/<int:comment_id>")


if __name__ == '__main__':
    app.run(port=5555, debug=True)