from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.views.generic import CreateView
from django.contrib.auth import login, logout
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.views import LoginView
from django.contrib.auth.decorators import login_required
from .models import *
from .forms import *
from rest_framework import viewsets, generics
from .serializers import *
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny


# Create your views here.

# This is where we implement functions that display content for users
# Run funcs from urls.py file

# Can create a function that creates a render request for a particular HTML page
# The static HTML page could be stored in a templates

# can use {% code %} to write django code - {% endfor %} {% endblock %} to end loop/block of code
# use double curly brackets {{code}} to use variables in HTML

# can use the @login_required decorator to require user login

def index(request):
    # load all products
    products = Product.objects.all()
    return render(request, 'index.html', {'products': products}) # dict containing list of products


def product_individual(request, prodid):
    products = Product.objects.get(id=prodid)
    return render(request, 'individual_products.html', {'products': products})


class UserSignupView(CreateView):
    model = APIUser
    form_class = UserSignupForm
    template_name = 'user_signup.html'

    def get_context_data(self, **kwargs):
        return super().get_context_data(**kwargs)

    def form_valid(self, form):
        user = form.save()
        login(self.request, user)
        return redirect("/") # had to import redirects from django.shortcuts


class UserLoginForm(AuthenticationForm):
    def __init__(self, *args, **kwargs):
        super(UserLoginForm, self).__init__(*args, **kwargs)

    username = forms.CharField(widget=forms.TextInput(attrs={'placeholder':'Your username'}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={'placeholder':'Your password'}))


# Login class view links to form HTML template
class UserLoginView(LoginView):
    template_name='login.html'


 # Logout function doesn't need a template
def logout_user(request):
    logout(request)
    return redirect("/")


@login_required
def add_to_basket(request, prodid):
    user = request.user
    # is there a shopping basket for the user 

    basket = Basket.objects.filter(user_id=user, is_active=True).first()
    if basket is None:
        # create a new one
        Basket.objects.create(user_id = user)
        basket = Basket.objects.filter(user_id=user, is_active=True).first()

    # get the product 
    products = Product.objects.get(id=prodid)
    sbi = BasketItems.objects.filter(basket_id=basket, product_id = products).first()

    if sbi is None:
        # there is no basket item for that product 
        # create one 
        sbi = BasketItems(basket_id=basket, product_id = products)
        sbi.save()
    else:
        # a basket item already exists 
        # just add 1 to the quantity
        sbi.quantity = sbi.quantity+1
        sbi.save()
        
    return render(request, 'individual_products.html', {'products': products, 'added':True})


#Creating method for displaying shopping basket
# get the user basket
# does the basket exist - basket could be empty but exist too
# Basket could become empty once we implement removing basket items
# load basket items
# display on page
@login_required
def show_basket(request):
    user = request.user
    basket = Basket.objects.filter(user_id=user, is_active=True).first()

    if basket is None:
        #Show basket empty
        return render(request, 'basket.html', {'empty':True})
    else:
        sbi = BasketItems.objects.filter(basket_id=basket)
        # is this list empty ? 
        if sbi.exists():
            # normal flow
            return render(request, 'basket.html', {'basket':basket, 'sbi':sbi})
        else:
            return render(request, 'basket.html', {'empty':True})


@login_required
def remove_item(request,sbi):
    basketitem = BasketItems.objects.get(id=sbi)
    if basketitem is None:
        return redirect("/basket") # if error redirect to shopping basket
    else:
        if basketitem.quantity > 1:
            basketitem.quantity = basketitem.quantity - 1
            basketitem.save() # save our changes to the db
        else:
            basketitem.delete() # delete the basket item

    return redirect("/basket")


@login_required
def order(request):
    # load in all data we need, user, basket, items
    user = request.user
    basket = Basket.objects.filter(user_id=user, is_active=True).first()
    if basket is None:
        return redirect("/")

    sbi = BasketItems.objects.filter(basket_id=basket)
    if not sbi.exists(): # if there are no items
        return redirect("/")

    # POST or GET
    if request.method == "POST":
        # check if valid
        form = OrderForm(request.POST)
        if form.is_valid():
            order = form.save(commit=False)
            order.user_id = user
            order.basket_id = basket
            total = 0.0
            for item in sbi:
                total += float(item.item_price()) # float cast needed as item.price is a django decimal type
            order.total_price = total
            order.save()
            basket.is_active = False
            basket.save()
            return render(request, 'ordercomplete.html', {'order':order, 'basket':basket, 'sbi':sbi})
        else:
            #GET request
            return render(request, 'orderform.html', {'form':form, 'basket':basket, 'sbi':sbi})
    else:
        # show the form
        form = OrderForm()
        return render(request, 'orderform.html', {'form':form, 'basket':basket, 'sbi':sbi})


@login_required
def previous_orders(request):
    user = request.user
    orders = Order.objects.filter(user_id=user)

    if not orders.exists():
        # Return "No outstanding orders" page
        return render(request, 'previous_orders.html', {'empty':True})
    
    # Normal flow
    return render(request, 'previous_orders.html', {'orders':orders})


# SERIALIZERS
class ProductViewSet(viewsets.ModelViewSet):
	queryset = Product.objects.all()
	serializer_class = ProductSerializer

class BasketViewSet(viewsets.ModelViewSet):
    serializer_class = BasketSerializer
    queryset = Basket.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user # get the current user
        if user.is_superuser:
            return Basket.objects.all() # return all the baskets if a superuser requests
        else:
            # For normal users, only return the current active basket
            shopping_basket = Basket.objects.filter(user_id=user, is_active=True)
            return shopping_basket

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user # get the current user
        if user.is_superuser:
            return Order.objects.all() # return all the baskets if a superuser requests
        else:
            # For normal users, only return the current active basket
            orders = Order.objects.filter(user_id=user)
            return orders

class APIUserViewSet(viewsets.ModelViewSet):
    queryset = APIUser.objects.all()
    serializer_class = APIUserSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

class UserRegistrationAPIView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny] #No login is needed to access this route
    queryset = queryset = APIUser.objects.all()

class AddBasketItemAPIView(generics.CreateAPIView):
    serializer_class = AddBasketItemSerializer
    permission_classes = [IsAuthenticated]
    queryset = BasketItems.objects.all()

class RemoveBasketItemAPIView(generics.CreateAPIView):
    serializer_class = RemoveBasketItemSerializer
    permission_classes = [IsAuthenticated]
    queryset = BasketItems.objects.all()

class CheckoutAPIView(generics.CreateAPIView):
    serializer_class = CheckoutSerializer
    permission_classes = [IsAuthenticated]
    queryset = Order.objects.all()

