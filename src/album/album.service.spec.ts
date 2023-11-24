import { Test, TestingModule } from '@nestjs/testing';
import { AlbumService } from './album.service';
import { AlbumEntity } from './album.entity/album.entity';
import { faker } from '@faker-js/faker';
import { Repository } from 'typeorm';

describe('AlbumService', () => {
  let service: AlbumService;

  let repository: Repository<AlbumEntity>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlbumService],
    }).compile();

    service = module.get<AlbumService>(AlbumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create should return a new album', async () => {
    const album: AlbumEntity = {
      id: "",
      nombre: faker.person.firstName(),
      descripcion: faker.lorem.word(),
      caratula: faker.lorem.word(),
      tracks: [],
      lanzamiento: faker.date.anytime(),
      performers: []
    }
    

    const newUser: AlbumEntity = await service.create(album);
    expect(newUser).not.toBeNull();

    const storedalbum: AlbumEntity = await repository.findOne({where: {id: newUser.id}})
    expect(storedalbum).not.toBeNull();
    expect(storedalbum.nombre).toEqual(newUser.nombre)
    expect(storedalbum.descripcion).toEqual(newUser.descripcion)
    
  });
});
