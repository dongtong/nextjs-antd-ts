// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

type Data = {
  meta: object;
  data?: Array<object>;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  axios.get(`http://sf-app-api.playground.cfexcloud.com/account/hierarchy/data?accountID=${req.query.accountID}`)
  .then(response => {
    res.status(200).json({
      meta: {
        code: 200
      },
      data: response.data
    });
  })
  .catch(err => {
    res.status(200).json({
      meta: {
        code: 500,
        message: 'Failed to get account hierarchy'
      }
    });
  });
}
