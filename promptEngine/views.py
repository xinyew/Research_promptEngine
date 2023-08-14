from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.


def promptView(request):
    if request.method == 'GET':
        context = {}
        return render(request, 'index/index.html')
