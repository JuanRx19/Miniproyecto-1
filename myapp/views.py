from rest_framework import generics
from .models import Item
from .serializers import ItemSerializer

class ItemListCreate(generics.ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class ItemRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    
from django.http import HttpResponse

def home(request):
    return HttpResponse("Welcome to the API. Use /api/items/ to access the API.")

from .models import Banco, Empleado, Cliente, Proveedor, Producto, Factura, ProductoFactura
from .serializers import (
    BancoSerializer, EmpleadoSerializer, ClienteSerializer,
    ProveedorSerializer, ProductoSerializer, FacturaSerializer, ProductoFacturaSerializer
)

class BancoListCreateView(generics.ListCreateAPIView):
    queryset = Banco.objects.all()
    serializer_class = BancoSerializer
    
class BancoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Banco.objects.all()
    serializer_class = BancoSerializer

class EmpleadoListCreateView(generics.ListCreateAPIView):
    queryset = Empleado.objects.all()
    serializer_class = EmpleadoSerializer
    
class EmpleadoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Empleado.objects.all()
    serializer_class = EmpleadoSerializer

class ClienteListCreateView(generics.ListCreateAPIView):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
    
class ClienteRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer

class ProveedorListCreateView(generics.ListCreateAPIView):
    queryset = Proveedor.objects.all()
    serializer_class = ProveedorSerializer

class ProveedorRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Proveedor.objects.all()
    serializer_class = ProveedorSerializer

class ProductoListCreateView(generics.ListCreateAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

class FacturaListCreateView(generics.ListCreateAPIView):
    queryset = Factura.objects.all()
    serializer_class = FacturaSerializer

class FacturaListCreateView(generics.ListCreateAPIView):
    queryset = Factura.objects.all()
    serializer_class = FacturaSerializer
    
class ProductoFacturaListCreateView(generics.ListCreateAPIView):
    queryset = ProductoFactura.objects.all()
    serializer_class = ProductoFacturaSerializer
    
class ProductoListCreateView(generics.ListCreateAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer