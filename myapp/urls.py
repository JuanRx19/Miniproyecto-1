from django.urls import path
from .views import ItemListCreate, ItemRetrieveUpdateDestroy, home

urlpatterns = [
    path('', home, name='home'),  # Ruta raíz que muestra un mensaje de bienvenida
    path('items/', ItemListCreate.as_view(), name='item_list_create'),
    path('items/<int:pk>/', ItemRetrieveUpdateDestroy.as_view(), name='item_retrieve_update_destroy'),
]
