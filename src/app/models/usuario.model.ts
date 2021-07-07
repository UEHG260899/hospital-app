import { environment } from "../../environments/environment";

const base_url = environment.baseURL;

export class Usuario {
    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public google?: boolean,
        public img?: string,
        public uid?: string,
        public role?: string
    ) { }

    get imagenUrl(): string {

        if (this.img?.includes('https')) {
            return this.img;
        }
        if (this.img) {
            return `${base_url}/upload/usuarios/${this.img}`;
        } else {
            return `${base_url}/upload/usuarios/no-image`;
        }
    }
}