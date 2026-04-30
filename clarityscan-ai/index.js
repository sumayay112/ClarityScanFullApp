const { onRequest } = require("firebase-functions/v2/https");
const tf = require("@tensorflow/tfjs-node");
const path = require("path");
const cors = require("cors")({ origin: true });
const Busboy = require("busboy");

let model;

exports.predictSkin = onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send("Please send a POST request with an image.");
    }

    const busboy = Busboy({ headers: req.headers });
    let imageBuffer = null;

    busboy.on("file", (fieldname, file) => {
      const chunks = [];
      file.on("data", (data) => chunks.push(data));
      file.on("end", () => {
        imageBuffer = Buffer.concat(chunks);
      });
    });

    busboy.on("finish", async () => {
      try {
        // Load model if not in memory
        if (!model) {
          const modelPath = `file://${path.join(__dirname, "model", "model.json")}`;
          // Use loadGraphModel for most converted ResNet50 models
          model = await tf.loadGraphModel(modelPath);
        }

        // Convert image to a 4D Tensor (224x224 pixels)
        const tensor = tf.node.decodeImage(imageBuffer, 3)
          .resizeBilinear([224, 224])
          .toFloat()
          .div(tf.scalar(255.0))
          .expandDims();

        // Get AI prediction
        const predictions = await model.predict(tensor).data();
        
        const classes = [
          'Acanthosis Nigricans', 
          'Acne', 
          'Allergic Contact Dermatitis', 
          'Eczema', 
          'Psoriasis', 
          'Vitiligo'
        ];

        const topIndex = predictions.indexOf(Math.max(...predictions));

        res.json({
          label: classes[topIndex],
          confidence: (predictions[topIndex] * 100).toFixed(1)
        });

        tensor.dispose(); // Clean up memory
      } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ error: error.message });
      }
    });

    busboy.end(req.rawBody);
  });
});