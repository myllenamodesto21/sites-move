import { createRoot } from "react-dom/client";
import "../estilos/global.css";
import { PaginaTermos } from "../paginas/PaginaTermos";

createRoot(document.getElementById("app")!).render(<PaginaTermos />);
