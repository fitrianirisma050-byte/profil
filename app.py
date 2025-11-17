from flask import Flask, send_from_directory, request, jsonify
import os

app = Flask(__name__, static_folder="static")

@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/send-message', methods=['POST'])
def send_message():
    data = request.json
    print("Form received:", data)  # Cetak ke console server
    return jsonify({"status": "success", "message": "Pesan berhasil dikirim!"})

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)

if __name__ == "__main__":
    app.run(debug=True)