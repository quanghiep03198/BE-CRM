import { CacheService } from '@/cache'
import { ZodValidationPipe } from '@/common/pipes'
import { BadRequestException, Injectable, NotFoundException, UsePipes } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { pick } from 'lodash'
import { UserEntity } from '../user/entities/user.entity'
import { UserService } from '../user/user.service'
import { LoginDTO, loginValidator } from './dto/auth.dto'

@Injectable()
export class AuthService {
	constructor(
		private readonly cacheService: CacheService,
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
		await this.cacheService.set(`token:${userId}`, token, this.TOKEN_CACHE_TTL)
		return { user, token }
	}

	async logout(userId: number) {
		return await this.cacheService.delete(`token:${userId}`)
	}

	async refreshToken(userId: number) {
		const user = await this.userService.findOneById(userId)
		if (!user) throw new NotFoundException('User could not be found')
		const refreshToken = await this.jwtService.signAsync(pick(user, ['id', 'username', 'employee_code', 'role']))
		await this.cacheService.set(`token:${userId}`, refreshToken, this.TOKEN_CACHE_TTL)
		return refreshToken
	}
}
