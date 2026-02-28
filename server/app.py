from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
from dotenv import load_dotenv
from google import genai
# from api.routes import api

load_dotenv()

app = Flask(__name__)
CORS(app)
client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

@app.route('/red-alert')
def home():
    return "Hello, Flask!"

@app.route('/api/evaluate', methods=['POST'])
def evaluate():
    data = request.json
    answers = data.get('answers')

    # Construct the prompt for Gemini
    formatted_answers = "\n".join([f"{i+1}. {ans}" for i, ans in enumerate(answers)])
    prompt = f"Convert these PCL-5 answers to integers (0-4). Return the result in JSON format only, as a list of integers representing the scores in order {formatted_answers}"

    try:
        response = client.models.generate_content(
            model='gemini-3-flash-preview',
            contents=prompt,
            config={'response_mime_type': 'application/json'}
        )

        scores = json.loads(response.text)
        return jsonify({"scores": scores, "total": sum(scores)})
    except Exception as e:
        print(f"error {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=os.environ.get("PORT"), debug=True)

