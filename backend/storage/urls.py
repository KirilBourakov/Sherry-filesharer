from django.urls import path, include
from . import views

urlpatterns = [
    path('directory', views.DirectoryAPI.as_view(), name='directory'),
    path('getDirectoryId', views.DirectoryId.as_view(), name='DirectoryId'),
    path('upload', views.UploadFile.as_view(), name='upload'),
]