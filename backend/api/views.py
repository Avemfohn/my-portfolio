from rest_framework.permissions import AllowAny # <-- Bunu ekledik
from rest_framework import viewsets

class ContactViewSet(viewsets.ModelViewSet):
    # ...
    permission_classes = [AllowAny] # <-- Burayı serbest bıraktık