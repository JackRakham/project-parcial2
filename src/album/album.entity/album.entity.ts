import { TrackEntity } from 'src/track/track.entity/track.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,ManyToMany } from 'typeorm';
import { PerformerEntity } from 'src/performer/performer.entity/performer.entity';
@Entity()
export class AlbumEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    caratula: string;

    @Column()
    descripcion: string;

    @Column('date')
    lanzamiento: Date;

    @OneToMany(() => TrackEntity, track => track.album)
   tracks: TrackEntity[];

   @OneToMany(()=> PerformerEntity, perfomer=>perfomer.album)
   performers: PerformerEntity[]; 
}
