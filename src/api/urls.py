from django.urls import path
from api.views import Image

urlpatterns = [
    path('image/',Image.as_view(), name="imageupload")
]
