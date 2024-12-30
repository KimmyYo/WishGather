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

# Load your YOLO model here
# try:
#     logging.debug("Loading the YOLO model...")
#     model_path = os.path.abspath('../../../Model/best.pt')
#     if not os.path.exists(model_path):
#         raise FileNotFoundError(f"Model file is not in {model_path}")
#     # model = torch.hub.load('ultralytics/yolov8', 'custom', path='../../../Model/best.pt')
#     # model.eval()  # Set the model to evaluation mode

#     model = YOLO(model_path)
#     logging.debug("YOLO model loaded successfully.")
# except Exception as e:
#     logging.error(f"Failed to load model: {e}")
#     raise
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
        
        # Process results
        # detections = results.pandas().xyxy[0].to_json(orient='records')
        # detections = []
        # for result in results:
        #     boxes = result.boxes
        #     for box in boxes:
        #         detection = {
        #             'bbox': box.xyxy[0].tolist(),
        #             'confidence': float(box.conf[0]),
        #             'class': result.names[int(box.cls[0])]
        #         }
        #         detections.append(detection)
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
