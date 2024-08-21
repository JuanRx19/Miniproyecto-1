from django.db import models

# Create your models here.


"REGISTRO DE VENTAS"

from django.contrib.auth.models import User

class Venta(models.Model):
    producto = models.ForeignKey('Producto', on_delete=models.CASCADE)
    cantidad = models.IntegerField()
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)
    total_venta = models.DecimalField(max_digits=10, decimal_places=2)
    fecha_venta = models.DateTimeField(auto_now_add=True)
    vendedor = models.ForeignKey(User, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        self.total_venta = self.cantidad * self.precio_unitario
        super(Venta, self).save(*args, **kwargs)

"FINAL"




class Item(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name
    
class Banco(models.Model):
    IdBanco = models.BigIntegerField(primary_key=True)
    NombreBanco = models.CharField(max_length=30)
    class Meta:
        db_table = 'banco'

class Empleado(models.Model):
    IdEmpleado = models.BigAutoField(primary_key=True)
    NombreEmpleado = models.CharField(max_length=30)
    TipoEmpleado = models.BooleanField()  # BIT en MySQL se traduce como BooleanField en Django
    Usuario = models.CharField(max_length=50)
    Contraseña = models.CharField(max_length=50)
    class Meta:
        db_table = 'empleado'

class Cliente(models.Model):
    IdCliente = models.BigIntegerField(primary_key=True)
    NombreCliente = models.CharField(max_length=50)
    DireccionCliente = models.CharField(max_length=50)
    class Meta:
        db_table = 'cliente'

class Proveedor(models.Model):
    IdProveedor = models.BigAutoField(primary_key=True)
    NombreProveedor = models.CharField(max_length=50)
    DireccionProveedor = models.CharField(max_length=50)
    class Meta:
        db_table = 'proveedor'

class Producto(models.Model):
    IdProducto = models.BigAutoField(primary_key=True)
    NombreProducto = models.CharField(max_length=50)
    IdProveedor = models.ForeignKey('Proveedor', on_delete=models.CASCADE, db_column='IdProveedor')
    Cantidad = models.IntegerField()
    ValorUnidad = models.IntegerField()
    UrlImagen = models.CharField(max_length=2048)
    #facturas = models.ManyToManyField('Factura', through='ProductoFactura')
    class Meta:
        db_table = 'producto'

class Factura(models.Model):
    IdFactura = models.BigIntegerField(primary_key=True)
    IdCliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, db_column='IdCliente')
    IdEmpleado = models.ForeignKey(Empleado, on_delete=models.CASCADE, db_column='IdEmpleado')
    Fecha = models.DateField()
    MedioPago = models.CharField(max_length=50, choices=[('Efectivo', 'Efectivo'), ('Tarjeta', 'Tarjeta')])
    IdBanco = models.ForeignKey(Banco, on_delete=models.CASCADE, db_column='IdBanco')
    #productos = models.ManyToManyField('Producto', through='ProductoFactura')
    class Meta:
        db_table = 'factura'

class ProductoFactura(models.Model):
    IdFactura = models.ForeignKey(Factura, on_delete=models.CASCADE)
    IdProducto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    Cantidad = models.IntegerField()

    class Meta:
        db_table = 'ProductoFactura'
        unique_together = ('IdFactura', 'IdProducto')
        constraints = [
            models.UniqueConstraint(fields=['IdFactura', 'IdProducto'], name='unique_producto_factura')
        ]