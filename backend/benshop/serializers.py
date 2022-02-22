from rest_framework import serializers
from .models import *

class APIUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = APIUser
        fields = ['id','email','username'] #fields taken from labsheet

class ProductSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'product_image', 'tag']

class BasketItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = BasketItems
        fields = ['id', 'basket_id', 'product_id', 'quantity', 'date_time', 'item_price']

class BasketSerializer(serializers.ModelSerializer):
    items = BasketItemsSerializer(many=True, read_only=True, source='basketitems_set')
    class Meta:
        model = Basket
        fields = ['id', 'user_id', 'is_active', 'date_time']

class OrderSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'date_ordered', 'basket_id', 'user_id', 'total_price', 'shipping_addr']

