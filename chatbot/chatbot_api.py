# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from chatbot import get_response

app = Flask(__name__)
CORS(app)  # Allow requests from Angular frontend

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    message = data.get('message')
    response = get_response(message)
    return jsonify({'response': response})

if __name__ == '__main__':
    # Station Service chatbot - Port 5001 (Shipnology utilise 5000)
    app.run(debug=True, port=5001)
