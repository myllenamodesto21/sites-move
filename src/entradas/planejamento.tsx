import { createRoot } from "react-dom/client";
import "../estilos/global.css";
import { PaginaPlanejamento } from "../paginas/planejamento/PaginaPlanejamento";

createRoot(document.getElementById("app")!).render(<PaginaPlanejamento />);
