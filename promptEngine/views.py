from django.shortcuts import render
from django.http import HttpResponse, HttpRequest
from django.core.files.base import ContentFile


import requests
import os
import json
from urllib.parse import urlparse

from .models import UploadedImage


# Create your views here.


def promptView(request):
    if request.method == 'GET':
        context = {}
        return render(request, 'index/index.html')


def generate_DallE(request):
    import openai
    import openai.error

    try:
        response = openai.Image.create(
            prompt=request.POST["prompt"],
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
    group = []
    names = []
    for image_url in image_urls:
        try:
            image_response = requests.get(image_url, timeout=10)
        except requests.exceptions.Timeout:
            pass
        else:
            img = UploadedImage(
                prompt=request.POST["prompt"],
            )
            index = str(len(os.listdir('images/'))).zfill(5)
            img.file.save(
                # name=urlparse(image_url).path.rsplit('/', 1)[-1],
                name=index+'.png',
                content=ContentFile(image_response.content)
            )  # also saves img
            group.append(img)
            names.append(index+'.png')
    return get_list_json_dumps_serializer(names)


def get_list_json_dumps_serializer(group):
    # To make quiz11 easier, we permit reading the list without logging in. :-)
    # if not request.user.id:
    #     return _my_json_error_response("You must be logged in to do this operation", status=403)

    response_data = []
    for item in group:
        my_item = {
            'img_path': 'images/' + item
        }
        response_data.append(my_item)

    response_json = json.dumps(response_data)

    return HttpResponse(response_json, content_type='application/json')
