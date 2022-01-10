from django.db import models

# Create your models here.

# Using a custom user model when starting a project
from django.contrib.auth.models import AbstractUser

class APIUser(AbstractUser):
    pass