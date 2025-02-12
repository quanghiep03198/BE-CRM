import { DATA_SOURCE } from '@/databases/constants'
import { ConflictException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { stringify } from 'node:querystring'
import { Repository } from 'typeorm'
import { BaseAbstractService } from '../_base/base.abstract.service'
import { CreateUserDTO } from './dto/user.dto'
import { UserEntity } from './entities/user.entity'

type AvatarGenerateOptions = {
	name: string
	background?: string
	color?: string
	length?: number
	bold?: boolean
	format?: 'svg' | 'png'
}

@Injectable()
export class UserService extends BaseAbstractService<UserEntity> {
	constructor(@InjectRepository(UserEntity, DATA_SOURCE) private readonly userRepository: Repository<UserEntity>) {
		super(userRepository)
	}

	async createUser(payload: CreateUserDTO) {
		const user = await this.userRepository.findOneBy({ email: payload.email })
		if (user) throw new ConflictException('Email đã tồn tại')
		return await this.insertOne(payload)
	}

	async getProfile(id: number): Promise<Partial<UserEntity>> {
		const user = await this.userRepository
			.createQueryBuilder('u')
			.select(['u.id', 'u.email', 'u.display_name', 'u.role'])
			.where('u.id = :id', { id })
			.getRawOne()

		return { ...user, picture: this.generateAvatar({ name: user.display_name }) }
	}

	async findOneByEmail(email: string): Promise<UserEntity> {
		return await this.userRepository.findOneBy({ email })
	}

	private generateAvatar({
		background = '#525252',
		color = '#fafafa',
		length = 1,
		bold = true,
		format = 'svg',
		name
	}: AvatarGenerateOptions) {
		const BASE_AVATAR_URL = 'https://ui-avatars.com/api/'
		return (
			BASE_AVATAR_URL +
			'?' +
			stringify({
				background,
				color,
				length,
				bold,
				format,
				name
			})
		)
	}
}
