from django.shortcuts import render
from .serializers import DirectoryContentDirectorySerializer, DirectoryContentFileSerializer
from .models import File, Directory
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
from rest_framework import permissions, status

# Create your views here.
class DirectoryContents(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [SessionAuthentication]
    def get(self, request):
        # TODO: Make shared content it's own directory 
        # Maybe make it so that creating a user makes a / and shared with me directory for them
        user = request.user
        requested_directory = request.GET.get('path', None)

        if requested_directory is None:
            subdirectories = Directory.objects.filter(parent__isnull=True)
        else:
            subdirectories = Directory.objects.filter(parent__name=requested_directory)
        
        subdirectories = subdirectories.filter(owner=user) | subdirectories.filter(shared_with=user) 
        
        directory_serializer = DirectoryContentDirectorySerializer(subdirectories, many=True)
        
        files = File.objects.filter(directory__name=requested_directory)
        files = files.filter(author=user) | files.filter(shared_with=user)
        file_serializer = DirectoryContentFileSerializer(files, many=True)

        data = {
            'files': file_serializer.data,
            'directories': directory_serializer.data
        }
        return Response(data, status=status.HTTP_200_OK)