import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { LogFiltersDto } from './dto/log-filters.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('logs')
  getLogs(@Query() filters: LogFiltersDto) {
    return this.appService.getLogs(filters);
  }

  @Get('logs/latest')
  getLatestLogs() {
    return this.appService.getLatestLogs();
  }
}
