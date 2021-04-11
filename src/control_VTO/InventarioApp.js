import React, { useReducer, useEffect } from "react";
import { Reducer } from "./Reducer.js";
import "./inventario.css";
import { useForm } from "./hook/useForm";

const init = () => {
  return JSON.parse(localStorage.getItem("productos")) || [];
};

function getCurrentDate(separator = "") {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return `${date}${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}${year}`;
}

export const InventarioApp = () => {
  const [productos, dispatch] = useReducer(Reducer, [], init);

  const [
    { Producto, fecha, VTO, decripcion },
    handleInputChange,
    reset
  ] = useForm({
    Producto: "",
    decripcion: "",
    fecha: "",
    VTO: ""
  });

  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(productos));
  }, [productos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Producto.trim().length <= 1) {
      return;
    }

    const newItem = {
      id: new Date().getTime(),
      desc: Producto,
      descrip: decripcion,
      dia: fecha,
      vto: VTO,
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

  let getvto = JSON.parse(localStorage.getItem("productos"));

  let [{ vto }] = getvto;

  if (vto >= VTO) {
  }

  return (
    <div className="container pt-1">
      <h1>Poductos por vencer</h1>
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
                  <p className="text-center">{prod.descrip}</p>
                  <p className="text-center">{prod.dia}</p>
                  <p className="text-center">{prod.vto}</p>

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
              name="Producto"
              className="form-control"
              placeholder="Producto..."
              autoComplete="off"
              value={Producto}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="decripcion"
              className="form-control"
              placeholder="descripciòn..."
              autoComplete="off"
              value={decripcion}
              onChange={handleInputChange}
            />

            <input
              type="date"
              name="fecha"
              className="form-control"
              placeholder="fecha"
              autoComplete="off"
              value={fecha}
              onChange={handleInputChange}
            />
            <input
              type="date"
              name="VTO"
              className="form-control"
              placeholder="VTO"
              autoComplete="off"
              value={VTO}
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
