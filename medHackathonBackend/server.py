import os
import numpy as np
import tensorflow as tf
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = 'static/uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def roundoff(arr):
    """To round off according to the argmax of each predicted label array. """
    arr[np.argwhere(arr != arr.max())] = 0
    arr[np.argwhere(arr == arr.max())] = 1
    return arr


@app.route('/classify_image', methods=['POST'])
def classify_image():
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


if __name__ == "__main__":
    app.run()
