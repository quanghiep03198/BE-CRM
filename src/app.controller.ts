import { Controller, Get, Res } from '@nestjs/common'
import { Response } from 'express'

@Controller()
export class AppController {
	constructor() {}

	@Get()
	index(@Res() res: Response) {
		return res.redirect('https://documenter.getpostman.com/view/24228770/2sAYX9mzkJ')
	}
}
