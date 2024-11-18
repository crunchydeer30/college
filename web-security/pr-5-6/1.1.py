from flask import Flask, session, request
app = Flask(__name__)
app.secret_key = 'supersecretkey' # Использовать .env

@app.route('/login', methods=['POST'])
def login():
    user_id = request.form.get('user_id')
    if user_id is None or not user_id.isdigit(): # Валидация user_id
        return 'Invalid user ID', 400
    session['user_id'] = user_id
    return 'Logged in'