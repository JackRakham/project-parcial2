import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/album/album.entity/album.entity';
import { PerformerEntity } from 'src/performer/performer.entity/performer.entity';
import { Repository } from 'typeorm';
@Injectable()
export class AlbumPerformerService {
    constructor(
        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>,
        @InjectRepository(PerformerEntity)
        private readonly performerRepository: Repository<PerformerEntity>,
        
    ) {}


    async addPerformerToAlbum(albumId: string, performerId: string): Promise<AlbumEntity> {
        const performer: PerformerEntity = await this.performerRepository.findOne({where: {id: performerId}});
        if (!performer)
          throw new NotFoundException("The performer with the given id was not found");
      
        const album: AlbumEntity = await this.albumRepository.findOne({where: {id: albumId}, relations: ["performers", "exhibitions"]})
        if (!album)
          throw new NotFoundException("The album with the given id was not found");
        if (album.performers.length==3){
            throw new BadRequestException("El album ya tiene al maximo de performers asociados(3)")
        }
        album.performers = [...album.performers, performer];
        return await this.albumRepository.save(album);
      }
}
