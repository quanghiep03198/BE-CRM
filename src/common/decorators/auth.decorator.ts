import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard'
import { applyDecorators, UseGuards } from '@nestjs/common'

import { UserRoles } from '@/modules/user/constants'
import { Roles } from './roles.decorator'

export const AuthGuard = (...roles: Array<UserRoles>) => {
	return applyDecorators(UseGuards(JwtAuthGuard), Roles(...roles))
}
