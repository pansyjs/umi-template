import { Request, Response } from 'express';
import { packResult } from './utils';

function fetchCurrentUser(req: Request, res: Response) {
  const authorization = req.headers?.authorization;
  const token = authorization?.split(' ')?.[1];

  if (token !== 'admin' && token !== 'user') {
    res.status(401).send(packResult({ data: {}, code: 401 }));
  }

  res.send(
    packResult({
      data: {
        name: 'Serati Ma',
        age: 13
      }
    })
  );
}

function fetchLogin(req: Request, res: Response) {
  const { password, username, type } = req.body;
  console.log(req.body);
  if (password === '123456' && username === 'admin') {
    res.send(packResult({ data: { type, token: 'admin' } }));
    return;
  }
  if (password === '123456' && username === 'user') {
    res.send(
      packResult({
        data: { type, token: 'user' }
      })
    );
    return;
  }
  if (type === 'mobile') {
    res.send(
      packResult({
        data: { type, token: 'admin' }
      })
    );
    return;
  }

  res.send(
    packResult({
      data: {
        type
      },
      code: 10010,
      message: '用户名或密码不正确'
    })
  );
}

export default {
  'POST /api/user/login': fetchLogin,
  'GET /api/user/current': fetchCurrentUser
};
