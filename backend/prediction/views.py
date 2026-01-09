from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .utils import preprocess_image
from .ml.labels import CLASS_NAMES
from django.core.files.storage import default_storage
import os

import tensorflow as tf
import numpy as np

@api_view(['GET'])
def test_api(request):
    return Response({
        "status": "Backend is running successfully",
        "message": "Brain Tumour Detection API ready"
    })


MODEL_PATH = os.path.join(settings.BASE_DIR, "prediction", "ml", "model.h5")

model = tf.keras.models.load_model(MODEL_PATH)


@api_view(['POST'])
def predict_tumour(request):
    if 'image' not in request.FILES:
        return Response(
            {"error": "No image provided"},
            status=status.HTTP_400_BAD_REQUEST
        )

    image_file = request.FILES['image']

    file_path = default_storage.save(
        f"uploads/{image_file.name}",
        image_file
    )

    full_path = os.path.join(settings.MEDIA_ROOT, file_path)

    img = preprocess_image(full_path)

    predictions = model.predict(img)
    confidence = float(np.max(predictions))
    class_index = int(np.argmax(predictions))
    tumour_type = CLASS_NAMES[class_index]

    response = {
        "tumour_detected": tumour_type != "notumour",
        "tumour_type": tumour_type,
        "confidence": round(confidence * 100, 2)
    }

    return Response(response, status=status.HTTP_200_OK)
