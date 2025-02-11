import { env } from '@/common/utils'
import { UserRoles } from '@/modules/user/constants'
import { UserEntity } from '@/modules/user/entities'
import { Logger } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { DataSource } from 'typeorm'
import { Seeder } from 'typeorm-extension'

export class UserSeeder implements Seeder {
	track = false

	public async run(dataSource: DataSource): Promise<any> {
		try {
			const repository = dataSource.getRepository(UserEntity)

			const data = new Array(1).fill(null).map(() => {
				const sampleData = new UserEntity({
					email: 'quanghiep03198@gmail.com',
					password: bcrypt.hashSync(
						'password',
						env('BCRYPT_SALT_ROUNDS', { serialize: (value) => parseInt(value) })
					),
					display_name: 'Admin',
					role: UserRoles.CNBM
				})
				return sampleData
			})

			await repository.insert(data)
		} catch (error) {
			Logger.error(error)
		}
	}
}
