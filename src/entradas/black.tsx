import { estadoDaCampanha } from "../lib/campanha";
import { href } from "../lib/rotas";

// /black é um atalho: a oferta vive em /planejamento (mesma URL nos dois modos).
// Preserva a origem do visitante e avisa quando a Black já encerrou.
const estado = estadoDaCampanha();
const destino = href("planejamento", estado === "encerrada" ? { params: { "de-black": "1" } } : {});
location.replace(destino + location.hash);
