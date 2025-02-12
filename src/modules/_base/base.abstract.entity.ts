import { format } from 'date-fns'
import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export abstract class BaseAbstractEntity {
	@PrimaryGeneratedColumn({ name: 'id', type: 'int' })
	id: number

	@CreateDateColumn({ name: 'created_at', type: 'timestamp', default: format(new Date(), 'yyyy-MM-dd HH:mm:ss') })
	created_at: Date

	@UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
	updated_at: Date
}
