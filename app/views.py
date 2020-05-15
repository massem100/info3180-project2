"""
Flask Documentation:     http://flask.pocoo.org/docs/
Jinja2 Documentation:    http://jinja.pocoo.org/2/documentation/
Werkzeug Documentation:  http://werkzeug.pocoo.org/documentation/
This file creates your application.
"""
import os
from app import app, db, login_manager
from flask import render_template, request, jsonify, flash, session
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import current_user, logout_user, login_user
from app.forms import RegisterForm, PostForm, LoginForm
from app.models import User, Post, Like, Follow
from datetime import datetime

###
# Routing for your application.
###
# @app.route('/api/users/<user_id>/posts', methods = ['POST'])
# def addposts(user_id):
#     posts = (db.session.query(Post).filter_by(current_user.id==user_id).all())
#     return jsonify(message = [{"post ID" : posts.id,
#                                  "photo" : posts.photo,
#                                  "caption" : posts.caption,
#                                   "created on" : posts.created_on}])
        


@app.route('/api/users/{user_id}/posts', methods=['GET', 'POST'])
def userposts(user_id):
    form = PostForm()
    id = int(user_id)
    
    if request.method == 'POST':
        if form.validate_on_submit():
            photo = form.photo.data
            caption = form.caption.data

            secure_file = secure_filename(photo.filename)
            photo.save(os.path.join(app.config['UPLOAD_FOLDER'], secure_file))
            
            new_post = Post(user_id, photo, caption)
            db.session.add(new_post)
            db.session.commit()
            return jsonify(response=[{"message": "Successfully created a new post"}])
        else:
            return jsonify(errors=[{"errors": form_errors(form)}])
    if request.method == 'GET':
        post_results = []
        followers_list = [0, 0]
        userdetail = User.query.filter_by(id=id).first()
        user_posts = db.sesion.query(Post).filter_by(user_id=id).all()
        total_posts = len(user_posts)
        followers = Follow.query.filter_by(user_id=id).all()
        follow = len(followers)
        for follower in followers:
            followers_list.append(follower.user_id)
        for user in user_posts:
            post_results.append({'id': user.id, 
                        'user_id': user.user_id,
                        'photo': user.photo,
                        'caption': user.caption,
                      'created_on': user.created_on,
                       'likes': 0})

        response = [{"id": user_id, "username": userdetail.username,
                     "firstname": userdetail.first_name,
                     "lastname": userdetail.last_name,
                     "email": userdetail.email,
                     "location": userdetail.location,
                     "biography": userdetail.biography,
                     "profile_photo": userdetail.profile_photo,
                     "joined_on": userdetail.joined_on,
                     "posts": post_results,
                     "numpost": total_posts,
                     "numfollower": follow,
                     "follower": followers_list}]
        # print(response)
        return jsonify(post_results), jsonify(response)
    else:
        return jsonify(error=[{"errors": "Connection not achieved"}])


    


@app.route('/api/users/{user_id}/follow',  methods=['POST'])
def follow():
    if request.method == 'POST':
        current_user = int(request.form['follower_id'])
        target_user = int(request.form['user_id'])        
        follows = Follow.query.filter_by(user_id=target_user).all()
        count= ''
        for follow in follows:
            if current_user == follow.follower_id:
                count = 1

        if count != 1:
            follow = Follow(target_user, current_user)
            db.session.add(follow)
            db.session.commit()

            user = User.query.filter_by(id=target_user).first()
            follow_total = len(Follow.query.filter_by(user_id=target_user).all())
            return jsonify(response=[{"message": "You are now following that user." + user.username, "follow": follow_total}])
        else:
            follow_total = len(Follow.query.filter_by(user_id=target_user).all())
            return jsonify(response=[{"message": "You are already following that user.", "follow": follow_total}])
    else:
        return jsonify(errors=[{'error': 'Connection not achieved'}])

    if request.method == 'GET':
        follow_total = len(Follow.query.filter_by(user_id=target_user).all())
        return jsonify([{"followers" : follow_total}])


@app.route('/api/posts', methods = ['POST'])
def posts():

    return 'all posts'


