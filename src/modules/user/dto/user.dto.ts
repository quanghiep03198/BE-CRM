import z from 'zod'

export const createUserDTO = z.object({
	email: z.string().email(),
	password: z.string(),
	display_name: z.string()
})

export type CreateUserDTO = z.infer<typeof createUserDTO>
