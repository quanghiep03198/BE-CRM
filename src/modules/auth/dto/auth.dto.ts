import { z } from 'zod'

export const loginValidator = z.object({
	email: z.string().min(1, { message: 'Email là trường bắt buộc' }),
	password: z.string().min(1, { message: 'Mật khẩu là trường bắt buộc' })
})
export const updateProfileValidator = z.object({
	display_name: z.string().optional()
})

export type LoginDTO = z.infer<typeof loginValidator>
export type UpdateProfileDTO = z.infer<typeof updateProfileValidator>
