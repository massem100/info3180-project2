"""
Flask Documentation:     http://flask.pocoo.org/docs/
Jinja2 Documentation:    http://jinja.pocoo.org/2/documentation/
Werkzeug Documentation:  http://werkzeug.pocoo.org/documentation/
This file creates your application.
"""
import os
from app import app
from flask import render_template, request, jsonify
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash
from app.forms import RegisterForm
from app.models import User, Post

###
# Routing for your application.
###
@app.route('/api/users/<user_id>/posts', methods = ['POST'])
def addposts():
    posts = (db.session.query(Post).filter_by(current_user.user_id=user_id).all())
    return jsonify(message = [{"post ID" : posts.id, "photo" : posts.photo, "caption" : posts.caption, "created on" : posts.created_on}])
        


@app.route('/api/users/{user_id}/posts', methods=['GET'])
def getposts():

    return 'To get posts'


@app.route('/api/users/{user_id}/follow',  methods=['POST'])
def follow():
    
    return 'follow'

@app.route('/api/posts', methods = ['POST'])
def posts():

    return 'all posts'


@app.route('/api/posts/{post_id}/like', methods = ['POST'])
def likes(): 
    return 'likes'

    
@app.route('/api/users/register', methods = ['POST'])
def register():
    form = RegisterForm()
    if request.method == "POST" and form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        first_name = form.first_name.data
        last_name = form.last_name.data
        email = form.email.data
        location = form.location.data
        biography = form.biography.data
        photo = form.photo.data

        filename = secure_filename(photo.filename)
        photo.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))


        # Checks if another user has this username 
        existing_username = db.session.query(User).filter_by(username=username).first()

        # Checks if another user has this email address
        existing_email = db.session.query(User).filter_by(email=email).first()

        # If unique email address and username provided then log new user
        if existing_username is None and existing_email is None:
            user = User(username=request.form['username'], password=request.form['password'], first_name=request.form['first_name'], last_name=request.form['last_name'], email=request.form['email'], location=request.form['location'], biography=request.form['biography'])

            db.session.add(user)
            db.session.commit()
            flash('Successfully registered', 'success')
            
            return jsonify(message = [{"username" : username, "password" : password, "first_name" : first_name, "last_name" : last_name, "email" : email, "location" : location, "biography" : biography}])
        
    # return render_template("register.html")


@app.route('/api/auth/login', methods = ['POST'])
def login(): 

    return 'login'


@app.route('/api/auth/logout', methods = ['GET'])
def logout():
    
    return 'logout'


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
