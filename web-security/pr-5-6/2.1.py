from flask import Flask, request, abort

app = Flask(__name__)

def check_access(role):
    if role == 'admin':
        return True
    elif role == 'user':
        return request.path == '/user'
    else:
        return False

@app.route('/admin')
def admin_panel():
    if not check_access('admin'):
        abort(403)
    return 'Welcome to the admin panel'

@app.route('/user')
def user_panel():
    if not check_access('user'):
        abort(403)
    return 'Welcome to the user panel'