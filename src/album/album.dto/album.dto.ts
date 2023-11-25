import {IsNotEmpty, IsString, IsUrl, IsNumber, isDateString} from 'class-validator';

export class AlbumDto {

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsString()
    @IsNotEmpty()
    readonly caratula: string;

    @IsString()
    @IsNotEmpty()
    readonly descripcion: string;

    
}
