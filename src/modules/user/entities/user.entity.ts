import { DATABASE_NAME } from '@/databases/constants'
import { BaseAbstractEntity } from '@/modules/_base/base.abstract.entity'
import * as bcrypt from 'bcrypt'
import { Column, Entity, Unique } from 'typeorm'
import { UserRoles } from '../constants'

@Entity({ database: DATABASE_NAME, name: 'users', synchronize: true })
export class UserEntity extends BaseAbstractEntity {
	@Column({ type: 'nvarchar', length: 100 })
	@Unique('unq_idx_email', ['email'])
	email: string

	@Column({ type: 'nvarchar', length: 20 })
	password: string

	@Column({ type: 'nvarchar', length: 100 })
	display_name: string

	@Column({ type: 'enum', enum: UserRoles })
	role: UserRoles

	authenticate(password: string) {
		return bcrypt.compareSync(password, this.password)
	}
}
