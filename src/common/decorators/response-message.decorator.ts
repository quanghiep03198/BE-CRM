import { SetMetadata } from '@nestjs/common'

/**
 * @description Decorator trả message về theo response body
 */
export const ResponseMessageKey = 'RESPONSE_MESSAGE_KEY' as const
export const ResponseMessage = (arg: string) => SetMetadata(ResponseMessageKey, arg)
