from django.shortcuts import render, HttpResponse
from django.db.models import Q
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from .serializers import DirectoryContentDirectorySerializer, DirectoryContentFileSerializer, UploadSerializer, CreateDirectorySerializer, FileSerializer, FileInfoSerializer
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
    
    def delete(self, request):
        id = request.GET.get('id', None)
        if id is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        directory = get_object_or_404(Directory, pk=id, author=request.user)
        directory.delete()
        return Response(status=status.HTTP_200_OK)

class DirectoryId(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        directory = Directory.objects.get(owner=request.user, name=request.GET.get('path', '/'))
        return Response({
            'id': directory.id
        }, status=status.HTTP_200_OK)

class FileAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [parsers.MultiPartParser]

    def get(self, request, *args, **kwargs):
        return  Response(status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        print(request.data)
        serializer = UploadSerializer(data=request.data, context={'request': request})
        print(serializer)
        if serializer.is_valid():
            print('-----------------------------------')
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, *args, **kwargs):
        requested_file = request.GET.get('file', None)
        if requested_file is None:
            return Response({'error': 'no file requested'}, status=status.HTTP_400_BAD_REQUEST) 
        file = get_object_or_404(File, pk=requested_file, author=request.user)
        file.delete()
        return Response(status=status.HTTP_200_OK)
    
class FileInfoAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        requested_file = request.GET.get('file', None)
        if requested_file is None:
            return Response({'error': 'no file requested'}, status=status.HTTP_400_BAD_REQUEST) 
        
        try:
            file = File.objects.filter(Q(author=request.user) | Q(shared_with=request.user)).filter(id=requested_file)[0]
        except File.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = FileInfoSerializer(file, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, pk):
        if pk is None:
            return Response({'error': 'no file requested'}, status=status.HTTP_400_BAD_REQUEST) 
        instance = File.objects.get(pk=pk)
        serializer = FileInfoSerializer(instance, data=request.data, partial=True, context={'request': request})
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def post(self, request, pk):
        user = request.data.get('user')
        action = request.data.get('action')
        if not user or not action:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        if pk is None:
            return Response({'error': 'no file requested'}, status=status.HTTP_400_BAD_REQUEST) 
        file = get_object_or_404(File, pk=pk, author=request.user)

        if user[0] == '#':
            user = get_object_or_404(User, pk=user[1:])
        else:
            user = get_object_or_404(User, username=user)

        if action == 'add':
            file.shared_with.add(user)
        if action == 'remove':
            file.shared_with.remove(user)
        file.save()
        return Response(status=status.HTTP_200_OK)