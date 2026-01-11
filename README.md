# 🧠 Brain Tumour Detection System

An AI-powered web application for detecting brain tumours from MRI images using deep learning.  
The system allows users to upload MRI scans, analyzes them using a trained CNN model, and provides predictions along with confidence scores, downloadable medical reports, and backend logging.


## 🚀 Features

- 🧠 **Brain Tumour Detection**
  - Detects whether a tumour is present or not
  - Classifies tumour type:
    - Glioma
    - Meningioma
    - Pituitary
    - No Tumour

- 📊 **Confidence Score**
  - Displays model confidence for each prediction

- 📄 **Medical PDF Report Generation**
  - Generates a well-formatted downloadable PDF report
  - Includes prediction result, tumour type, confidence, date, and disclaimer

- 🖼️ **MRI Image Upload**
  - Supports JPEG and PNG formats
  - Client-side file validation

- 🗂️ **Prediction Logging**
  - Automatically logs each prediction in the backend
  - Uses Django’s built-in SQLite database

- 🔐 **Clean API Design**
  - RESTful Django backend
  - No frontend-backend contract breaking



## 🛠️ Tech Stack

### Frontend
- Next.js (App Router / Client Components)
- TypeScript
- Tailwind CSS
- lucide-react (icons)
- jsPDF (PDF report generation)

### Backend
- Django
- SQLite (built-in database)
- TensorFlow / Keras
- MobileNetV2 (Transfer Learning)
- OpenCV
