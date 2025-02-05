import { Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

export const REDIS_CACHE = 'REDIS_CACHE' as const

@Global()
@Module({
	providers: [
		{
			provide: REDIS_CACHE,
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => configService.getOrThrow('cache')
		}
	],
	exports: [REDIS_CACHE]
})
export class CacheModule {}
