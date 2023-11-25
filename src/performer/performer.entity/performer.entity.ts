import { AlbumEntity } from 'src/album/album.entity/album.entity';
import { TrackEntity } from 'src/track/track.entity/track.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,ManyToMany } from 'typeorm';
@Entity()
export class PerformerEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;
    @Column()
    imagen: string;

    @Column()
    descripcion: string;

    @ManyToOne(() => TrackEntity, track => track.performers)
   cancion: TrackEntity;

   @ManyToOne(()=> AlbumEntity, album => album.performers)
   album: AlbumEntity;
}
