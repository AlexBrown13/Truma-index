import os
from flask import Flask
from flask_cors import CORS
from routes.chat_pcl5 import chatbot_pcl5
from routes.chatbot_detection import identify_per
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

app.register_blueprint(chatbot_pcl5, url_prefix='/api')
app.register_blueprint(identify_per, url_prefix='/api')

if __name__ == "__main__":
    app.run(port=os.getenv('FLASK_PORT'), debug=True)