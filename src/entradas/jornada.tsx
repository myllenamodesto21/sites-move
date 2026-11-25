import { createRoot } from "react-dom/client";
import "../estilos/global.css";
import { PaginaJornada } from "../paginas/PaginaJornada";

createRoot(document.getElementById("app")!).render(<PaginaJornada />);
