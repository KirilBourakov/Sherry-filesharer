from django.contrib.auth import get_user_model, login, logout
from .serializers import UserRegisterSerializer, LoginSerializer, UserSerializer
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication

# Create your views here.
class UserRegister(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        # add validation
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(request.data)
            if user:
                login(request, user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)

class UserLogin(APIView):
    permission_classes = [permissions.AllowAny]
    authentication_classes = [SessionAuthentication]
    def post(self, request):
        # add validation
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check(request.data)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'error': 'Something went wrong. Please check your information and try again.'}, status=status.HTTP_401_UNAUTHORIZED)
        
class UserLogout(APIView):
    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)

class GetUser(APIView):
    permission_classes = [permissions.IsAuthenticated,]
    authentication_classes = [SessionAuthentication]
    def get(self, request):
        print(request.user)
        serializer = UserSerializer(request.user)
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)