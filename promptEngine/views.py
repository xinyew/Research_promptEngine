from django.shortcuts import render
from django.http import HttpResponse, HttpRequest
from django.core.files.base import ContentFile


import requests
import os
from urllib.parse import urlparse

from .models import UploadedImage


# Create your views here.


def promptView(request):
    if request.method == 'GET':
        context = {}
        return render(request, 'index/index.html')

    print(request.POST)
    generate_DallE(request)


def generate_DallE(request):
    import openai
    import openai.error

    try:
        response = openai.Image.create(
            prompt=request.POST["prompt_input"],
            # n=int(request.POST["num_input"]),
            n=4,
            # size=request.POST["size_input"],
            size="512x512",
        )
    except openai.error.OpenAIError:
        raise RuntimeError

    return save_generated_images(
        request,
        [image_obj['url'] for image_obj in response['data']])


def save_generated_images(request: HttpRequest, image_urls):
    print('saving', image_urls)
    group = []
    for image_url in image_urls:
        try:
            image_response = requests.get(image_url, timeout=10)
        except requests.exceptions.Timeout:
            pass
        else:
            img = UploadedImage(
                prompt=request.POST["prompt_input"],
            )
            index = len(os.listdir('images/'))
            img.file.save(
                # name=urlparse(image_url).path.rsplit('/', 1)[-1],
                name=str(index)+'.png',
                content=ContentFile(image_response.content)
            )  # also saves img
            group.append(img)
    return reversed(group)
