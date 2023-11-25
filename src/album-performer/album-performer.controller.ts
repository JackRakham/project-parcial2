import { Controller } from '@nestjs/common';
import {  UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptos/business-errors/business-errors.interceptor';
import { Body, Delete, Get, HttpCode, Param, Post, Put} from '@nestjs/common';

import { AlbumPerformerService } from './album-performer.service';
@Controller('album-performer')
@UseInterceptors(BusinessErrorsInterceptor)
export class AlbumPerformerController {
    constructor(private readonly albumPerformerService: AlbumPerformerService){}

    @Post(':albumId/artworks/:performerId')
   async addPerformerAlbum(@Param('albumId') albumId: string, @Param('performerId') performerId: string){
       return await this.albumPerformerService.addPerformerToAlbum(albumId, performerId);
   }
}
