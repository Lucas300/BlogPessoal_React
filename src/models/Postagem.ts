import Tema from './Tema';
import Usuario from './Usuario';

export default interface Postagem {
  id: number;
  titulo: string;
  texto: string;
  data: string;
  imagem: string;
  linkedin: string;
  github: string;
  tema: Tema | null;
  usuario: Usuario | null;
}