import React, { useReducer, useEffect } from "react";
import { Reducer } from "./Reducer";
import "./inventario.css";
import { useForm } from "./hook/useForm";

const init = () => {
  return JSON.parse(localStorage.getItem("productos")) || [];
};

export const InventarioApp = () => {
  const [productos, dispatch] = useReducer(Reducer, [], init);

  const [{ description, precio, cantidad }, handleInputChange, reset] = useForm(
    {
      description: "",
      precio: "",
      cantidad: ""
    }
  );

  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(productos));
  }, [productos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description.trim().length <= 1) {
      return;
    }

    const newItem = {
      id: new Date().getTime(),
      desc: description,
      pre: precio,
      cant: cantidad,
      done: false
    };

    const action = {
      type: "add",
      payload: newItem
    };

    dispatch(action);
    reset();
  };

  const handleDelete = (productosId) => {
    const action = {
      type: "delete",
      payload: productosId
    };
    dispatch(action);
  };

  return (
    <div className="container pt-1">
      <h1>Inventario ({productos.length})</h1>
      <hr />

      <div className="row">
        <div className="col-1  p-0 mt-1">
          {productos.map((prod, index) => (
            <li key={prod.id} className="list-group-item">
              <p className="text-center">{index + 1}</p>
            </li>
          ))}
        </div>

        <div className="col-7 p-0 mt-1">
          <div className="col-6">
            <ul className="list-group list-group-flush">
              {productos.map((prod) => (
                <li key={prod.id} className="list-group-item">
                  <p className="text-center">{prod.desc}</p>
                  <p className="text-center">{prod.pre}</p>
                  <p className="text-center">{prod.cant}</p>

                  <button
                    className="btn btn-danger p-0"
                    onClick={() => handleDelete(prod.id)}
                  >
                    borrar
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-4">
          <h1>Agregar Producto</h1>
          <hr />

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="description"
              className="form-control"
              placeholder="Producto..."
              autoComplete="off"
              value={description}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="precio"
              className="form-control"
              placeholder="Precui..."
              autoComplete="off"
              value={precio}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="cantidad"
              className="form-control"
              placeholder="Cantidad..."
              autoComplete="off"
              value={cantidad}
              onChange={handleInputChange}
            />
            <button
              className="btn btn-outline-info mt-1 btn-block"
              type="submit"
            >
              Agregar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
