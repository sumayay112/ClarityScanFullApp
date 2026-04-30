import tensorflow as tf
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras.applications.resnet import preprocess_input
import uvicorn
import numpy as np
from PIL import Image
import io
import os

# Reduces unnecessary TensorFlow logging in your Render console
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

app = FastAPI()

# --- 1. Security: CORS Configuration ---
# This allows your React frontend to communicate with this Python API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 2. Load the AI Model ---
# We load it globally so it stays in memory for fast predictions
try:
    model = tf.keras.models.load_model(
        "clarity_resnet18.keras", 
        custom_objects={'preprocess_input': preprocess_input}
    )
    print("--- AI Model Loaded Successfully ---")
except Exception as e:
    print(f"--- Model Load Error: {e} ---")

# The specific classes your model was trained to recognize
class_names = ['AcanthosisNigricans', 'Acne', 'Allergic_Contact_Dermatitis', 'Psoriasis', 'Vitiligo',]

# --- 3. Health Check Route ---
# Render uses this to verify your server started correctly
@app.get("/")
def home():
    return {
        "status": "online", 
        "message": "ClarityScan AI Backend is running",
        "model": "ResNet-18"
    }

# --- 4. Prediction Route ---
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        # Read the uploaded image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert('RGB')
        
        # Resize image to 224x224 (Standard for ResNet)
        image = image.resize((224, 224))
        
        # Prepare image for the model
        img_array = tf.keras.preprocessing.image.img_to_array(image)
        img_array = np.expand_dims(img_array, axis=0)
        img_array = preprocess_input(img_array)

        # Run Inference
        predictions = model.predict(img_array)
        
        # Convert raw output to probabilities
        score = tf.nn.softmax(predictions[0])
        
        # Get the highest confidence result
        predicted_class = class_names[np.argmax(score)]
        confidence_value = float(np.max(score))

        return {
            "prediction": predicted_class,
            "confidence": round(confidence_value * 100, 2),
            "status": "success"
        }

    except Exception as e:
        return {"error": str(e), "status": "failed"}

# --- 5. Start the Server ---
if __name__ == "__main__":
    # Render requires host 0.0.0.0 and usually uses port 10000
    # This block allows you to run 'python main.py' locally as well
    port = int(os.environ.get("PORT", 10000))
    uvicorn.run(app, host="0.0.0.0", port=port)