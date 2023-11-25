import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrackModule } from './track/track.module';
import { PerformerModule } from './performer/performer.module';
import { AlbumModule } from './album/album.module';
import { AlbumPerformerModule } from './album-performer/album-performer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './album/album.entity/album.entity';
import { PerformerEntity } from './performer/performer.entity/performer.entity';
import { TrackEntity } from './track/track.entity/track.entity';


@Module({
  imports: [TrackModule, PerformerModule, AlbumModule, AlbumPerformerModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'music',
      entities: [AlbumEntity,PerformerEntity,TrackEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
