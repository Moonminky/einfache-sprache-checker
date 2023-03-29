from flask import Flask
from flask import request
from flask_cors import CORS, cross_origin
from textanalysis import check_text
import unicodedata

api = Flask(__name__, static_folder='../build', static_url_path='')
api.config['SERVER_NAME'] = 'https://einfache-sprache-checker.up.railway.app'
CORS(api)

@api.errorhandler(404)
def not_found(e):
    return {"checks": [], "text": "", "highlights": []}

@api.route('/checks',  methods=['GET', 'POST'])
@cross_origin()
def checks():
    if request.method == 'GET':
        response_body = {"checks": [], "text": "", "highlights": []}
    else:
        data = request.get_json()
        print('data:', data)
        text = unicodedata.normalize('NFC', data['text']['normalizedText'])
        level = data['text']['level']
        print('text in req', text)
        check_results = check_text(text, level)
        response_body = {
            "checks": check_results[0],
            "text": text,
            "highlights": check_results[1]
        }
    print("RESPONSE BODY:", response_body)
    return response_body

@api.route('/')
@cross_origin()
def serve():
    return send_from_directory(api.static_folder, 'index-html')
