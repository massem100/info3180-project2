from flask_wtf import FlaskForm
from wtforms.fields.html5 import EmailField
from wtforms import TextAreaField, StringField, PasswordField
from wtforms.validators import InputRequired, Email, DataRequired, Length
from flask_wtf.file import FileField, FileAllowed, FileRequired



class RegisterForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired('A username must be entered')])
    password = PasswordField('Password', validators=[DataRequired("Please enter a password.")])
    first_name = StringField('First Name', validators=[DataRequired('First name field should not be empty ')])
    last_name = StringField('Password', validators=[DataRequired('Last Name field should not be empty')])
    email = EmailField('Email', validators = [DataRequired('Email Field should not be  empty')])
    Location = StringField('Location', validators=[DataRequired('No location was provided')])
    Biography = TextAreaField('Biography', validators=[DataRequired('Enter a Biography ')])
    photo = FileField('photo', validators=[FileRequired('No photo was submitted.'), FileAllowed(['jpg', 'jpeg', 'png'], 'Images only!')])

class LoginForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired('A username is required')])
    password = PasswordField('Password', validators = [DataRequired('Please enter a password')]) 
