from django.shortcuts import render
from django.http import HttpResponse
from .models import *
from django.shortcuts import redirect
from django.views.generic import CreateView
from django.contrib.auth import login, logout
from .forms import *
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.views import LoginView
from django.contrib.auth.decorators import login_required

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
    if not basket:
        # create a new one
        basket = Basket(user_id = user).save() # set userID
    # get the product
    products = Product.objects.get(id=prodid)
    sbi = BasketItems.objects.filter(basket_id=basket, product_id = products).first()
    if sbi is None:
        # there is no basket item for that product
        # create one
        sbi = BasketItems(basket_id=basket, product_id = products).save()
    else:
        # a basket item already exists 
        # just add 1 to the quantity
        sbi.quantity = sbi.quantity+1
        sbi.save()
    return render(request, 'individual_products.html', {'products': products, 'added':True})
