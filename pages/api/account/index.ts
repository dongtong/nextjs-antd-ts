import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

type Res = {
  meta: object;
  data?: Array<object>;
}

export default function handler (
  req: NextApiRequest,
  res: NextApiResponse<Res>
) {
  const {
    nodeName,
    nodeType,
    parentID
  } = req.body;

  axios.post('http://sf-app-api.playground.cfexcloud.com/account/hierarchy/node', {
    nodeName,
    nodeType,
    parentID
  })
  .then(response => {
    res.status(200).json({
      meta: {
        code: 200
      }
    });
  })
  .catch(err => {
    res.status(200).json({
      meta: {
        code: 500,
        message: 'Failed to create account hierarchy node'
      }
    });
  });
}