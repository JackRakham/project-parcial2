import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PerformerEntity } from './performer.entity/performer.entity';
import { BusinessError,BusinessLogicException } from '../shared/errors/bussines-error';
@Injectable()
export class PerformerService {
    constructor(
        @InjectRepository(PerformerEntity)
        private readonly performerRepository: Repository<PerformerEntity>
    ){}

    async findAll(): Promise<PerformerEntity[]> {
        return this.performerRepository.find({});
    }

    async findOne(id: string): Promise<PerformerEntity> {
        const performer = await this.performerRepository.findOne({where: {id},  });
    
        if (!performer) {
          throw new NotFoundException(`performer with id ${id} no encontrado`);
        }
        
        return performer;
    }

    async create(performer: PerformerEntity): Promise<PerformerEntity> {

        if (performer.descripcion.length>100){
            throw new BadRequestException("La descripcion excede el maximo de caracteres(100)")
        }
        return await this.performerRepository.save(performer);
    }

    

}
