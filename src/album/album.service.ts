import {  Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumEntity } from './album.entity/album.entity';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { BusinessError,BusinessLogicException } from '../shared/errors/bussines-error';
@Injectable()
export class AlbumService {
    constructor(
        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>
    ){}

    async findAll(): Promise<AlbumEntity[]> {
        return this.albumRepository.find({relations: ["tracks"]});
    }

    async findOne(id: string): Promise<AlbumEntity> {
        const album = await this.albumRepository.findOne({where: {id}, relations: ["tracks"] });
    
        if (!album) {
          throw new NotFoundException(`album with id ${id} no encontrado`);
        }
        console.log(`Entity: ${JSON.stringify(album)}`)
        return album;
    }

    async create(album: AlbumEntity): Promise<AlbumEntity> {
        if (!album.descripcion || !album.nombre){
            throw new BusinessLogicException('Faltan datos para la creacion (nombre y descripción)',BusinessError.BAD_REQUEST)
        }

        return await this.albumRepository.save(album);
    }

    

    async delete(id: string) {
        const album: AlbumEntity = await this.albumRepository.findOne({where:{id}});
        if (!album)
          throw new BusinessLogicException("The album with the given id was not found",BusinessError.PRECONDITION_FAILED);
        if (album.tracks.length > 0){
            throw new BusinessLogicException("El album aun tiene tracks asociados",BusinessError.PRECONDITION_FAILED)
        }
        await this.albumRepository.remove(album);
    }
}
