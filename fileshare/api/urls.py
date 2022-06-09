from django.urls import path, re_path

from django.conf import settings
from django.views.static import serve

from . import views

urlpatterns = [ 
    path('sendmail', views.Sendmail, name='sendmail'),
    path('logedincheck', views.UserIsLogedIn.as_view(), name='LogedinCheck'),
    path('getfiles/<str:param>', views.Getfiles.as_view(), name='getfiles'),
    path('getpublicfiles/<str:param>', views.Getpublicfiles.as_view(), name='getpublicfiles'),
    path('sharedwithme/<str:param>', views.Sharedwithme.as_view(), name='sharedwithme'),
    path('item/<int:id>', views.Getfile.as_view(), name='getitem'),
    path('item/userdata/<int:id>', views.Getuserdata.as_view(), name='Getuserdata'),
    path('OwnerCheck/<int:id>', views.OwnerCheck.as_view(), name='OwnerCheck'),
    path('EditTags/<int:id>', views.EditTags.as_view(), name='addtag'),
    path('ChangePrivate/<int:id>', views.ChangePrivate.as_view(), name='ChangePrivate'),
    path('RemoveUser/<int:id>', views.RemoveUser.as_view(), name='RemoveUser'),
    path('addUser/<int:id>', views.AddUser.as_view(), name="addUser"),
    path('getUser', views.GetUser.as_view(), name='getUser'),
    path('deleteFile/<int:id>', views.DeleteFile.as_view(), name='deleteFile'),
    
    path('DeleteTemp', views.DeleteTemp.as_view(), name='DeleteTemp'),
    
    # file upload
    path('checkFormData', views.CheckFormData.as_view(), name="checkFormData"),
    path('sendFileData', views.SendFileData.as_view(), name='sendFileData'), #
    path('sendFormData', views.SendFormData.as_view(), name='sendFormData'), #
]