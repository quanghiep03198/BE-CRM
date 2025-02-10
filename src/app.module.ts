import { CacheModule } from '@nestjs/cache-manager'
import { Module, OnApplicationBootstrap, OnApplicationShutdown, OnModuleInit } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_FILTER } from '@nestjs/core'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { ScheduleModule } from '@nestjs/schedule'
import { ThrottlerModule } from '@nestjs/throttler'
import * as Sentry from '@sentry/nestjs'
import { SentryGlobalFilter, SentryModule } from '@sentry/nestjs/setup'
import { AppController } from './app.controller'
import { FileLogger } from './common/helpers/file-logger.helper'
import { appConfigFactory, validateConfig } from './configs'
import { DatabaseModule } from './databases'
import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/user/user.module'

@Module({
	imports: [
		// * Core Modules
		DatabaseModule,
		CacheModule.registerAsync({
			isGlobal: true,
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => configService.getOrThrow('cache')
		}),
		ConfigModule.forRoot({
			envFilePath: ['.env'],
			isGlobal: true,
			load: [appConfigFactory],
			validate: validateConfig
		}),
		SentryModule.forRoot(),
		ScheduleModule.forRoot(),
		ThrottlerModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => configService.getOrThrow('throttler')
		}),
		EventEmitterModule.forRoot({
			wildcard: false,
			delimiter: '.',
			newListener: false,
			removeListener: false,
			maxListeners: 10,
			verboseMemoryLeak: false,
			ignoreErrors: false
		}),
		// * Feature Modules
		AuthModule,
		UserModule
	],
	controllers: [AppController],
	providers: [
		{
			provide: APP_FILTER,
			useClass: SentryGlobalFilter
		}
	]
})
export class AppModule implements OnModuleInit, OnApplicationBootstrap, OnApplicationShutdown {
	onModuleInit() {
		FileLogger.initialize()
	}
	onApplicationBootstrap() {
		Sentry.profiler.startProfiler()
	}
	onApplicationShutdown() {
		Sentry.profiler.stopProfiler()
	}
}