@app.route('/api/posts/{post_id}/like', methods = ['POST'])
def likes(post_id): 
    if request.method == 'POST':
        user_id = int(request.form['user_id'])
        post = int(request.form['post_id'])
        like = Like(user_id, post)
        db.session.add(like)
        db.session.commit()
        total = len(Like.query.filter_by(post_id=post).all())
        return jsonify(response=[{'message': 'Post liked!', 'likes': total}])
    else:
        return jsonify(error=[{'error': 'Connection not achieved'}])

    
@app.route('/api/users/register', methods = ['POST'])
def register():
    form = RegisterForm()
    if request.method == 'POST':
        print('sigh')
        if form.validate_on_submit():
            print('here')
            username = form.username.data
            password = form.password.data
            first_name = form.first_name.data
            last_name = form.last_name.data
            email = form.email.data
            location = form.location.data
            biography = form.biography.data
            photo = form.photo.data
            
            photo_filename = secure_filename(photo.filename)
            folder =app.config['UPLOAD_FOLDER']
            photo.save(os.path.join(folder, photo_filename))


            # Checks if another user has this username 
            existing_username = db.session.query(User).filter_by(username=username).first()

            # Checks if another user has this email address
            existing_email = db.session.query(User).filter_by(email=email).first()

            # If unique email address and username provided then log new user
            if existing_username is None and existing_email is None:
                user = User(username=request.form['username'], 
                        password=request.form['password'], 
                        first_name=request.form['first_name'],
                        last_name=request.form['last_name'], 
                        email=request.form['email'], 
                        location=request.form['location'],
                        biography=request.form['biography'],
                        photo=request.form['photo'])

            db.session.add(user)
            db.session.commit()
                                     
            return jsonify([{'message': 'Successfully registered'}])
        else: 
            error_list = form_errors(form)
            error = [{'errors': error_list}]
            return  jsonify(errors = error)



@app.route('/api/auth/login', methods = ['POST'])
def login(): 

    form = LoginForm()
    if request.method == "POST" and form.validate_on_submit():
        if form.username.data:
            # Get the username and password values from the form.
            username = form.username.data
            password = form.password.data

            user = User.query.filter_by(username=username).first()

            if user is not None and check_password_hash(user.password, password):
                
                # get user id, load into session
                login_user(user)

                # remember to flash a message to the user
                flash('You have been logged in successfully.', 'success')
                return jsonify(message = [{"username": username, "password": password}]) 

            else:
                flash('Invalid username or password', 'danger')
    flash('Invalid username or password', 'danger')


@app.route('/api/auth/logout', methods = ['GET'])
@login_required
def logout():
    logout_user()
    flash('Unfortunately, you have been logged out.', 'danger')

@login_manager.user_loader
def load_user(id):
    user = User.query.get(int(id))
    return user

# Please create all new routes and view functions above this route.
# This route is now our catch all route for our VueJS single page
# application.
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    """
    Because we use HTML5 history mode in vue-router we need to configure our
    web server to redirect all routes to index.html. Hence the additional route
    "/<path:path".

    Also we will render the initial webpage and then let VueJS take control.
    """
    return render_template('index.html')



# Here we define a function to collect form errors from Flask-WTF
# which we can later use
def form_errors(form):
    error_messages = []
    """Collects form errors"""
    for field, errors in form.errors.items():
        for error in errors:
            message = u"Error in the %s field - %s" % (
                getattr(form, field).label.text,
                error
            )
            error_messages.append(message)

    return error_messages


###
# The functions below should be applicable to all Flask apps.
###


@app.route('/<file_name>.txt')
def send_text_file(file_name):
    """Send your static text file."""
    file_dot_text = file_name + '.txt'
    return app.send_static_file(file_dot_text)


@app.after_request
def add_header(response):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also tell the browser not to cache the rendered page. If we wanted
    to we could change max-age to 600 seconds which would be 10 minutes.
    """
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    response.headers['Cache-Control'] = 'public, max-age=0'
    return response


@app.errorhandler(404)
def page_not_found(error):
    """Custom 404 page."""
    return render_template('404.html'), 404


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port="8080")
