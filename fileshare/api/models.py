from django.db import models
from django.contrib.auth.models import AbstractUser
from django.dispatch import receiver
from django.db.models.signals import post_delete

def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return 'user_{0}/{1}'.format(instance.owner.id, filename)

# Create your models here.
class User(AbstractUser):
    
    def __str__(self):
        return f"{self.username}/ {self.pk}"

class File(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owner')
    
    # file
    file = models.FileField(upload_to=user_directory_path, unique=True)
    tags = models.CharField(max_length=100, default='')
    
    # file controls
    shared_with = models.ManyToManyField(User, related_name='shared')
    public = models.BooleanField(default=False)
    
@receiver(post_delete, sender=File)
def delete_file(sender, instance, *args, **kwargs):
    """ Clean Old Image file """
    try:
        instance.file.delete(save=False)
    except:
        pass