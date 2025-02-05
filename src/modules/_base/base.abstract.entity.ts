import { format } from 'date-fns'
import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export abstract class BaseAbstractEntity {
	@PrimaryGeneratedColumn({ name: 'id', type: 'int' })
	id: number

	@CreateDateColumn({ type: 'datetime', default: format(new Date(), 'yyyy-MM-dd HH:mm:ss') })
	created_at: Date

	@UpdateDateColumn({ type: 'datetime', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
	updated_at: Date
}
