import requests
import json
import unittest

ENDPOINT = "http://127.0.0.1:5000/checks"
PAYLOAD = {"text": {
    "normalizedText": "Dieses ist nicht mein Testsatz! Stattdessen haben wir schon zwei Sätze, die direkt hintereinander stehen und dieser ist zu lang. Wie wäre es denn mit einem Konjunktiv?",
    "level": "b1", }
}
EXP_RESPONSE = {'checks': [{'name': 'Goethe-Level', 'result': 'fail'}, {'name': 'Verneinung', 'result': 'fail'}, {'name': 'Satzzeichen', 'result': 'fail'}, {'name': 'Zahlen', 'result': 'fail'}, {'name': 'Satzlänge', 'result': 'fail'}, {'name': 'Konjunktiv', 'result': 'fail'}], 'highlights': [{'index-based': {'neg_highlights': [[11, 16]], 'passive_highlights': [], 'sentence_len_highlights': [
    [32, 128]]}}, {'character-based': {'goethe_highlights': ['Testsatz', 'Stattdessen', 'hintereinander', 'Konjunktiv'], 'num_highlights': ['zwei'], 'punctuation_highlights': ['!'], 'subjunctive_highlights': ['wäre']}}], 'text': 'Dieses ist nicht mein Testsatz! Stattdessen haben wir schon zwei Sätze, die direkt hintereinander stehen und dieser ist zu lang. Wie wäre es denn mit einem Konjunktiv?'}


def compare_lists(list1, list2):
    if isinstance(list1, list) and isinstance(list2, list):
        if len(list1) != len(list2):
            return False
        for element1 in list1:
            found_match = False
            for element2 in list2:
                if compare_lists(element1, element2):
                    found_match = True
                    break
            if not found_match:
                return False
        return True
    elif isinstance(list1, dict) and isinstance(list2, dict):
        if len(list1) != len(list2):
            return False
        for key1, value1 in list1.items():
            if key1 not in list2:
                return False
            if not compare_lists(value1, list2[key1]):
                return False
        return True
    else:
        return list1 == list2



def test_can_call_endpoint():
    response = requests.get(ENDPOINT)
    assert response.status_code == 200


def test_can_post_data():
    response = requests.post(ENDPOINT, json=PAYLOAD)
    assert response.status_code == 200


def test_get_proper_response():
    response = requests.post(ENDPOINT, json=PAYLOAD)
    data = response.json()
    assert data['checks'] == EXP_RESPONSE['checks']

    # response order of highlights can be random, so need to compare laboriously
    assert compare_lists(data['highlights'], EXP_RESPONSE['highlights'])

    assert data['text'] == EXP_RESPONSE['text']
