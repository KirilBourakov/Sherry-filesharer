from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
import uuid, os

# Create your models here.

class Directory(models.Model):
    name = models.TextField(blank=False)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    shared_with = models.ManyToManyField(User, related_name='shared')
    tags = models.CharField(max_length=100, default='')
    public = models.BooleanField(default=False)

def upload_handler(instance, filename):
    ext = filename.split(".")[-1]
    filename = f"{instance.author.username}/{instance.id}.{ext}"
    return os.path.join(settings.UPLOAD_ROOT, filename)
class File(models.Model):
    id = models.UUIDField(unique=True, primary_key=True, default=uuid.uuid4)

    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='author')
    shared_with = models.ManyToManyField(User, related_name='shared')

    file = models.FileField(upload_to=upload_handler)
    directory = models.ForeignKey(Directory, on_delete=models.CASCADE, null=True, blank=True)

    tags = models.CharField(max_length=100, default='')
    public = models.BooleanField(default=False)
