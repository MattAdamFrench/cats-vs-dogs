import flask
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from PIL import Image
import tensorflow as tf
import tensorflow.keras as keras

app = Flask(__name__)
cors = CORS(app, resources={r'/*': {"origins": '*'}})

model = keras.models.load_model('model')
model.summary()


@app.route("/")
@cross_origin(origin="*")
def root():
    return "Backend is running"


@app.route("/submit", methods=["POST"])
@cross_origin(origin="*")
def submit():
    file = request.files["image"]

    img: Image.Image = Image.open(file.stream)
    img = img.resize((180, 180))
    img_array = keras.preprocessing.image.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0)  # Create batch axis

    predictions = model.predict(img_array)
    score = float(predictions[0][0])

    print(
        "This image is %.2f percent cat and %.2f percent dog."
        % (100 * (1 - score), 100 * score)
    )

    return flask.make_response({'dog': score, 'cat': 1 - score})


if __name__ == '__main__':
    app.run(host='0.0.0.0')
