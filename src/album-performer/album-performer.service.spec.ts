import { Test, TestingModule } from '@nestjs/testing';
import { AlbumPerformerService } from './album-performer.service';
import { Repository } from 'typeorm';
import { AlbumEntity } from 'src/album/album.entity/album.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PerformerEntity } from 'src/performer/performer.entity/performer.entity';
import { faker } from '@faker-js/faker';
import { TrackEntity } from 'src/track/track.entity/track.entity';
describe('AlbumPerformerService', () => {
  let service: AlbumPerformerService;
  let albumRepository: Repository<AlbumEntity>
  let perfomerRepository: Repository<PerformerEntity>
  let album: AlbumEntity;
  let performersList: PerformerEntity[];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlbumPerformerService],
    }).compile();

    service = module.get<AlbumPerformerService>(AlbumPerformerService);
    albumRepository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity))
    perfomerRepository = module.get<Repository<PerformerEntity>>(getRepositoryToken(PerformerEntity))
  });

  const seedDatabase = async () => {
    perfomerRepository.clear();
    albumRepository.clear();

    performersList = [];
    for(let i = 0; i < 5; i++){
        const performer: PerformerEntity = await perfomerRepository.save({
          nombre: faker.company.name(), 
        description: faker.lorem.sentence(), 
        imagen: faker.word.noun(), 
        
          
        })
        performersList.push(performer);
    }

    album = await albumRepository.save({
      name: faker.company.name(), 
      description: faker.lorem.sentence(), 
      caratula: faker.word.noun(),
      performers: performersList
    })
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addperformeralbum should add an performer to a album', async () => {
    const newPerformer: PerformerEntity = await perfomerRepository.save({
          nombre: faker.person.firstName(),
          descripcion: faker.lorem.word(),
          caratula: faker.lorem.word(),
          tracks: [],
          lanzamiento: faker.date.anytime(),
          performers: []
    });

    const newAlbum: AlbumEntity = await albumRepository.save({
      nombre: faker.person.firstName(),
      descripcion: faker.lorem.word(),
      caratula: faker.lorem.word(),
      tracks: [],
      lanzamiento: faker.date.anytime(),
      performers: []
    })

    const result: AlbumEntity = await service.addPerformerToAlbum(newAlbum.id, newPerformer.id);
    
    expect(result.performers.length).toBe(1);
    expect(result.performers[0]).not.toBeNull();
    expect(result.performers[0].nombre).toEqual(newPerformer.nombre)
    expect(result.performers[0].descripcion).toEqual(newPerformer.descripcion)
  });
  
});
