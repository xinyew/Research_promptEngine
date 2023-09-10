from django.shortcuts import render
from django.http import HttpResponse, HttpRequest
from django.core.files.base import ContentFile
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, Http404
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt


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

@csrf_exempt
def save(request):
    import platform
    if platform.platform().startswith('Linux-5.15.0-'):
        p = '/home/ubuntu/Research_promptEngine/log'
    else:
        p = os.path.join(os.getcwd(), 'log')    
    print(request.POST)
    with open(p, 'a+') as f:
        f.write(request.POST["id"])
        f.write('|')
        f.write(request.POST["date"])
        f.write('|')
        f.write(request.POST["timestamps"])
        f.write('|')
        f.write(request.POST["prompts"])
        f.write('|')
        f.write(request.POST["clicks"])
        f.write('|')
        f.write(request.POST["images"])
        f.write('|')
        f.write('\n')

@csrf_exempt
def generate_DallE(request):
    import openai
    import openai.error
    import platform

    if platform.platform().startswith('Linux-5.15.0-'):
        p = '/home/ubuntu/Research_promptEngine/secret_openai'
    else:
        p = os.path.join(os.getcwd(), 'secret_openai')
    secret = ''
    with open(p, 'r') as f:
        secret += f.read()[:-1]

    openai.api_key = secret

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
    ids = []
    for image_url in image_urls:
        try:
            image_response = requests.get(image_url, timeout=10)
        except requests.exceptions.Timeout:
            pass
        else:
            img = UploadedImage(
                prompt=request.POST["prompt"],
            )
            img_num = len(UploadedImage.objects.all())
            img.file.save(
                # name=urlparse(image_url).path.rsplit('/', 1)[-1],
                name=str(img_num + 1) + '.png',                
                content=ContentFile(image_response.content),
            )  # also saves img
            group.append(img)
            ids.append(img.id)
    return get_list_json_dumps_serializer(ids)


def get_list_json_dumps_serializer(group):
    # To make quiz11 easier, we permit reading the list without logging in. :-)
    # if not request.user.id:
    #     return _my_json_error_response("You must be logged in to do this operation", status=403)

    response_data = []
    for item in group:
        my_item = {
            'id': item
        }
        response_data.append(my_item)

    response_json = json.dumps(response_data)

    return HttpResponse(response_json, content_type='application/json')


def get_photo(request, id):
    item = get_object_or_404(UploadedImage, id=id)
    if not item.file:
        raise Http404

    return HttpResponse(item.file, content_type=item.content_type)
