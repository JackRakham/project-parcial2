import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrackModule } from './track/track.module';
import { PerformerModule } from './performer/performer.module';
import { AlbumModule } from './album/album.module';
import { AlbumPerformerModule } from './album-performer/album-performer.module';

@Module({
  imports: [TrackModule, PerformerModule, AlbumModule, AlbumPerformerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
