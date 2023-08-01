import { Controller, Req, Get, Delete, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ConsumeService } from './consume.service';
import { BadRequestException } from '@nestjs/common/exceptions';

@Controller('consume')
export class ConsumeController {
  constructor(private readonly consumeService: ConsumeService) {}

  @Get()
  async listRecords(@Req() req: Request, @Res() res: Response): Promise<Response> {
    if (!req.query?.topic)
      throw new BadRequestException('Inform the topic in the request query using the topic parameter');

    const listRecords = await this.consumeService.listRecords(req.query.topic as unknown as string);

    return res.json(listRecords);
  }

  @Delete()
  async deleteRecords(@Req() req: Request, @Res() res: Response): Promise<Response> {
    const deleteRecords = await this.consumeService.deleteRecords();

    return res.json(deleteRecords);
  }
}
