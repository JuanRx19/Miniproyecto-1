from django.contrib import admin
from .models import Banco, Empleado, Cliente, Proveedor, Producto, Factura, ProductoFactura

admin.site.register(Banco)
admin.site.register(Empleado)
admin.site.register(Cliente)
admin.site.register(Proveedor)
admin.site.register(Producto)
admin.site.register(Factura)
admin.site.register(ProductoFactura)