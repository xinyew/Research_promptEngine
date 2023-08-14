from django.db import models


class UploadedImage(models.Model):
    file = models.FileField(blank=True, null=True)
    prompt = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)
    content_type = models.CharField(max_length=50, default='image/png')

    class Meta:
        ordering = ('-date_created',)
