import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm'
import { DATA_SOURCE, DATABASE_NAME } from './constants'

@Module({
	imports: [
		// * PostgreSQL database connection
		TypeOrmModule.forRootAsync({
			name: DATA_SOURCE,
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				return {
					database: DATABASE_NAME,
					...configService.getOrThrow<TypeOrmModuleAsyncOptions>('database')
				}
			}
		})
	]
})
export class DatabaseModule {}
