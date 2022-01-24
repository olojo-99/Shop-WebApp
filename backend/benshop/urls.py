from django.urls import path
from . import views

# link the django project urls to the app's urls

urlpatterns = [
   path('', views.index, name="index")
]