from rest_framework import serializers
from .models import File, Directory
import os

class DirectoryContentFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ['filename',]

class DirectoryContentDirectorySerializer(serializers.ModelSerializer):
    directory_name = serializers.SerializerMethodField()
    path = serializers.SerializerMethodField()
    class Meta:
        model = Directory
        fields = ['path', 'directory_name']

    def get_directory_name(self, obj):
        return obj.name.strip('/').split('/')[-1]
    def get_path(self, obj):
        return obj.name
    
    

