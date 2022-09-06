import type { NextApiRequest, NextApiResponse } from 'next';

type Res = {
  greeting: string;
}

export default function handler (
  req: NextApiRequest,
  res: NextApiResponse<Res>
) {
  res.json({
    greeting: 'hello there'
  })
}