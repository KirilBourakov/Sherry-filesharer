from rest_framework import serializers
from .models import File, Directory
from django.db import IntegrityError
from django.shortcuts import get_object_or_404
import os

class DirectoryContentFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ['filename', 'id']

class DirectoryContentDirectorySerializer(serializers.ModelSerializer):
    directory_name = serializers.SerializerMethodField()
    path = serializers.SerializerMethodField()
    class Meta:
        model = Directory
        fields = ['path', 'directory_name', 'id']

    def get_directory_name(self, obj):
        return obj.name.strip('/').split('/')[-1]
    def get_path(self, obj):
        return obj.name
    
class CreateDirectorySerializer(serializers.ModelSerializer):
    parent = serializers.CharField(max_length=100)

    class Meta:
        model = Directory
        fields = ['name', 'tags', 'parent']

    def validate_parent(self, value):
        user = self.context['request'].user
        parent = get_object_or_404(Directory, owner=user, name=value)
        return parent
    
    def validate_name(self, value):
        if "/" in value or type(value) != 'string':
            raise serializers.ValidationError("Invalid name")
        return value
    
    def create(self, validated_data):  
        user = self.context['request'].user
        parent = validated_data.get('parent')
        if not parent:
            raise serializers.ValidationError("Parent does not exist or user does not have access.")
        fullName = getattr(parent, 'name') + validated_data['name']
        
        try: 
            return Directory.objects.create(
                name=fullName,
                parent=parent,
                owner=user,
                tags=validated_data['tags']
            )
        except IntegrityError:
            raise serializers.ValidationError('A directory with this name already exists')

class UploadSerializer(serializers.ModelSerializer):
    directory = serializers.CharField(max_length=100)
    
    class Meta:
        model = File
        fields = ['file', 'filename', 'directory', 'tags']

    def validate_directory(self, value):
        # Validate that the directory exists for the current user
        user = self.context['request'].user
        print(';;;;;;;;;;;;;;;;;;;;;')
        directory = get_object_or_404(Directory, owner=user, name=value)
        return directory

    def create(self, validated_data):
        user = self.context['request'].user
        directory = validated_data.get('directory')
        if not directory:
            raise serializers.ValidationError("Directory does not exist or user does not have access.")
        return File.objects.create(
            author=user,
            file=validated_data['file'], 
            filename=validated_data['filename'],
            tags=validated_data['tags'],
            directory=directory,     
        )    

