from rest_framework.permissions import AllowAny
from rest_framework import viewsets

class ContactViewSet(viewsets.ModelViewSet):
    # ...
    permission_classes = [AllowAny]