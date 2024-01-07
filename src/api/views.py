from django.shortcuts import render
from rest_framework.views import APIView,Response
from rest_framework.permissions import AllowAny

from .models import PreImage, PostImage

from api import serializers


class Image (APIView):
    permission_classes = [AllowAny]
    image_serializer = serializers.ImageSerializer

    def post(self,request):
        try:
            image_data = self.image_serializer(data=request.data)
            image_data.is_valid(raise_exception=True)
            data = image_data.validated_data

            pre_instance = PreImage.objects.create(
                saved_location=data.get('pre_image')
            )
            pre_instance.save()

            post_instance = PostImage.objects.create(
                pre_image = pre_instance,
                saved_location = data.get('post_image')
            )
            post_instance.save()

            return Response({"success":True})
        except Exception as e:
            return Response ({"success":False,"message":str(e)})