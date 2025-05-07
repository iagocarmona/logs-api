import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { LogFiltersDto } from './dto/log-filters.dto';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  /**
   * Retorna logs da tabela SystemEvents.
   * Se for passado um nome de host, filtra por ele.
   * @param host Nome do host opcional
   */
  async getLogs(filters: LogFiltersDto = {}) {
    const {
      host,
      priority,
      fromDate,
      toDate,
      eventSource,
      page = 1,
      limit = 50,
    } = filters;

    const where = {
      ...(host && { FromHost: host }),
      ...(priority && { Priority: priority }),
      ...(eventSource && { EventSource: eventSource }),
      ...(fromDate || toDate
        ? {
            ReceivedAt: {
              ...(fromDate && { gte: fromDate }),
              ...(toDate && { lte: toDate }),
            },
          }
        : {}),
    };

    const [logs, total] = await Promise.all([
      this.prisma.systemEvents.findMany({
        where,
        orderBy: { ReceivedAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.systemEvents.count({ where }),
    ]);

    return {
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      data: logs,
    };
  }

  /**
   * Retorna os últimos 10 logs registrados, de todos os hosts.
   */
  async getLatestLogs() {
    return this.prisma.systemEvents.findMany({
      orderBy: { ReceivedAt: 'desc' },
      take: 10,
    });
  }
}
