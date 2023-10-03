import { rest } from 'msw';

export const handlers = [
  rest.post('/login', (req: any, res: any, ctx: any) => {
    console.log(req);
    if (
      req.body.email === 'tanhao@gmail.com' &&
      req.body.password === '12345'
    ) {
      return res(
        ctx.status(200),
        ctx.json({
          message: 'Login successfully',
        })
      );
    }

    return res(ctx.status(200));
  }),

  rest.get('/user', (req, res, ctx) => {
    const isAuthenticated = localStorage.getItem('is-authenticated');

    if (!isAuthenticated) {
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Not authorized',
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        username: 'admin',
      })
    );
  }),
];
