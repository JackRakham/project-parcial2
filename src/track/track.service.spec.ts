import { Test, TestingModule } from '@nestjs/testing';
import { TrackService } from './track.service';
import { TrackEntity } from './track.entity/track.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker';
import { AlbumEntity } from 'src/album/album.entity/album.entity';
describe('TrackService', () => {
  let service: TrackService;
  let repository: Repository<TrackEntity>;
  let tracksList: TrackEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [TrackService],
    }).compile();

    service = module.get<TrackService>(TrackService);
    repository = module.get<Repository<TrackEntity>>(getRepositoryToken(TrackEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    tracksList = [];
    for(let i = 0; i < 5; i++){
        const track: TrackEntity = await repository.save({
        nombre: faker.music.songName(), 
        duracion: faker.number.int(), 
        performers: []})
        tracksList.push(track);
    }
  }
    
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all tracks', async () => {
    const tracks: TrackEntity[] = await service.findAll();
    expect(tracks).not.toBeNull();
    expect(tracks).toHaveLength(tracksList.length);
  });

  it('findOne should return a track by id', async () => {
    const storedTrack: TrackEntity = tracksList[0];
    const track: TrackEntity = await service.findOne(storedTrack.id);
    expect(track).not.toBeNull();
    expect(track.nombre).toEqual(storedTrack.nombre)
    
  });

  it('findOne should throw an exception for an invalid track', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "The track with the given id was not found")
  });

  it('create should return a new track', async () => {
    
    
    const track: TrackEntity = {
      id: "",
      nombre: faker.music.songName(), 
      duracion: faker.number.int(), 
      performers: [],
      album: new AlbumEntity()
    }

    const newtrack: TrackEntity = await service.create("1",track);
    expect(newtrack).not.toBeNull();

    const storedTrack: TrackEntity = await repository.findOne({where: {id: newtrack.id}})
    expect(storedTrack).not.toBeNull();
    expect(storedTrack.nombre).toEqual(newtrack.nombre)
    expect(storedTrack.duracion).toEqual(newtrack.duracion)
  });

  it('create should return a an error for negative duration', async () => {
    
    const track: TrackEntity = {
      id: "",
      nombre: faker.music.songName(), 
      duracion: -1, 
      performers: [],
      album: new AlbumEntity()
    }

    await expect(service.create("1",track)).rejects.toHaveProperty("message","La duración debe ser positiva");
  });


  it('create should return a an error for negative duration', async () => {
    
    const track: TrackEntity = {
      id: "",
      nombre: faker.music.songName(), 
      duracion: -1, 
      performers: [],
      album: null
    }

    await expect(service.create("1",track)).rejects.toHaveProperty("message","El abum asociado debe existir");
  });

  
 
  

  
});
