import cv2

# Load YOLOv3 pre-trained weights and configuration file
net = cv2.dnn.readNet('yolov3.weights', 'yolov3.cfg')

# Load COCO class names
with open('coco.names', 'r') as f:
    classes = f.read().strip().split('\n')

# Load the image
image = cv2.imread('tree_image.jpg')
height, width = image.shape[:2]

# Create a blob from the image and set input size for the network
blob = cv2.dnn.blobFromImage(image, 1/255.0, (416, 416), swapRB=True, crop=False)

# Set the input blob for the network
net.setInput(blob)

# Get layer names
layer_names = net.getUnconnectedOutLayersNames()

# Run forward pass
detections = net.forward(layer_names)

# Iterate through the detections and draw bounding boxes
for detection in detections:
    for obj in detection:
        scores = obj[5:]
        class_id = np.argmax(scores)
        confidence = scores[class_id]

        # Filter out weak detections and select only tree crowns (you may need to adjust thresholds)
        if confidence > 0.5 and classes[class_id] == 'tree':
            center_x, center_y, w, h = map(int, obj[0:4] * [width, height, width, height])
            x, y = center_x - w // 2, center_y - h // 2

            # Draw bounding box and label
            cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)
            cv2.putText(image, f'Tree: {confidence:.2f}', (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

# Show the result image
cv2.imshow('Tree Crowns', image)
cv2.waitKey(0)
cv2.destroyAllWindows()
