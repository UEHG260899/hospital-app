interface MedicoUser {
    _id: string,
    nombre: string,
    img?: string
}

interface MedicoHospital {
    _id: string,
    nombre: string,
    img?: string
}

export class Medico {


    constructor(
        public nombre: string,
        public id: string,
        public usuario?: MedicoUser,
        public hospital?: MedicoUser,
        public img?: string
    ){}
}