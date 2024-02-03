import os
import numpy as np
import tensorflow as tf
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import pathlib
import textwrap
import os
from flask_cors import CORS, cross_origin
import google.generativeai as genai

UPLOAD_FOLDER = 'static/uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

genai.configure(api_key='AIzaSyANmgwMZun3-dIqoXWTMo_p8nO5n5WQBbc')

gemini_model = genai.GenerativeModel('gemini-pro')


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def roundoff(arr):
    """To round off according to the argmax of each predicted label array. """
    arr[np.argwhere(arr != arr.max())] = 0
    arr[np.argwhere(arr == arr.max())] = 1
    return arr


@app.route('/classify_images', methods=['POST'])
def classify_image_whatsapp():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        imvar = tf.keras.preprocessing.image.load_img(filepath).resize((176, 176))
        imarr = tf.keras.preprocessing.image.img_to_array(imvar)
        imarr = np.array([imarr])
        model = tf.keras.models.load_model("model")
        impred = model.predict(imarr)

        for classpreds in impred:
            impred = roundoff(classpreds)

        classcount = 1
        for count in range(4):
            if impred[count] == 1.0:
                break
            else:
                classcount += 1

        classdict = {1: "Mild Dementia", 2: "Moderate Dementia", 3: "No Dementia, Patient is Safe",
                     4: "Very Mild Dementia"}
        result = classdict.get(classcount, "Unknown")

        return jsonify({'result': result}), 200
    else:
        return jsonify({'error': 'File type not allowed'}), 400


@app.route('/classify_image', methods=['POST'])
def classify_image_web():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        imvar = tf.keras.preprocessing.image.load_img(filepath).resize((176, 176))
        imarr = tf.keras.preprocessing.image.img_to_array(imvar)
        imarr = np.array([imarr])
        model = tf.keras.models.load_model("model")
        impred = model.predict(imarr)

        for classpreds in impred:
            impred = roundoff(classpreds)

        classcount = 1
        for count in range(4):
            if impred[count] == 1.0:
                break
            else:
                classcount += 1

        classdict = {1: "Mild Dementia", 2: "Moderate Dementia", 3: "No Dementia, Patient is Safe",
                     4: "Very Mild Dementia"}
        result = classdict.get(classcount, "Unknown")
        response = gemini_model.generate_content(f"Give a small simple description for the patient, the current status of the patient is {result} without a title only a small description")
        gem_response = response.text
        final_response = f'{result}'

        return jsonify({'result': final_response, 'desc': gem_response}), 200
    else:
        return jsonify({'error': 'File type not allowed'}), 400


if __name__ == "__main__":
    app.run()
