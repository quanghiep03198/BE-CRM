import { Logger, RequestMethod, VersioningType } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import * as compression from 'compression'
import * as express from 'express'
import helmet from 'helmet'
import * as morgan from 'morgan'
import { AppModule } from './app.module'
import './instrument'

const requestLogger = new Logger('HTTP')
const serverLogger = new Logger('Server')

async function bootstrap() {
	try {
		const app = await NestFactory.create(AppModule, { abortOnError: false })
		const configService = app.get(ConfigService)
		app.setGlobalPrefix('/api/v1', { exclude: [{ path: '/', method: RequestMethod.GET }] })
		app.enableVersioning({ type: VersioningType.URI })
		app.enableCors()
		app.use(helmet())
		app.use(express.json({ limit: '50mb' }))
		app.use(express.urlencoded({ limit: '50mb', extended: true }))
		app.use(
			morgan('dev', {
				stream: {
					write: (str) => requestLogger.log(str.replace(/\n$/, ''), 'HTTP')
				}
			})
		)
		app.use(
			compression({
				level: 6,
				threshold: 10 * 1024
			})
		)
		await app.listen(+configService.get('PORT'), configService.get('HOST'), async () => {
			const URL = await app.getUrl()
			serverLogger.log(URL, 'Server')
		})
	} catch (error) {
		serverLogger.error(error)
	}
}

bootstrap()
