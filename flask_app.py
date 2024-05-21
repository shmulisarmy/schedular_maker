from flask import Flask, render_template, request

app = Flask(__name__, static_folder='static')

@app.route('/')
def home():
    return render_template('main_page.html')




if __name__ == '__main__':
    app.run(debug=True)
