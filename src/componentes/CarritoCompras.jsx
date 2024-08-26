// CarritoCompras.jsx
import React, { useState } from "react";
import productos from "../assets/pizzas"; // Importa el array de productos

const CarritoCompras = () => {
  // Estado para almacenar la cantidad de cada producto en el carrito
  const [cantidades, setCantidades] = useState(
    productos.reduce((acc, producto) => {
      acc[producto.id] = 0; // Inicialmente, todos los productos tienen una cantidad de 0
      return acc;
    }, {})
  );

  // Función para aumentar la cantidad de un producto
  const agregarCantidad = (productoId) => {
    setCantidades((cantidadesAnteriores) => ({
      ...cantidadesAnteriores,
      [productoId]: cantidadesAnteriores[productoId] + 1,
    }));
  };

  // Función para disminuir la cantidad de un producto
  const disminuirCantidad = (productoId) => {
    setCantidades((cantidadesAnteriores) => ({
      ...cantidadesAnteriores,
      [productoId]: Math.max(0, cantidadesAnteriores[productoId] - 1),
    }));
  };

  // Calcular el total del carrito
  const calcularTotal = () => {
    return productos.reduce((total, producto) => {
      return total + producto.price * cantidades[producto.id];
    }, 0);
  };

  return (
    <div className="container">
      <h2 className="my-4">Carrito de Compras</h2>
      <div className="list-group">
        {productos.map((producto) => (
          <div
            key={producto.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div className="d-flex align-items-center">
              <img
                src={producto.img}
                alt={producto.nombre}
                className="img-fluid mr-3"
                style={{ maxHeight: "100px", objectFit: "contain" }}
              />
              <div>
                <h5>{producto.name}</h5>
                <p>Precio: ${producto.price}</p>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <button
                className="btn btn-danger mr-2"
                onClick={() => disminuirCantidad(producto.id)}
              >
                -
              </button>
              <span>{cantidades[producto.id]}</span>
              <button
                className="btn btn-success ml-2"
                onClick={() => agregarCantidad(producto.id)}
              >
                +
              </button>
            </div>
          </div>
        ))}
        <div className="list-group-item">
          <h3>Total: ${calcularTotal()}</h3>
        </div>
      </div>
    </div>
  );
};

export default CarritoCompras;
