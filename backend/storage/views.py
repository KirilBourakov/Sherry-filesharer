from django.shortcuts import render
from .serializers import DirectoryContentDirectorySerializer, DirectoryContentFileSerializer, UploadSerializer, CreateDirectorySerializer
from .models import File, Directory
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
from rest_framework import permissions, status, viewsets, parsers

# Create your views here.
class DirectoryAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        user = request.user
        requested_directory = request.GET.get('path', '/')

        if requested_directory == '/Shared_With_Me/':
            subdirectories = Directory.objects.filter(shared_with=user) 
        else:
            subdirectories = Directory.objects.filter(owner=user).filter(parent__name=requested_directory)
        directory_serializer = DirectoryContentDirectorySerializer(subdirectories, many=True)

        if requested_directory == '/Shared_With_Me/':
            files = File.objects.filter(shared_with=user)
        else:
            files = File.objects.filter(author=user).filter(directory__name=requested_directory)
        file_serializer = DirectoryContentFileSerializer(files, many=True)

        data = {
            'files': file_serializer.data,
            'directories': directory_serializer.data
        }
        return Response(data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = CreateDirectorySerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class DirectoryId(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        directory = Directory.objects.get(owner=request.user, name=request.GET.get('path', '/'))
        return Response({
            'id': directory.id
        }, status=status.HTTP_200_OK)

class UploadFile(APIView):
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [parsers.MultiPartParser]
    def post(self, request):
        print(request.data)
        serializer = UploadSerializer(data=request.data, context={'request': request})
        print(serializer)
        if serializer.is_valid():
            print('-----------------------------------')
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)