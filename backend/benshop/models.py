from django.db import models

# Create your models here.
# Use OOP to create models (database tables) and link them to databases
# Need to run a migration to sync databases and models when modifications are made

# Using a custom user model when starting a project
from django.contrib.auth.models import AbstractUser

class APIUser(AbstractUser):
    pass
    # Can create different attributes for the model

class Product(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200, null=False)
    description = models.CharField(max_length=200, null = False)
    price = models.DecimalField(max_digits=6, decimal_places=2, default=0.0)
    product_image = models.FileField(upload_to='products')
    tag = models.CharField(max_length=200, null=False)

class Basket(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(APIUser, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    date_time = models.DateTimeField(auto_now_add=True)
    # can extend model of an instance of a customer basket

class BasketItems(models.Model):
    id = models.AutoField(primary_key=True)
    basket_id = models.ForeignKey(Basket, on_delete=models.CASCADE)
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    date_time = models.DateTimeField(auto_now_add=True)

    def item_price(self):
	    return self.product_id.price * self.quantity # link to Product model by foreign key

class Order(models.Model):
    id = models.AutoField(primary_key=True)
    date_ordered = models.DateTimeField(auto_now_add=True)
    basket_id = models.ForeignKey(Basket, on_delete=models.CASCADE)
    user_id = models.ForeignKey(APIUser, on_delete=models.CASCADE)
    total_price = models.DecimalField(max_digits=6, decimal_places=2, default=0.0)
    shipping_addr = models.TextField(default="")
    # can add order and payment status, delivery status

