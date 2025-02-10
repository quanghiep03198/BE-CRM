import { DATA_SOURCE } from '@/databases/constants'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './entities/user.entity'
import { UserEntitySubscriber } from './subscribers/user.subscriber'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity], DATA_SOURCE)],
	controllers: [UserController],
	providers: [UserService, UserEntitySubscriber],
	exports: [UserService]
})
export class UserModule {}
