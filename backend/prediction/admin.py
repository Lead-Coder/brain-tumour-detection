from django.contrib import admin
from .models import PredictionModel

@admin.register(PredictionModel)
class PredictionLogAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "tumour_type",
        "tumour_detected",
        "confidence",
        "created_at",
    )
    list_filter = ("tumour_detected", "tumour_type", "created_at")
    readonly_fields = ("created_at",)

