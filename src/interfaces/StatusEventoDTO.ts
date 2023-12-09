import { EventoCategoriasDTO } from "./EventoCategoriasDTO";

export class StatusEventoDTO {
  id?: number;
  name: string = "";
  nameCard: string = "";
  photo: File | null = null;
  description: string = "";
  dateHora: Date | null = null;
  address: string = "";
  cor: string = "";
  status: string = "";
  categorias: EventoCategoriasDTO[] = [];
}
