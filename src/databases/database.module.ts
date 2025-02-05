import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm'
import { DATABASE_NAME } from './constants'

@Module({
	imports: [
		// * MSSQL Server
		TypeOrmModule.forRootAsync({
			name: DATABASE_NAME,
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
