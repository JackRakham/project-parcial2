import {IsNotEmpty, IsString, IsUrl, IsNumber} from 'class-validator';

export class PerformerDto {

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsString()
    @IsNotEmpty()
    readonly descripcion: string;

    @IsString()
    @IsNotEmpty()
    readonly imagen: string;
}
