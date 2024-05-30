import firebase_admin
from firebase_admin import credentials, firestore
from firebase_admin.firestore import SERVER_TIMESTAMP
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# 初始化 Firebase Admin SDK
cred = credentials.Certificate("firebase_credentials.json")
firebase_admin.initialize_app(cred)

# 初始化 Firestore
db = firestore.client()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/celebrate')
def celebrate():
    return render_template('celebrate.html')

@app.route('/posts')
def posts():
    return render_template('posts.html')

@app.route('/add_message', methods=['POST'])
def add_message():
    try:
        data = request.json
        hint = data.get('hint')
        message = data.get('message')
        
        # 添加數據到 Firestore，使用服务器时间戳
        doc_ref = db.collection('messages').document()
        doc_ref.set({
            'hint': hint,
            'message': message,
            'timestamp': SERVER_TIMESTAMP
        })

        return jsonify({"success": True}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/get_messages', methods=['GET'])
def get_messages():
    try:
        messages_ref = db.collection('messages')
        messages = [doc.to_dict() for doc in messages_ref.stream()]

        return jsonify(messages), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
