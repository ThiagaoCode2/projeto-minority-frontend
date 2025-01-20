import { Postagem } from "./Postagem"

export class Usuario
{
    public id!:              number;
    public nome!:            string;
    public usuario!:         string;
    public senha!:           string;
    public foto!:            string;
    public tipoDeUsuario!:   string;
    public linkedin!:        string;
    public profissao!:       string;
    public empresa!:         string;
    public minhasPostagens!: Postagem[];
}