import {rest} from 'msw'

export const handlers = [
    rest.get('http://localhost:5000/checks', (req, res, ctx)=> {
        return res (
            ctx.status(200),
            ctx.json('{"checks": [], "text":"", "highlights": []}')
        )
    }),
    rest.post('http://localhost:5000/checks', (req, res, ctx)=> {
        return res (
            ctx.status(200),
            ctx.json('{"checks": [{"name": "Goethe-Level", "result": "fail"}, {"name": "Verneinung", "result": "pass"}, {"name": "Satzzeichen", "result": "pass"}, {"name": "Zahlen", "result": "pass"}, {"name": "Satzlänge", "result": "pass"}, {"name": "Konjunktiv", "result": "pass"}], "text": "test text", "highlights": [{"index-based": {"neg_highlights": [], "sentence_len_highlights": [], "passive_highlights": []}}, {"character-based": {"punctuation_highlights": [], "goethe_highlights": ["text", "test"], "num_highlights": [], "subjunctive_highlights": []}}]}' 
            )
        )
    }),
]