import { NextApiRequest, NextApiResponse } from 'next';

type Res = {
  message: string;
};

const handler = (
  req: NextApiRequest, 
  res: NextApiResponse
) => {
  res.status(200).json({ message: 'OK'})
}

const withAuth = (handlerFn: Function) => (
  req: NextApiRequest, 
  res: NextApiResponse
) => {
  if(!req.headers.authorization) {
    return res.status(401).json({ message: 'Unauthorized'})
  }

  return handlerFn(req, res);
}

export default withAuth(handler);