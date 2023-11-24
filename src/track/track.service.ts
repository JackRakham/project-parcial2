import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackEntity } from './track.entity/track.entity';
@Injectable()
export class TrackService {
    constructor(
        @InjectRepository(TrackEntity)
        private readonly trackRepository: Repository<TrackEntity>
    ){}

    async findAll(): Promise<TrackEntity[]> {
        return this.trackRepository.find({relations: ["performers"]});
    }

    async findOne(id: string): Promise<TrackEntity> {
        const track = await this.trackRepository.findOne({where: {id}, relations: ["tracks"] });
    
        if (!track) {
          throw new NotFoundException(`track with id ${id} no encontrado`);
        }
        console.log(`Entity: ${JSON.stringify(track)}`)
        return track;
    }

    async create(albumid:string,track: TrackEntity): Promise<TrackEntity> {

        if (track.duracion <=0){
            throw new BadRequestException('La duración debe ser positiva')
        }
        if (!track.album){
            throw new BadRequestException('El album asociado debe existir')
        }
        return await this.trackRepository.save(track);
    }

    

    async delete(id: string) {
        const track: TrackEntity = await this.trackRepository.findOne({where:{id}});
        if (!track)
          throw new NotFoundException("The track with the given id was not found");
     
        await this.trackRepository.remove(track);
    }
}
