from flask import Flask
from flask import request
from flask_cors import CORS
from textanalysis import check_text
import unicodedata

api = Flask(__name__)
CORS(api)


@api.route('/checks',  methods=['GET', 'POST'])
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
