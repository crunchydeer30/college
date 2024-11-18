from flask import Flask, request, abort
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired
from modsecurity import ModSecurity

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret_key_here'

modsecurity = ModSecurity()

class SecureForm(FlaskForm):
    data = StringField('Data', validators=[DataRequired()])
    submit = SubmitField('Submit')

@app.before_request
def limit_remote_addr():
    if request.remote_addr != '127.0.0.1':
        abort(403)

@app.before_request
def modsecurity_protection():
    modsecurity.process_request(request)

@app.route('/secure-data', methods=['GET', 'POST'])
def secure_data():
    form = SecureForm()
    if form.validate_on_submit():
        data = form.data.data
        if modsecurity.validate(data):
            return 'This is secure data'
        else:
            abort(403)
    return render_template('secure_data.html', form=form)