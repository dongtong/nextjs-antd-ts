import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { DownOutlined } from '@ant-design/icons';
import { Tree, Card, Row, Col } from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';
import React from 'react';
// import 'antd/dist/antd.less'

const treeData: DataNode[] = [
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
];

const Home: NextPage = () => {
  return (
    <Row style={{marginTop: '2rem'}}>
      <Col span={14} push={5}>
        <Card type="inner" title="Account Hierarchy">
          <Tree
            showLine
            switcherIcon={<DownOutlined />}
            // defaultExpandedKeys={['0011']}
            defaultExpandAll
            treeData={treeData}
          />
        </Card>
      </Col>
    </Row>
  )
}

export default Home
