import { NextApiRequest, NextApiResponse } from 'next';

type Slug = {
  slugs: string | string[] | undefined;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Slug>
) {
  res.json({ slugs: req.query.slugs})
}