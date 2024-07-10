from django.urls import path
from . import views

urlpatterns = [
    path('getDirectoryContents', views.DirectoryContents.as_view(), name='directoryContents')
]