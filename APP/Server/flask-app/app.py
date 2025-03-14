from flask import Flask, request, jsonify
from PIL import Image
import torch
from torchvision import transforms
import io
import os
import logging
import json
from ultralytics import YOLOWorld
from matching import ResourceAllocation
from collections import defaultdict

app = Flask(__name__)

# Configure logging
logging.basicConfig(level=logging.DEBUG)

model_path = os.path.abspath('../../../Model/best.pt')
model = YOLOWorld(model_path)

@app.route('/proimg', methods=['POST'])
def detect():
    logging.debug("Received request at /proimg")
    
    if 'image_path' not in request.files:
        logging.error("No image file provided in request.")
        return jsonify({'error': 'No image file provided'}), 400

    image_file = request.files['image_path']
    logging.debug("Received image file.")

    try:
        image_bytes = image_file.read()
        img = Image.open(io.BytesIO(image_bytes))
        logging.debug("Image successfully opened.")
    except Exception as e:
        logging.error(f"Failed to process image: {e}")
        return jsonify({'error': 'Failed to process image'}), 400

    try:
        # Perform inference
        logging.debug("Performing inference...")
        results = model.predict(img, imgsz=800)
        logging.debug("Inference complete.")
        detections = []

        for result in results:
            boxes = result.boxes
            for box in boxes:
                detections.append({"name": result.names[int(box.cls[0])]})
        print(detections)
        logging.debug("Results processed.")
    except Exception as e:
        logging.error(f"Failed during inference: {e}")
        return jsonify({'error': 'Failed during inference'}), 500

    return jsonify({'detections': json.dumps(detections)})

@app.route('/matching', methods=['POST'])
def matching():
    data = request.json
    
    temple_data = data.get('temple_data')
    welfare_data = data.get('welfare_data')

    print(temple_data)
    if temple_data is None or welfare_data is None:
        return jsonify({'error': 'Invalid data'}), 400

    matching = ResourceAllocation(temple_data, welfare_data)
    optimal_allocation = matching.resource_allocation()

    response_data = {
        'status': 'success',
        'allocation': matching.json_result(optimal_allocation)
    }

    return jsonify(response_data), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
