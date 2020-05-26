from flask_wtf import FlaskForm
from wtforms.fields.html5 import EmailField
from wtforms import TextAreaField, StringField, PasswordField
from wtforms.validators import InputRequired, Email, Length
from flask_wtf.file import FileField, FileAllowed, FileRequired



class RegisterForm(FlaskForm):
    username = StringField('username', validators=[InputRequired('A username must be entered')])
    password = PasswordField('password', validators=[InputRequired('Please enter a password.')])
    first_name = StringField('first Name', validators=[InputRequired('First name field should not be empty')])
    last_name = StringField('password', validators=[InputRequired('Last Name field should not be empty')])
    email = EmailField('Email', validators = [InputRequired('Email Field should not be  empty'), Email()])
    location = StringField('location', validators=[InputRequired('No Location was provided')])
    biography = TextAreaField('biography', validators=[InputRequired('Biography field must not be empty')])
    photo = FileField ('photo', validators=[InputRequired('An image must be uploaded'), FileAllowed(['jpg','jpeg','png'], 'Images only!')])

class LoginForm(FlaskForm):
    username = StringField('Username', validators=[InputRequired('A username is required')])
    password = PasswordField('Password', validators = [InputRequired('Please enter a password')]) 

class PostForm(FlaskForm):
    photo = FileField('Photo',validators=[FileRequired(),FileAllowed(['png', 'jpg', 'jpeg','Images only!'])])
    caption=TextAreaField('Caption', validators=[InputRequired('Caption required')])
    