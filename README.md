# cats-vs-dogs
This is a small web app to demostrate a basic TensorFlow AI that can determine whether an image is of a dog, or of a cat.

There are two docker containers, one for the backend, which uses Python's Flask library to run a very light web server. 
The backend recieves the image and processes it into a format that the AI can understand, before returning the results.

The frontend container runs a React page that provides a very simple UI for uploading and processing the images.

To start the application, simply run `docker compose up` in the root directory.

[Video Demo](https://youtu.be/6dpbZBF1RHU)

![Dog Example](https://github.com/MattFrench019/Helpdesk-Py/blob/master/img/dog_example.png)
![Cat Example](https://github.com/MattFrench019/Helpdesk-Py/blob/master/img/cat_example.png)