import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const User = createParamDecorator((property, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest()
	const user = request.user
	if (!user) {
		return null
	}
	return property ? user[property] : user
})
