
export const obtenerMaximo = (data) => {
  if(data.length > 0){
    let max = 0;
    let total = 0;
    let nombreProducto = "";
    const salesMap = data.reduce((acc, product) => {
      if (!acc[product.IdProducto.NombreProducto]) {
        acc[product.IdProducto.NombreProducto] = 0;
      }
      total += (product.IdProducto.ValorUnidad * product.Cantidad);
      acc[product.IdProducto.NombreProducto] += product.Cantidad;
      
      return acc;
    }, {});
    
    const salesArray = Object.keys(salesMap).map(nombre => ({
      nombre,
      cantidad: salesMap[nombre],
    }));

    salesArray.forEach(producto => {
      if(producto.cantidad >= max){
        max = producto.cantidad
        nombreProducto = producto.nombre;
      }
    });
    
    return {nombre: nombreProducto, valor: total};
  }else{
    return "No hay ventas registradas";
  }
}