from rest_framework import serializers

class ImageSerializer (serializers.Serializer):
    pre_image = serializers.ImageField(required=True)
    post_image = serializers.ImageField(required=True)

