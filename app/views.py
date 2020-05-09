"""
Flask Documentation:     http://flask.pocoo.org/docs/
Jinja2 Documentation:    http://jinja.pocoo.org/2/documentation/
Werkzeug Documentation:  http://werkzeug.pocoo.org/documentation/
This file creates your application.
"""

import os
from app import app
from app.models import User
from flask import render_template, request, jsonify
from werkzeug.utils import secure_filename

###
# Routing for your application.
###

# @app.route('/api/users/{user_id}/posts', methods = ['POST'])
# def addposts():

#     return 'add posts'


# @app.route('/api/users/{user_id}/posts', methods=['GET'])
# def getposts():

#     return 'To get posts'


# @app.route('/api/users/{user_id}/follow',  methods=['POST'])
# def follow():
    
#     return 'follow'

# @app.route('/api/posts', methods = ['POST'])
# def posts():

#     return 'all posts'


# @app.route('/api/posts/{post_id}/like', methods = ['POST'])
# def likes(): 
#     return 'likes'

    
# @app.route('/api/users/register', methods = ['POST'])
# def register():

#     return 'register'


# @app.route('/api/auth/login', methods = ['POST'])
# def login(): 

#     return 'login'


# @app.route('/api/auth/logout', methods = ['GET'])
# def logout():
    
#     return 'logout'


# @login_manager.user_loader
# def load_user(id):
#     return User.query.get(int(id))

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
