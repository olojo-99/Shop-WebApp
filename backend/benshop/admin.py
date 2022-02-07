from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(APIUser)
admin.site.register(Product)
admin.site.register(Basket)
admin.site.register(Order)
admin.site.register(BasketItems)

# Can register different models so that they can be managed through the admin interface