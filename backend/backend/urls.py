"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# URLs can link to python functions that perform some logic (e.g. check for login) then dynamically display webpage

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


# If a user goes to arg1 page, run the arg2 func - e.g. views.welcome (welcome() func in views.py)
urlpatterns = [
    path('', include('benshop.urls')),
    path('admin/', admin.site.urls),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# give users the ability to log in and log out

# admin page is a default page that can be used to manage users
# can create a superUser and designate a username and password from shell (simple passwords could cause errors)
# password is encrypted and stored automatically by django

