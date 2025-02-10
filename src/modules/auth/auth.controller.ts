import { AuthGuard, HttpMethod, Route, User } from '@/common/decorators'
import { Controller, Param, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local-auth.guard'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Route({
		endpoint: 'login',
		method: HttpMethod.POST
	})
	@UseGuards(LocalAuthGuard)
	async login(@User() user) {
		return await this.authService.login(user)
	}

	@Route({
		endpoint: 'refresh-token/:id',
		method: HttpMethod.GET
	})
	async refreshToken(@Param('id') id: number) {
		return await this.authService.refreshToken(id)
	}

	@Route({
		endpoint: 'logout',
		method: HttpMethod.POST
	})
	@AuthGuard()
	async logout(@User('id') userId) {
		return await this.authService.logout(userId)
	}
}
