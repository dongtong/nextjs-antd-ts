import { NextApiRequest, NextApiResponse } from 'next';

type Res = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Res>
) {
  const { method } = req;
  if(method === 'GET') {
    res.status(200).json({ message: 'GET'});
  }

  if(method === 'POST') {
    res.status(200).json({ message: 'POST'});
  }

  if(method === 'PUT') {
    res.status(200).json({ message: 'PUT'});
  }

  if(method === 'DELETE') {
    res.status(200).json({ message: 'DELETE'});
  }

  if(method === 'PATCH') {
    res.status(200).json({ message: 'PATCH'});
  }

  res.status(404).json({ message: 'Not found method'});
}