from django.urls import path, include
from .views import ItemListCreate, ItemRetrieveUpdateDestroy, home
from .views import (
    BancoListCreateView, EmpleadoListCreateView, EmpleadoRetrieveUpdateDestroy, ClienteListCreateView, ClienteRetrieveUpdateDestroy,
    ProveedorListCreateView, ProveedorRetrieveUpdateDestroy, ProductoListCreateView, ProductoRetrieveUpdateDestroy, FacturaListCreateView, ProductoFacturaListCreateView
)
# Registro de Ventas
from rest_framework.routers import DefaultRouter
from .views import VentaViewSet

router = DefaultRouter()
router.register(r'ventas', VentaViewSet)

urlpatterns = [
    path('', home, name='home'),  # Ruta raíz que muestra un mensaje de bienvenida
    path('items/', ItemListCreate.as_view(), name='item_list_create'),
    path('items/<int:pk>/', ItemRetrieveUpdateDestroy.as_view(), name='item_retrieve_update_destroy'),
    path('accounts/', include('django.contrib.auth.urls')),
    path('banco/', BancoListCreateView.as_view(), name='banco-list-create'),
    path('empleado/', EmpleadoListCreateView.as_view(), name='empleado_retrieve_update_destroy'),
    path('empleado/<int:pk>/', EmpleadoRetrieveUpdateDestroy.as_view(), name='empleado-detail'),
    path('cliente/', ClienteListCreateView.as_view(), name='cliente-list-create'),
    path('cliente/<int:pk>/', ClienteRetrieveUpdateDestroy.as_view(), name='cliente-detail'),
    path('proveedor/', ProveedorListCreateView.as_view(), name='proveedor-list-create'),
    path('proveedor/<int:pk>/', ProveedorRetrieveUpdateDestroy.as_view(), name='proveedor-detail'),
    path('producto/', ProductoListCreateView.as_view(), name='producto-list-create'),
    path('producto/<int:pk>/', ProductoRetrieveUpdateDestroy.as_view(), name='producto-detail'),
    path('factura/', FacturaListCreateView.as_view(), name='factura-list-create'),
    path('productofactura/', ProductoFacturaListCreateView.as_view(), name='producto-factura-list-create'),
    # Agregar la ruta para la lista de productos
    path('api/productos/', ProductoListCreateView.as_view(), name='producto-list-create'),
    path('api/', include(router.urls)),
]
