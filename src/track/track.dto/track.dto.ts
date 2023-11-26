import {IsNotEmpty, IsString, IsUrl, IsNumber} from 'class-validator';



export class TrackDto {

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsNumber()
    @IsNotEmpty()
    readonly duracion: string;


    @IsString()
    @IsNotEmpty()
    readonly albumid: string;
    


}
