import tensorflow as tf
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras.applications.resnet import preprocess_input
import uvicorn
import numpy as np
from PIL import Image
import io

app = FastAPI()

# Enable CORS so your React app (port 3000) can talk to this API (port 8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 1. Loadin  ResNet-18 Model

try:
    model = tf.keras.models.load_model(
        "clarity_resnet18.keras", 
        custom_objects={'preprocess_input': preprocess_input}
    )
    print("--- AI Model Loaded Successfully ---")
except Exception as e:
    print(f"--- Model Load Error: {e} ---")

# Defining  6 Classes of the dataset
class_names = ['Acne', 'Eczema', 'Melanoma', 'Psoriasis', 'Ringworm', 'Vitiligo']

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        # 3. Image Preprocessing
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert('RGB')
        image = image.resize((224, 224))
        
        # Convert image to array and prepare for ResNet
        img_array = tf.keras.preprocessing.image.img_to_array(image)
        img_array = np.expand_dims(img_array, axis=0)
        img_array = preprocess_input(img_array)

        # 4. Model Inference
        predictions = model.predict(img_array)
        
        # Use Softmax to get probabilities if the model output is raw logits
        score = tf.nn.softmax(predictions[0])
        
        # 5. Extract Results
        predicted_class = class_names[np.argmax(score)]
        confidence_value = float(np.max(score))

        # Return stateless JSON response (no image stored)
        return {
            "prediction": predicted_class,
            "confidence": round(confidence_value * 100, 2),
            "status": "success"
        }

    except Exception as e:
        return {"error": str(e), "status": "failed"}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)