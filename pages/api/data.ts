// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  meta: object;
  data: Array<object>;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
    meta: {
      code: 200
    },
    data: [
      {
        title: 'RENEWABLE AMERICA',
        key: '001',
        children: [
          {
            title: 'Slate Solar (King City)',
            key: '0011',
            children: [
              {
                title: '1202 SHAFTER AVE',
                key: '00111',
                children: [
                  {
                    title: 'SVCE Solar Unit (Meter #2314351)',
                    key: '001111',
                  },
                  {
                    title: 'SVCE Storage Unit (Meter #876531)',
                    key: '001112',
                  },
                  {
                    title: 'Stanford Solar Unit (Meter #8567345)',
                    key: '001113',
                  },
                ]
              },
            ],
          },
          {
            title: 'Live Oak Solar (Paso Robles)',
            key: '0012',
            children: [
              {
                title: '1142 BUENA VISTA AVE',
                key: '00121',
                children: [
                  {
                    title: 'BUENA VISTA Solar Unit (Meter #3452344)',
                    key: '001210'
                  }
                ]
              },
            ],
          }
        ],
      },
    ]
  })
}
