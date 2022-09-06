import { NextApiRequest, NextApiResponse } from 'next';

type Slug = {
  slug: string | string[] | undefined;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Slug>
) {
  res.json({ slug: req.query.slug})
}