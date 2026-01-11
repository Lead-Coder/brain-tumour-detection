from django.db import models

class PredictionModel(models.Model):
    image = models.ImageField(upload_to="prediction_logs/")
    tumour_detected = models.BooleanField()
    tumour_type = models.CharField(max_length=50)
    confidence = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.tumour_type} | {self.confidence}% | {self.created_at}"