import { Controller, Delete, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ConsumeService } from './consume.service';

@Controller('consume')
export class ConsumeController {
  constructor(private readonly consumeService: ConsumeService) {}

  @Get()
  async listRecords(@Req() req: Request, @Res() res: Response): Promise<Response> {
    const listRecords = await this.consumeService.listRecords();

    return res.json(listRecords);
  }

  @Delete()
  async deleteRecords(@Req() req: Request, @Res() res: Response): Promise<Response> {
    const deleteRecords = await this.consumeService.deleteRecords();

    return res.json(deleteRecords);
  }
}
