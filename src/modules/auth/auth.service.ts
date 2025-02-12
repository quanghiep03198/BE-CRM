import { ZodValidationPipe } from '@/common/pipes'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { BadRequestException, Inject, Injectable, NotFoundException, UsePipes } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Cache } from 'cache-manager'
import { pick } from 'lodash'
import { UserEntity } from '../user/entities/user.entity'
import { UserService } from '../user/user.service'
import { LoginDTO, loginValidator } from './dto/auth.dto'

@Injectable()
export class AuthService {
	constructor(
		@Inject(CACHE_MANAGER) private cacheManager: Cache,
		private readonly jwtService: JwtService,
		private readonly userService: UserService
	) {}

	private TOKEN_CACHE_TTL = 60 * 1000 * 60 + 30 * 1000

	@UsePipes(new ZodValidationPipe(loginValidator))
	async validateUser(payload: LoginDTO) {
		const user = await this.userService.findOneByEmail(payload.email)
		if (!user) throw new NotFoundException('Tài khoản không tồn tại')
		if (!user.authenticate(payload.password)) throw new BadRequestException('Mật khẩu không chính xác')
		return user
	}

	async login(payload: UserEntity) {
		const userId = payload.id
		const user = await this.userService.getProfile(userId)
		const token = await this.jwtService.signAsync(pick(user, ['id', 'username', 'employee_code', 'role']))
		await this.cacheManager.set(`token:${userId}`, token, this.TOKEN_CACHE_TTL)
		return { user, token }
	}

	async logout(userId: number) {
		return await this.cacheManager.del(`token:${userId}`)
	}

	async refreshToken(userId: number) {
		const user = await this.userService.findOneById(userId)
		if (!user) throw new NotFoundException('User could not be found')
		const refreshToken = await this.jwtService.signAsync(pick(user, ['id', 'username', 'employee_code', 'role']))
		await this.cacheManager.set(`token:${userId}`, refreshToken, this.TOKEN_CACHE_TTL)
		return refreshToken
	}
}
