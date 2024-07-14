from django.urls import path, include
from . import views

urlpatterns = [
    path('getDirectoryContents', views.DirectoryContents.as_view(), name='directoryContents'),
    path('getDirectoryId', views.DirectoryId.as_view(), name='DirectoryId'),
    path('upload', views.UploadFile.as_view(), name='upload'),
]