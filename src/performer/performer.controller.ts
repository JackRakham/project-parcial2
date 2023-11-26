import { Controller } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptos/business-errors/business-errors.interceptor';
import { Body, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import {plainToInstance } from 'class-transformer';

import { PerformerEntity } from './performer.entity/performer.entity';
import { PerformerDto } from './performer.dto/performer.dto';
import { PerformerService } from './performer.service';
@Controller('performers')
export class PerformerController {
    constructor(private readonly performerService:PerformerService) {}
    @Get()
  async findAll() {
    return await this.performerService.findAll();
  }

  @Get(':performerId')
  async findOne(@Param('performerId') performerId: string) {
    return await this.performerService.findOne(performerId);
  }

  @Post()
  async create(@Body() performerDto: PerformerDto) {
    const performer: PerformerEntity = plainToInstance(PerformerEntity, performerDto);
    return await this.performerService.create(performer);
  }
}
