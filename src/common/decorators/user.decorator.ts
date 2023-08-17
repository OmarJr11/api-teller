import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserDec = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.getArgs()[2].req.res.req.res.req;
    return request.user;
});
