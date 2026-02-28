from flask import Flask, request, jsonify

# from api.routes import api

app = Flask(__name__)


@app.route('/red-alert')
def home():
    return "Hello, Flask!"

if __name__ == '__main__':
    app.run(debug=True)