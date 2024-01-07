from django.db import models

# Create your models here.
class PreImage(models.Model):
    saved_location = models.ImageField(upload_to="pre_image/")

    def __str__(self):
        return "Pre Image"
    

class PostImage(models.Model):
    pre_image = models.OneToOneField(PreImage, on_delete=models.CASCADE, primary_key = True)
    saved_location= models.ImageField(upload_to="post_image/")

    def __str__(self):
        return "Post Image"