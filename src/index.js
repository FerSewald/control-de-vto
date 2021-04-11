import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { InventarioApp } from "./control_VTO/InventarioApp.js";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <InventarioApp />
  </StrictMode>,
  rootElement
);
