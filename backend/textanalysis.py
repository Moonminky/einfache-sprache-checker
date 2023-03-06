# This file contains all text analysis functions to analyze the text input.
# coding: utf-8
import re
import spacy
from spacy.morphology import Morphology

import goethe_levels as levels

nlp = spacy.load('de_core_news_sm')

highlight_words = []

#  Check für Verneinung mit "nicht"
def negation_analysis(input_text):
    """This method takes in an input text and scans it for occurrences of the word 'nicht'.
    If found, it adds the indices of the word to the highlight_words list, otherwise it returns false"""
    if "nicht" in input_text:
        print("negation_analysis: ", [m.start()
              for m in re.finditer('nicht', input_text)])
        highlight_words.extend([m.start() for m in re.finditer('nicht', input_text)])
        print("highlight words: ",highlight_words)
        return "fail"
    else:
        return "pass"


# Check für komplizierte Satzzeichen
def punctuation_analysis(input_doc):
    """This method takes in a spacy.doc and checks it for 'complicated' punctuations,
    meaning anything but full stop, comma, question mark and colon.
    If complicated punctuation is found, it is added to the token_list, which the method returns 
    (later, for now just pass or fail).
    """
    # TODO: possibly replace with regex-check on string directly, as spacy doesn't seem to recognize stuff like "wo-" as punct
    easy_punct = ['.', ',', '?', ':']
    # for each PUNCT in input, check if it's an easy PUNCT
    # if it's not, return index
    token_list = []
    #TODO: Get token index and highlight
    for token in input_doc:
        if token.pos_ == "PUNCT" and token.text not in easy_punct:
            print(token)
            token_list.append(token)
    print("token_list:", token_list)
    if len(token_list) > 0:
        return "fail"
    else: 
        return "pass"


# Check for numbers written as words
def numbers_analysis(input_doc):
    """Takes in a spacy.doc and checks for any numericals.
    If it finds them and they are written as word, it adds them to the num_list, which the method returns."""
    num_list = []
    for token in input_doc:
        if token.pos_ == "NUM" and token.shape_[0] != 'd':
            num_list.append(token)
    print("num_list: ", num_list)
    if len(num_list) > 0:
        return "fail"
    else: 
        return "pass"


# Check für Satzlänge
def sentence_length_analysis(input_doc):
    """Takes in a spacy.doc and checks for sentences longer as 12 words.
    Returns a list of tuples with sentence_start_index and sentence_end_index
    (later, for now just pass or fail)"""
    sent_indices = []
    for sent in input_doc.sents:
        length = len([token.text for token in sent if not token.is_punct])
        if length > 12:
            print("too long! ", (sent, sent.start, sent.end))
            sent_indices.append((sent.start, sent.end))
    # return sent_indices
    if len(sent_indices) > 0:
        return "fail"
    else: 
        return "pass"

    

# Check für Goethe-Sprachlevel
def language_level_analysis(input_doc, level):
    """Takes in a spacy.doc and a language level string, ie 'B1', 'B2' to find any words that are not appropriate
    for the specified language level. Returns a list of indices for the found words.
    (later, for now just pass or fail)"""
    if level == 'a1':
        level_words = levels.a1
    elif level == 'a2':
        level_words = levels.a2
    elif Level == 'b1':
        level_words = levels.b1
    word_list = [
        token.text for token in input_doc if not token.is_punct and not token.is_stop and token.text not in level_words]
    print(level, "level word_list:", word_list)
    # return word_list
    if len(word_list) > 0:
        return "fail"
    else:
        return "pass"


# Check für Konjunktiv
def subjunctive_analysis(input_doc):
    """Takes in a spacy.doc and checks for any words with subjunctive mood. Returns a list of found words.
    (later, for now just pass or fail)"""
    word_list = [
        token.text for token in input_doc if "Mood=Sub" in token.morph]
    print("sub_list: ", word_list)
    if len(word_list) > 0:
        return "fail"
    else: 
        return "pass"


# Check für Passivsätze, not implemented
def passive_analysis(input_doc):
    """Takes in a spacy.doc and checks for any words with subjunctive mood. Returns a list of """
    #passive_rule = [{'DEP': 'nsubjpass'}, {'DEP': 'aux', 'OP': '*'}, {'DEP': 'auxpass'}, {'TAG': 'VBN'}]
    #matcher.add('Passive', None, passive_rule)
   # matches = matcher(doc)
    sent_indices = []
    for sent in input_doc.sents:
        print("ents:", sent.ents)
        # extract morphological info for subject
        subject = [token.morph for token in sent if token.dep_ == "sb"]
        subject_num_pers = (subject[0].get("Number"), subject[0].get("Person"))
        print("subject_num_pers: ", subject_num_pers)
        # extract morphological info for possible auxiliary verb
        verb = [token.morph for token in sent if token.pos_ == "AUX"]
        verb_num_pers = (verb[0].get("Number"), verb[0].get("Person"))
        print("verb_num_pers: ", verb_num_pers)
        # when there is an auxiliary verb and it has a different person than subject, it should be passive
        # token.dep_ = auxiliary für verb, sb
        #length = len([token.text for token in sent if not token.is_punct])
        # if length > 12:
        #    print("Passive!", (sent, sent.start, sent.end))
        #   sent_indices.append((sent.start, sent.end))
    # return sent_indices

def check_text(text_input):
    """Run all checks & return checks list"""
    doc = nlp(text_input.replace("\n",""))
    print("doc text: ", doc.text)
    highlight_words = []
    # for token in doc:
    #     #print(token.text, spacy.explain(token.dep_), token.pos_, spacy.explain(token.tag_), token.lemma_, token.morph)
    #     print(token.text, spacy.explain(token.dep_))
    checks = [
                {'name': 'Goethe-Level',
                'result': language_level_analysis(doc, 'a1')
                },
                {
                    'name': 'Verneinung',
                    'result': negation_analysis(text_input)
                },
                {
                    'name': 'Satzzeichen',
                    'result': punctuation_analysis(doc)
                },
                {
                    'name': 'Zahlen',
                    'result': numbers_analysis(doc)
                },
                {
                    'name': 'Satzlänge',
                    'result': sentence_length_analysis(doc)
                },
                {
                    'name': 'Konjunktiv',
                    'result': subjunctive_analysis(doc)
                },
                # {
                #     'name': 'Passiv',
                #     'result': passive_analysis(doc)
                # }
                ]
    return checks
