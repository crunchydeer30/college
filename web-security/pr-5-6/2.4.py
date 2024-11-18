from flask import Flask, request, abort
from werkzeug.security import check_password_hash, generate_password_hash
import jwt

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret-key'

users = {'admin': generate_password_hash('adminpass')}

# JWT Authentication
def authenticate(username, password):
    if username in users and check_password_hash(users[username], password):
        payload = {'username': username}
        return jwt.encode(payload, app.config['SECRET_KEY'], algorithm='HS256')
    return None

@app.route('/secure-data')
def secure_data():
    auth = request.authorization
    if auth:
        token = authenticate(auth.username, auth.password)
        if token:
            try:
                payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
                if payload['username'] == 'admin':
                    return 'Secure Data'
            except jwt.ExpiredSignatureError:
                abort(401)  # токен истек
            except jwt.InvalidTokenError:
                abort(401)  # токен невалиден
    abort(401)