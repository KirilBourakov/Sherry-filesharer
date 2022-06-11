import json, os, io
from rest_framework.response import Response
from django.http import HttpResponse
from django.db.models import Q
from django.core.files.base import ContentFile
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from api.models import User, File 
from .serializers import UserSerializers, FileSerializers, UserDataSerializers, BaseDataUserSerializer
from .utils import sendmail
# # Create your views here.

@api_view(['POST'])
def Sendmail(request):
    data = json.loads(request.body) 
    content = data['Content']
    if content.strip() == '':
        response = {'message': 'Content is missing'}
        return Response(response)
    sender = data['EmailBack']
    if sender.strip() == '':
        response = {'message': 'Sender is missing'}
        return Response(response)
    subject = data['Subject']
    if subject.strip() == '':
        response = {'message': 'Subject is missing'}
        return Response(response)
    
    mailcheck = sendmail(data, sender, content)
    
    if mailcheck == False:
        response = {'message': 'Failed'}
    response = {'message': 'Email sent'}
    return Response(response)
            
class UserIsLogedIn(APIView):
    def get(self, request):
        response = {'status': True}
        return Response(response)

class DeleteTemp(APIView):
    def post(self, request):
        data = json.loads(request.body)
        f = File.objects.get(file__contains=data['oldfilename'])
        f.delete()
        response = {'response': True}
        return Response(response)

    
class Getfiles(APIView):
    def get(self, request, param):
        if param == '|<>|':
            files = File.objects.filter(owner=request.user).order_by('-file')
            response = FileSerializers(files, many=True)
            return Response(response.data)    
        else:
            files = File.objects.filter(Q(tags__icontains=param, owner=request.user) | Q(file__icontains=param, owner=request.user))
            files = files.order_by('-file')
            response = FileSerializers(files, many=True)
            return Response(response.data)  
        
class Sharedwithme(APIView):
    def get(self, request, param):
        if param == '|<>|':
            files = File.objects.filter(shared_with=request.user)
            response = FileSerializers(files, many=True)
            return Response(response.data)
        else:
            files = File.objects.filter(Q(tags__icontains=param, shared_with=request.user) | Q(file__icontains=param, shared_with=request.user))
            response = FileSerializers(files, many=True)
            return Response(response.data)  
    
class Getfile(APIView):
    def get(self, request, id):
        file = File.objects.get(pk=id)
        
        f = open(str(file.file), "rb")
        bytes= f.read()
        f.close()
        
        return HttpResponse(bytes, content_type="application/pdf")
    
class Getuserdata(APIView):
    def get(self, request, id):
        data = File.objects.get(pk=id) 
        response = UserDataSerializers(data)
        return Response(response.data)
    
class Getpublicfiles(APIView):
    def get(self, request, param):
        if param == '|<>|':
            files = File.objects.filter(public=True) 
            response = FileSerializers(files, many=True)
            return Response(response.data)
        else:
            files = File.objects.filter(Q(tags__icontains=param, public=True) | Q(file__icontains=param, public=True))
            response = FileSerializers(files, many=True)
            return Response(response.data)  
        
class OwnerCheck(APIView):
    def get(self, request, id):
        try:
            f = File.objects.get(pk=id, owner=request.user)
            response = {'response': True}
            return Response(response)
        except File.DoesNotExist:
            response = {'response': False}
            return Response(response)
    
class EditTags(APIView):
    def put(self, request, id):
        data = json.loads(request.body)
        f = File.objects.get(pk=id)
        f.tags = data['tag']
        f.save()
        response = {'response': True}
        return Response(response)
    
class ChangePrivate(APIView):
    def put(self, request, id):
        try:
            data = json.loads(request.body)
            f = File.objects.get(pk=id)
            f.public = data['bool']
            f.save()
            response = {'response': True}
            return Response(response)
        except:
            response = {'response': "We're sorry, something went wrong. Please try again later."}
            return Response(response)
    
class RemoveUser(APIView):
    def put(self, request, id):
        try:
            data = json.loads(request.body)
            u = User.objects.get(username=data['user'])
            f = File.objects.get(pk=id)
            f.shared_with.remove(u)
            response = {'response': True}
            return Response(response)
        except:
            response = {'response': "We're sorry, something went wrong. You are sharing with this user, and please try again later."}
            return Response(response)
    
class AddUser(APIView):
    def put(self, request, id):
        data = json.loads(request.body)
        if data['user'] == request.user.username or data['user'].replace('#', '').strip() == request.user.pk:
            response = {'response': 'Owner cannot add themselves.'}
            return Response(response)
        if '#' in data['user']:
            try:
                u = User.objects.get(pk=data['user'].replace('#', '').strip())
                f = File.objects.get(pk=id)
                f.shared_with.add(u)
                response = {'response': True}
                return Response(response)
            except User.DoesNotExist:
                response = {'response': 'This user does not exist. Please make sure you typed the id correctly.'}
                return Response(response)
        else:
            try:
                u = User.objects.get(username=data['user'])
                f = File.objects.get(pk=id)
                f.shared_with.add(u)
                response = {'response': True}
                return Response(response)
            except User.DoesNotExist:
                response = {'response': 'This user does not exist. Please make sure you typed the name correctly.'}
                return Response(response)
            
class GetUser(APIView):
    def get(self, request):
        user = BaseDataUserSerializer(request.user)
        return Response(user.data)
            
class DeleteFile(APIView):
    def post(self, request, id):
        try:
            print(id)
            f = File.objects.get(pk=id, owner=request.user)
            print(f.file)
            f.delete()
            response = {'response': True}
            return Response(response)
        except File.DoesNotExist:
            response = {'response': 'Something went wrong. Please insure you are owner.'}
            return Response(response)
        
        
        
        
# File upload

class CheckFormData(APIView):
    def put(self, request):
        data = json.loads(request.body)
        
        #check that file is a pdf
        if not (data['filename'][-4] == '.' and data['filename'][-3] == 'p' and data['filename'][-2] == 'd' and data['filename'][-1] == 'f'):
            response = {'status': 'Make sure you are uploading a pdf file. (File must end in .pdf).'}   
            return Response(response)
        
        #check if file exists
        try:
            f = File.objects.get(file__contains=data['filename'], owner=request.user)
            response = {'exists': True}
            return Response(response)
        except File.DoesNotExist:
            response = {'exits': False}
            return Response(response)

class SendFileData(APIView):
    def post(self, request):
        file = ContentFile(request.body, 'temp.pdf') #the a is a temp file name until I can find out how to get the filename 
        f = File.objects.create(owner=request.user, tags='', file=file)    
        f.save()
        temp_name = str(f.file).split('/')[len(str(f.file).split('/')) - 1]
        response = {'status': True, 'temp_name': temp_name, 'pk': f.pk}
        return Response(response)  

class SendFormData(APIView):
    def post(self, request):
        data = json.loads(request.body)
        # get model
        model = File.objects.get(pk=data['pk'], owner=request.user)
        model.tags = data['tags'] 
        model.save()
        
        # create new path
        currentname = str(model.file.path).split('\\')[-1]
        currentpath = str(model.file.path)
        currentpath = currentpath.replace(currentname,'')
        newpath = currentpath + data['filename']

        # rename file
        try:
            os.rename(model.file.path, newpath)
            model.file.name = newpath
            model.save()
            response = {'status': True, 'msg': 'File uploaded!'}   
            return Response(response)
        except FileExistsError:
            File.objects.get(file=newpath).delete()
            os.rename(model.file.path, newpath)
            model.file.name = newpath
            model.save()
            response = {'status': True, 'msg': f"{data['filename']} overwritten."}   
            return Response(response)