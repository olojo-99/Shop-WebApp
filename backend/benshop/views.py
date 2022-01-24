from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.

# This is where we implement functions that display content for users
# Run funcs from urls.py file

# Can create a function that creates a render request for a particular HTML page
# The static HTML page could be stored in a templates

# can use {% code %} to write django code - {% endfor %} {% endblock %} to end loop/block of code
# use double curly brackets {{code}} to use variables in HTML

def index(request):
    return render(request, 'index.html')