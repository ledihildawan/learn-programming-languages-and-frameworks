import { AppService } from './app.service';
import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('report/income')
export class AppController {
  constructor(private readonly _appService: AppService) {}

  @Get('')
  public getAllXReports() {
    return [];
  }

  @Get(':id')
  public getIncomeReportById() {
    return {};
  }

  @Post('')
  public createReport() {
    return 'create';
  }

  @Put(':id')
  public updateReport() {
    return 'update';
  }

  @Delete(':id')
  public deleteReport() {
    return 'delete';
  }
}
