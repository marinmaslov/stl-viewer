import os
from flask import Flask, request, render_template, url_for, redirect, flash, session
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = 'static/models'
ALLOWED_EXTENSIONS = set(['stl'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        if 'file' not in request.files:
            flash('No file part')
        file = request.files['file']
        if file.filename == '':
            flash('No selected file')
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            fileList = open('static/models/list.txt', 'r')
            fileListLines = fileList.readlines()
            if filename+'\n' not in fileListLines:
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                fileList.close()
                with open('static/models/list.txt', 'a') as file:
                    file.write(filename + '\n')
            return redirect(url_for('viewer', data = filename)) 
    return render_template('index.html', name="Home Page")

@app.route('/viewer')
def viewer():
    data = request.args.get('data')
    if data is None:
        return "No file name was recieved!"
    return render_template('viewer.html', data = data) 

@app.route('/models')
def models():
    fileList = open('static/models/list.txt', 'r')
    fileListLines = fileList.readlines()
    fileListLines.reverse()
    fileList.close()
    return render_template('models.html', files = fileListLines,  name="Models Page") 

@app.route('/about')
def about():
    return render_template('about.html') 

if __name__ == "__main__":
    app.secret_key = 'kxBA12k568fy'
    app.run(debug=True)