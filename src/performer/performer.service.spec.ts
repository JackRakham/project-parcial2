import { Test, TestingModule } from '@nestjs/testing';
import { PerformerService } from './performer.service';
import { faker } from '@faker-js/faker';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { PerformerEntity } from './performer.entity/performer.entity';
import { TrackEntity } from 'src/track/track.entity/track.entity';
import { AlbumEntity } from 'src/album/album.entity/album.entity';



describe('PerformerService', () => {
  let service: PerformerService;
  let repository: Repository<PerformerEntity>;
  let performersList: PerformerEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [PerformerService],
    }).compile();

    service = module.get<PerformerService>(PerformerService);
    repository = module.get<Repository<PerformerEntity>>(getRepositoryToken(PerformerEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    performersList = [];
    for(let i = 0; i < 5; i++){
        const performer: PerformerEntity = await repository.save({
        nombre: faker.company.name(), 
        description: faker.lorem.sentence(), 
        imagen: faker.word.noun(), 
        })
        performersList.push(performer);
    }
  }
    
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all performers', async () => {
    const performers: PerformerEntity[] = await service.findAll();
    expect(performers).not.toBeNull();
    expect(performers).toHaveLength(performersList.length);
  });

  it('findOne should return a performer by id', async () => {
    const storedperformer: PerformerEntity = performersList[0];
    const performer: PerformerEntity = await service.findOne(storedperformer.id);
    expect(performer).not.toBeNull();
    expect(performer.nombre).toEqual(storedperformer.nombre)
    expect(performer.descripcion).toEqual(storedperformer.descripcion)
    expect(performer.imagen).toEqual(storedperformer.imagen)
    
  });

  it('findOne should throw an exception for an invalid performer', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "The performer with the given id was not found")
  });

  it('create should return a new performer', async () => {
    const performer: PerformerEntity = {
      id: "",
      nombre: faker.company.name(), 
      descripcion: faker.lorem.sentence(), 
      imagen: faker.word.noun(), 
      cancion: new TrackEntity,
      album: new AlbumEntity
    }

    const newperformer: PerformerEntity = await service.create(performer);
    expect(newperformer).not.toBeNull();

    const storedperformer: PerformerEntity = await repository.findOne({where: {id: newperformer.id}})
    expect(storedperformer).not.toBeNull();
    expect(storedperformer.nombre).toEqual(newperformer.nombre)
    expect(storedperformer.descripcion).toEqual(newperformer.descripcion)
    
  });

  it('create should return an error for invalid description performer', async () => {
    const performer: PerformerEntity = {
      id: "",
      nombre: faker.company.name(), 
      descripcion: faker.lorem.sentence(), 
      imagen: faker.word.noun(), 
      cancion: new TrackEntity,
      album: new AlbumEntity
    }

     await expect( service.create(performer)).rejects.toHaveProperty("message","La descripcion excede el maximo de caracteres(100)");
    
    
  });

  


  
});
