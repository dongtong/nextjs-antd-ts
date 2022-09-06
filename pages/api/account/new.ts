import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    accountName,
    accountType,
    firstName,
    lastName,
    username,
    email
  } = req.body;

  axios.post('http://sf-app-api.playground.cfexcloud.com/account', {
    accountName,
    accountType,
    firstName,
    lastName,
    username,
    email
  })
  .then(response => {
    res.status(200).json({ accountID: response.data.data.accountID });
  })
  .catch(err => {
    res.status(200).json({
      meta: {
        code: 500,
        message: 'Failed to create account'
      }
    });
  });
}