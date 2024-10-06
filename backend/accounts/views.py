from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import CustomUser
from .serializers import UserSerializer
from django.shortcuts import get_object_or_404

# User Registration View
class RegisterUserView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

# User Login View
class LoginUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

# Protected Route View
class ProtectedRouteView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "This is a protected route."})

# User Details View
class UserDetailsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, username=None):
        # Retrieve user by username if provided, otherwise use request.user
        if username:
            user = get_object_or_404(CustomUser, username=username)
        else:
            user = request.user

        user_data = {
            'username': user.username,
            'email': user.email,
            'phone_number': user.phone_number,
            'address': user.address,
        }
        return Response(user_data)
