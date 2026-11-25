import { createRoot } from "react-dom/client";
import "../estilos/global.css";
import { PaginaLinks } from "../paginas/PaginaLinks";

createRoot(document.getElementById("app")!).render(<PaginaLinks />);
