from django.db import models


class UploadedImage(models.Model):
    file = models.FileField(null=True, upload_to='images/')
    prompt = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-date_created',)
