import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { Request, Response } from 'express';
import { PublishService } from './publish.service';

@Controller('publish')
export class PublishController {
  constructor(private readonly publishService: PublishService) {}

  @Get()
  async find(@Req() req: Request, @Res() res: Response): Promise<Response> {
    const find = await this.publishService.find();

    return res.json(find);
  }

  @Post()
  async publish(@Req() req: Request, @Res() res: Response): Promise<Response> {
    if (!req.body?.objectJSON)
      throw new BadRequestException('Send the data in the body of the request using the objectJSON parameter');

    const publish = await this.publishService.publish(req.body.objectJSON);

    return res.json(publish);
  }
}
