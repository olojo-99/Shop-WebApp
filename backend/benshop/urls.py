from django.urls import path
from . import views
from .forms import *

# link the django project urls to the app's urls

# want to be able to link to different products
# could use GET request to build URLs, but could be less secure since data is viewable and editable in URL
# POST request - Uses encrypted JSON data struct that is part of URL (more secure)

urlpatterns = [
   path('', views.index, name="index"),
   path('products/<int:prodid>', views.product_individual, name="individual_product"),
   path('', views.index, name="homepage"),
   path('register/', views.UserSignupView.as_view(), name="register"),
   path('login/',views.LoginView.as_view(template_name="login.html", authentication_form=views.UserLoginForm)), #form under views
   path('logout/', views.logout_user, name="logout"),
   path('addbasket/<int:prodid>', views.add_to_basket, name="add_basket"),
]
