from django.urls import path
from .views import RegisterUserView, LoginUserView, ProtectedRouteView,UserDetailsView

urlpatterns = [
    path('signup/', RegisterUserView.as_view(), name='signup'),
    path('login/', LoginUserView.as_view(), name='login'),
    path('protected/', ProtectedRouteView.as_view(), name='protected'),
    path('user-details/', UserDetailsView.as_view(), name='user-details'),
    path('user-details/<str:username>/', UserDetailsView.as_view(), name='user-details-username'),
]
