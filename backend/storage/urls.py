from django.urls import path
from . import views

urlpatterns = [
    path('getDirectoryContents', views.DirectoryContents.as_view(), name='directoryContents'),
    path('upload', views.UploadFile.as_view(), name='upload')
]