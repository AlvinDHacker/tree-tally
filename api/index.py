from flask import Flask, request, render_template
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient
import os
from deepforest import main
from matplotlib import pyplot
import requests
from PIL import Image
import io
import time
import base64
# from flask_cors import CORS

app = Flask(__name__)
# cors = CORS(app, resources={r"/*": {"origins": "http://127.0.0.1:3000"}})

AZURE_STORAGE_CONNECTION_STRING = "DefaultEndpointsProtocol=https;AccountName=medistorage;AccountKey=Net9+5ih4zfqlhzXqIjPkcnCm9sPrLtUExJyA9J2OsLLhbiMP9BxHzDUjHFmvPFoIMt2hE5NYSpT+AStvZttgw==;EndpointSuffix=core.windows.net"
CONTAINER_NAME = "trees"


def analyze_image(image_path):
    url = image_path
    response = requests.get(url)
    img = Image.open(io.BytesIO(response.content))
    fname = f"canopy{str(time.time())}.jpeg"
    img.save(fname)
    # Create an instance of the deepforest model
    n = main.deepforest()

    n.use_release()

    # Predict bounding boxes for each detected tree crown in the image
    boxes = n.predict_image(path=fname)

    return {"count": len(boxes)}


@app.route("/api/upload", methods=["POST"])
def upload():
    if request.method == "POST":
        if "image" not in request.files:
            return "No image part"

        image = request.files["image"]

        if image.filename == "":
            return "No selected image"

        blob_service_client = BlobServiceClient.from_connection_string(
            AZURE_STORAGE_CONNECTION_STRING
        )
        container_client = blob_service_client.get_container_client(CONTAINER_NAME)

        blob_dir = os.path.basename(image.filename).split(".")
        blob_dir[0] = f"{blob_dir[0]}-{time.time()}"
        blob_name = ".".join(blob_dir)

        with image.stream as image_stream:
            container_client.upload_blob(name=blob_name, data=image_stream)

            fname = f"https://medistorage.blob.core.windows.net/trees/{blob_name}"

            data = analyze_image(fname)
            return data


if __name__ == "__main__":
    app.run(debug=True)
