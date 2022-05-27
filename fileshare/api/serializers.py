from dataclasses import field
from pyexpat import model
from rest_framework import serializers
from api.models import User, File

class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        
class FileSerializers(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = '__all__'
        
class SharedSerializer(serializers.RelatedField):
    def to_representation(self, value):
        return value.username
        
class UserDataSerializers(serializers.ModelSerializer):
    shared_with = SharedSerializer(read_only=True, many=True)
    owner_name = serializers.CharField(source='owner.username')
    class Meta:
        model = File
        fields = ['owner', 'owner_name', 'tags', 'shared_with', 'public', 'file']
        
class BaseDataUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'pk']
        
