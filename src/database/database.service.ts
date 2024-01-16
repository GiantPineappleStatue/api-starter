import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import mysql from 'mysql2/promise';
import { ConfigService } from '@nestjs/config';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { GetUserDto } from '../user/dto/user.dto';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool!: mysql.Pool;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    this.pool = mysql.createPool({
      host: this.configService.get<string>('DB_HOST'),
      user: this.configService.get<string>('DB_USER'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  async onModuleDestroy() {
    await this.pool.end();
  }

  async selectRows<
    T extends RowDataPacket[] | RowDataPacket[][] | GetUserDto[],
  >(sql: string, params: any[] = []): Promise<T> {
    const [rows] = await this.pool.query<RowDataPacket[] | RowDataPacket[][]>(
      sql,
      params,
    );
    return rows as T;
  }

  async insertUpdateDeleteBool(
    sql: string,
    params: any[] = [],
  ): Promise<ResultSetHeader> {
    const [result] = await this.pool.execute<ResultSetHeader>(sql, params);
    return result;
  }
}
