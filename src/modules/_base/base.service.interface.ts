import { DeepPartial, DeleteResult, InsertResult, UpdateResult } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { BaseAbstractEntity } from './base.abstract.entity'

export interface IBaseService<Entity extends BaseAbstractEntity> {
	insertOne(payload: DeepPartial<Entity>): Promise<Entity>
	insertMany(payload: DeepPartial<Entity>[]): Promise<InsertResult>
	findAll(): Promise<Entity[]>
	findOneById(id: number): Promise<Entity>
	updateOneById(id: number, partialEntity: QueryDeepPartialEntity<Entity>): Promise<UpdateResult>
	deletOneById(id: number): Promise<DeleteResult>
}
