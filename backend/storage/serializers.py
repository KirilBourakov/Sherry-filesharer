from rest_framework import serializers
from .models import File, Directory
import os

class DirectoryContentFileSerializer(serializers.ModelSerializer):
    filename = serializers.SerializerMethodField()
    
    class Meta:
        model = File
        fields = ['filename',]

    def get_filename(self, obj):
        return obj.file.name.split('/')[-1]

class DirectoryContentDirectorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Directory
        fields = ['name']
    
    

