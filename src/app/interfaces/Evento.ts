import { EventoCategorias } from './EventoCategorias';

export class Evento{
  id?: number;
  name: string = "";
  nameCard: string = "";
  photo: File | null = null;
  description: string = "";
  dateHora: string = "";
  address: string = "";
  cor: string = "";
  status: string = "";
  categorias: EventoCategorias[] = [];
}
