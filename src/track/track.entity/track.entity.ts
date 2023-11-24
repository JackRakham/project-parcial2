import { AlbumEntity } from 'src/album/album.entity/album.entity';
import { PerformerEntity } from 'src/performer/performer.entity/performer.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,ManyToMany } from 'typeorm';
@Entity()
export class TrackEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    duracion: number;

    @ManyToOne(() => AlbumEntity, album => album.tracks)
   album: AlbumEntity;

   @OneToMany(() => PerformerEntity, performer => performer.cancion)
   performers: PerformerEntity[];
}
