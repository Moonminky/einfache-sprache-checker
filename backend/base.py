from flask import Flask
from flask import request
from flask_cors import CORS
from textanalysis import check_text

api = Flask(__name__)
CORS(api)

@api.route('/checks',  methods=['GET','POST'])
def checks():
    if request.method == 'GET':
        response_body = {"checks": []}
    else:
        data = request.get_json()
        print(data)
        text = data.get('text', '')
        print(text)
        response_body = {
            "checks": check_text(text)
    }
    return response_body
