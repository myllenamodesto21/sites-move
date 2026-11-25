import { createRoot } from "react-dom/client";
import "../estilos/global.css";
import { PaginaInicio } from "../paginas/PaginaInicio";

createRoot(document.getElementById("app")!).render(<PaginaInicio />);
