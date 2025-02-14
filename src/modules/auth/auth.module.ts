import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { UserModule } from '../user/user.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { LocalStrategy } from './strategies/local.strategy'

@Module({
	imports: [
		UserModule,
		JwtModule.registerAsync({
			global: true,
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				return {
					secret: configService.getOrThrow('JWT_SECRET'),
					signOptions: {
						expiresIn: configService.getOrThrow('JWT_EXPIRES')
					}
				}
			}
		})
	],
	controllers: [AuthController],
	providers: [AuthService, LocalStrategy]
})
export class AuthModule {}
