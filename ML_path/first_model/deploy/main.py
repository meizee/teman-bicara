import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

import pandas as pd
import pickle
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

from flask import Flask, request, jsonify, render_template, redirect, url_for

EMBEDDING_DIM = 50
MAXLEN = 16
TRUNCATING = 'post'
PADDING = 'post'
MAX_EXAMPLES = 266

# read dataset and prepare the question and answer
df = pd.read_csv('data_ver2.csv')
sentences = df['pertanyaan']

pertanyaan = [df[df['label']==i]['pertanyaan'].to_list() for i in range(16)]
jawaban = [df[df['label']==i]['jawaban'].to_list() for i in range(16)]

# load classification model, embedding model, and the tokenizer that we trained before
model = tf.keras.models.load_model('classification_v2.h5')
em_model = SentenceTransformer('sentencetokens')
with open('tokenizer2.pkl', 'rb') as handle:
    tokenizer_pkl = pickle.load(handle)

# function to do pad_trunc_sequences
def seq_pad_and_trunc(sentences, tokenizer, padding, truncating, maxlen):
    sequences = tokenizer.texts_to_sequences(sentences)
    pad_trunc_sequences = pad_sequences(sequences, maxlen=maxlen, padding=padding, truncating=truncating)
    return pad_trunc_sequences

# function to inference the input text (to get answer of the input text)
def inference(input_text):
    tes_pad_trunc_seq = seq_pad_and_trunc([input_text], tokenizer_pkl, PADDING, TRUNCATING, MAXLEN)
    probs = model.predict(tes_pad_trunc_seq)
    pred_label = np.argmax(probs[0])
    # print(pred_label)
    
    # open embedding
    with open(r"ver2\pertanyaan_embeddings_" + str(pred_label) + ".pkl", "rb") as f:
      e = pickle.load(f) 
    
    pertanyaan_embedding = e['embeddings']
    input_embedding = em_model.encode(input_text)

    cosine = cosine_similarity([input_embedding], pertanyaan_embedding)
    index_pertanyaan = np.argmax(cosine)
    # print(index_pertanyaan)
    respond = jawaban[pred_label][index_pertanyaan]

    return respond


app = Flask(__name__)

@app.route("/index", methods=["POST", "GET"])
def index():
    
    if request.method == "POST":
        text = request.form['text']
        if text is None:
            return jsonify({"error": "no input text"})

        respond = inference(text)
        data = {"answer": respond}
        return respond

    # return "OK"
    return render_template('index.html')


if __name__ == "__main__":
    app.run(debug=True)