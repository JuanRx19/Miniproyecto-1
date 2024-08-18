from django.urls import path, include
from .views import ItemListCreate, ItemRetrieveUpdateDestroy, home
from .views import (
    BancoListCreateView, EmpleadoListCreateView, EmpleadoRetrieveUpdateDestroy, ClienteListCreateView,
    ProveedorListCreateView, ProveedorRetrieveUpdateDestroy, ProductoListCreateView, FacturaListCreateView, ProductoFacturaListCreateView
)

urlpatterns = [
    path('', home, name='home'),  # Ruta raíz que muestra un mensaje de bienvenida
    path('items/', ItemListCreate.as_view(), name='item_list_create'),
    path('items/<int:pk>/', ItemRetrieveUpdateDestroy.as_view(), name='item_retrieve_update_destroy'),
    path('accounts/', include('django.contrib.auth.urls')),
    path('banco/', BancoListCreateView.as_view(), name='banco-list-create'),
    path('empleado/', EmpleadoListCreateView.as_view(), name='empleado_retrieve_update_destroy'),
    path('empleado/<int:pk>/', EmpleadoRetrieveUpdateDestroy.as_view(), name='empleado-detail'),
    path('cliente/', ClienteListCreateView.as_view(), name='cliente-list-create'),
    path('proveedor/', ProveedorListCreateView.as_view(), name='proveedor-list-create'),
    path('proveedor/<int:pk>/', ProveedorRetrieveUpdateDestroy.as_view(), name='proveedor-detail'),
    path('producto/', ProductoListCreateView.as_view(), name='producto-list-create'),
    path('factura/', FacturaListCreateView.as_view(), name='factura-list-create'),
    path('producto-factura/', ProductoFacturaListCreateView.as_view(), name='producto-factura-list-create'),
]
