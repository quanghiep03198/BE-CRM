import { Logger } from '@nestjs/common'
import { runSeeders } from 'typeorm-extension'
import dataSource from './data-source'
import { UserSeeder } from './seeds'

const logger = new Logger('Seeder')

const bootstrap = async () => {
	try {
		logger.log('Running seeders...')
		await dataSource.initialize()
		await runSeeders(dataSource, { seeds: [UserSeeder] })
		logger.log('Seeders executed successfully')
	} catch (error) {
		logger.error(error)
	} finally {
		process.exit()
	}
}

bootstrap()
