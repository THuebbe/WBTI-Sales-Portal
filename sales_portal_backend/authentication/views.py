from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from authentication.models import User

@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    try:
        user = User.objects.get(username=username, password=password)
        return Response({"message": "Login Successful", "role": user.role})
    except User.DoesNotExist:
        return Response({"error": "Invalid credentials"}, status=400)
    