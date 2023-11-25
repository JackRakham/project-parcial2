import { Controller } from '@nestjs/common';
import { AlbumPerformerService } from 'src/album-performer/album-performer.service';
import { AlbumService } from './album.service';
import { BusinessErrorsInterceptor } from 'src/shared/interceptos/business-errors/business-errors.interceptor';
import { Body, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { AlbumEntity } from './album.entity/album.entity';
import {plainToInstance } from 'class-transformer';
import { AlbumDto } from './album.dto/album.dto';
@Controller('album')
@UseInterceptors(BusinessErrorsInterceptor)
export class AlbumController {
    constructor(private readonly albumService:AlbumService) {}

    @Get()
  async findAll() {
    return await this.albumService.findAll();
  }

  @Get(':albumId')
  async findOne(@Param('albumId') albumId: string) {
    return await this.albumService.findOne(albumId);
  }

  @Post()
  async create(@Body() albumDto: AlbumDto) {
    const album: AlbumEntity = plainToInstance(AlbumEntity, albumDto);
    return await this.albumService.create(album);
  }
}
