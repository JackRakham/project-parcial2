import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackEntity } from './track.entity/track.entity';
import { BusinessError,BusinessLogicException } from '../shared/errors/bussines-error';
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
          throw new BusinessLogicException(`track with id ${id} no encontrado`,BusinessError.NOT_FOUND);
        }
        console.log(`Entity: ${JSON.stringify(track)}`)
        return track;
    }

    async create(albumid:string,track: TrackEntity): Promise<TrackEntity> {

        if (track.duracion <=0){
            throw new BusinessLogicException(`La duración debe ser positiva`,BusinessError.PRECONDITION_FAILED)
        }
        if (!track.album){
            throw new BusinessLogicException(`El album asociado debe existir`,BusinessError.PRECONDITION_FAILED)
        }
        return await this.trackRepository.save(track);
    }

    

    
}
