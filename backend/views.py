from rest_framework import generics
from .models import Item
from .serializers import ItemSerializer
from django.core.mail import send_mail
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class ItemListCreate(generics.ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class ItemRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    
from django.http import HttpResponse



"REGISTRO DE VENTAS"

from rest_framework import viewsets
from .models import Venta
from .serializers import VentaSerializer

class VentaViewSet(viewsets.ModelViewSet):
    queryset = Venta.objects.all()
    serializer_class = VentaSerializer

"FINAL"


def home(request):
    return HttpResponse("Welcome to the API. Use /api/items/ to access the API.")

from .models import Banco, Empleado, Cliente, Proveedor, Producto, Factura, ProductoFactura
from .serializers import (
    BancoSerializer, EmpleadoSerializer, ClienteSerializer,
    ProveedorSerializer, ProductoSerializer, FacturaSerializer, ProductoFacturaSerializer, ProductoFacturaSerializerRelacional
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
    
class ProductoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

class FacturaListCreateView(generics.ListCreateAPIView):
    queryset = Factura.objects.all()
    serializer_class = FacturaSerializer

class FacturaRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Factura.objects.all()
    serializer_class = FacturaSerializer
    
class ProductoFacturaListCreateView(generics.ListCreateAPIView):
    queryset = ProductoFactura.objects.all()
    serializer_class = ProductoFacturaSerializer


class ProductoFacturaRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = ProductoFactura.objects.select_related('IdFactura', 'IdProducto')
    serializer_class = ProductoFacturaSerializer
    
class ProductoFacturaListCreateViewRelacional(generics.ListCreateAPIView):
    queryset = ProductoFactura.objects.select_related('IdFactura', 'IdProducto')
    serializer_class = ProductoFacturaSerializerRelacional
    
class EnviarCorreoAPIView(APIView):
    def post(self, request):
        asunto = request.data.get('asunto')
        email = request.data.get('email')
        destinatario = request.data.get('destinatario')
        try:
            send_mail(asunto, email, 'sistemaposxyz@gmail.com', [destinatario])
            return Response({'message': 'Correo enviado exitosamente'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
