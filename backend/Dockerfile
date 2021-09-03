FROM tensorflow/tensorflow:2.6.0

RUN pip install --upgrade pip

#RUN addgroup app && adduser -S -G app app
#USER app

WORKDIR /app
COPY  requirements.txt ./
RUN pip install -r requirements.txt
COPY . .

EXPOSE 5000

CMD ["python", "main.py"]