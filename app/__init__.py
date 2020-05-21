from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_wtf.csrf import CSRFProtect
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token



UPLOAD_FOLDER = './app/static/uploads'

app = Flask(__name__)
app.config['SECRET_KEY'] = 'v\xf9\xf7\x11\x13\x18\xfaMYp\xed_\xe8\xc9w\x06\x8e\xf0f\xd2\xba\xfd\x8c\a'
# added just to suppress a warnin
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://vnxplwgjwidfgv:0dc317b0b28ce7c3fdb75267871461ca21b7ef529ee905e856cf20040c4caa23@ec2-18-233-32-61.compute-1.amazonaws.com:5432/d5smonmcj6p05q'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

csrf = CSRFProtect(app)
cors = CORS(app)

db = SQLAlchemy(app)
jwt = JWTManager(app)

jwt_token = app.config['TOKEN_KEY'] = "3cc8464f0b2eef61bf0872ebf640505db394175ed8d314ab9f2d9e6eb27552ce"
# Flask_Login login manager
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

app.config.from_object(__name__)
from app import views
