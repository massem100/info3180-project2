from . import db
from werkzeug.security import generate_password_hash
from flask_login._compat import unicode
from flask_login import UserMixin
from datetime import date

class User(UserMixin, db.Model):
    # You can use this to change the table name. The default convention is to use
    # the class name. In this case a class name of UserProfile would create a
    # user_profile (singular) table, but if we specify __tablename__ we can change it
    # to `user_profiles` (plural) or some other name.
    __tablename__ = 'Users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True)
    password = db.Column(db.String(255))
    first_name = db.Column(db.String(80))
    last_name = db.Column(db.String(80))
    email = db.Column(db.String(100))
    location = db.Column(db.String(80))
    bio = db.Column(db.String(250))
    proPhoto = db.Column(db.String(200))
    joined_on = db.Column(db.Date())

    def __init__(self, username, password, first_name, last_name, email,location, bio, proPhoto):
        self.first_name = first_name
        self.last_name = last_name
        self.username = username
        self.password = generate_password_hash(password, method='pbkdf2:sha256')
        self.location = location 
        self.bio = bio
        self.proPhoto = proPhoto 
        self.joined_on = date.today()

    
    def __repr__(self):
        return '<User %r>' % (self.username)


class Post(UserMixin, db.Model):
    # You can use this to change the table name. The default convention is to use
    # the class name. In this case a class name of UserProfile would create a
    # user_profile (singular) table, but if we specify __tablename__ we can change it
    # to `user_profiles` (plural) or some other name.
    __tablename__ = 'Posts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(15), db.ForeignKey('Users.user_id'))
    photo = db.Column(db.String(80))
    caption = db.Column(db.String(250))
    created_on = db.Column(db.date())

    def __init__(self, user_id, photo, caption, created_on):
       self.user_id = user_id
       self.photo = photo
       self.caption = caption 
       self.created_on = date.today()

    
    # def __repr__(self):
    #     return '<User %r>' % (self.username)

class Likes(UserMixin, db.Model):

    __tablename__ = 'Likes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(15), db.ForeignKey('Users.user_id'))
    post_id = (db.Column(db.Integer, db.ForeignKey('Posts.user_id'))


    def __init__(self, user_id, post_id):
       self.user_id = user_id
       self.post_id = post_id

class Follows(UserMixin,db.Model):

    __tablename__= 'Follows'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(15), db.ForeignKey('Users.user_id'))
    follower_id = (db.Column(db.Integer))

    def __init__(self, user_id,follower_id):
       self.user_id = user_id
       self.follower_id = follower_id
