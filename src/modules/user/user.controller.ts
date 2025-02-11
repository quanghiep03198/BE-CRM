import { AuthGuard, HttpMethod, Route, User } from '@/common/decorators'
import { ZodValidationPipe } from '@/common/pipes'
import { Body, Controller, HttpStatus } from '@nestjs/common'
import { UserRoles } from './constants'
import { CreateUserDTO, createUserDTO } from './dto/user.dto'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Route({
		endpoint: 'create-user',
		method: HttpMethod.POST,
		statusCode: HttpStatus.CREATED,
		message: 'Thêm người dùng thành công'
	})
	@AuthGuard(UserRoles.CNBM)
	async createUser(@Body(new ZodValidationPipe(createUserDTO)) payload: CreateUserDTO) {
		return this.userService.createUser(payload)
	}

	@Route({
		endpoint: 'profile',
		method: HttpMethod.GET,
		message: 'Ok'
	})
	async getProfile(@User('id') userId: number) {
		return await this.userService.getProfile(userId)
	}
}
