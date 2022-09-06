import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { DownOutlined, FileAddOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Tree, Menu, Card, Button, Row, Col, Dropdown, Skeleton, Spin, message, Modal,  Form, Input, Select } from 'antd';
import type { DataNode, EventDataNode, TreeProps } from 'antd/es/tree';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import 'antd/dist/antd.less'

// const treeData: DataNode[] = [
//   {
//     title: 'RENEWABLE AMERICA',
//     key: '001',
//     children: [
//       {
//         title: 'Slate Solar (King City)',
//         key: '0011',
//         children: [
//           {
//             title: '1202 SHAFTER AVE',
//             key: '00111',
//             children: [
//               {
//                 title: 'SVCE Solar Unit (Meter #2314351)',
//                 key: '001111',
//               },
//               {
//                 title: 'SVCE Storage Unit (Meter #876531)',
//                 key: '001112',
//               },
//               {
//                 title: 'Stanford Solar Unit (Meter #8567345)',
//                 key: '001113',
//               },
//             ]
//           },
//         ],
//       },
//       {
//         title: 'Live Oak Solar (Paso Robles)',
//         key: '0012',
//         children: [
//           {
//             title: '1142 BUENA VISTA AVE',
//             key: '00121',
//             children: [
//               {
//                 title: 'BUENA VISTA Solar Unit (Meter #3452344)',
//                 key: '001210'
//               }
//             ]
//           },
//         ],
//       }
//     ],
//   },
// ];

// const menu = (
//   <Menu
//     items={[
//       {
//         label: 'Create a new node',
//         key: 'create',
//       },
//       {
//         label: 'Update this node',
//         key: 'edit',
//       },
//       {
//         label: 'Delete this node',
//         key: 'delete',
//       }
//     ]}
//   />
// );
let treeNodes: DataNode[] = [];

const transformToTree = (arr: any, root = '') => {
  let map: any = {}, last = [root], level = 0;
  map[root] = {};
  let parent, nodeItem;
  arr.forEach((el: any) => {
     parent = root;
     while (level && last[level].length >= el.bcs.length) {
        level--;
     };
     parent = last[level];
     level++;
     last.length = level;
     last.push(el.bcs);
     nodeItem = {
      key: el.id,
      title: el.nodeName,
      nodeType: el.nodeType,
      realID: el.realID,
      active: el.active
    }
     map[el.bcs] = nodeItem;
     map[parent].children = map[parent].children || [];
     map[parent].children.push(nodeItem);
  });
  return map[root].children;
};

const { Option } = Select;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const Home: NextPage = () => {
  const [ selectedId, setSelectedId ] = useState(null);
  const [ loading, setLoading ] = useState(false);
  const [ treeData, setTreeData ] =  useState<DataNode[] | []>([]);
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const router = useRouter();
  const [form] = Form.useForm();
  const { accountID } = router.query;

  useEffect(() => {
    if(accountID) {
      axios.get(`/api/account/hierarchy?accountID=${accountID}`)
      .then((res: any) => {
        const treeNodesData = transformToTree(res.data.data.data);
        setTreeData(treeNodesData);
      })
      .catch(err => {
        setTreeData([]);
      });
    }
  }, [accountID])

  const fetchAccountHierarchy = () => {
    axios.get(`/api/account/hierarchy?accountID=${accountID}`)
      .then((res: any) => {
        const treeNodesData = transformToTree(res.data.data.data);
        setTreeData(treeNodesData);
      })
      .catch(err => {
        setTreeData([]);
      });
  }

  const onRightClickHandler = (event: any) => {
    console.log({event})
  }


  // let result: DataNode[];
  const transformTreeData = (treeData: Object[]) => {
    console.log({treeData})
    let node: any, title: any;
    for(let i = 0; i < treeData.length; i++) {
      node = treeData[i];
      console.log({node})
      if(node.children) {
        transformTreeData(node.children as DataNode[]);
      } else {
        title = node.nodeName;
        // result.push({
        //   ...node,
        //   title: <Dropdown overlay={menu} trigger={['contextMenu']}>{node.title}</Dropdown>
        // })
        // Object.assign(node, {...node, title: <Dropdown overlay={menu} trigger={['contextMenu']}>{node.title}</Dropdown>})
        node['title'] = title;
        node['key'] = node.id;

        treeNodes.push({
          key: node.id,
          title: node.nodeName
        });
      }
    }
  }

  // if(treeData.length) {
  //   transformTreeData(treeData)
  //   console.log({treeData})
  // }

  const onAddNewNode = () => {
    console.log('add....')
  }

  const onDeleteNode = () => {
    console.log('delete....')
  }

  const onSelectNode = (selectedKeys: any) => {
    console.log({selectedKeys})
    setSelectedId(selectedKeys[0]);
  }

  const showModal = () => {
    if(selectedId) {
      setIsModalOpen(true);
    } else {
      message.warning('Please select a account hierarchy node you want to append new node.');
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onCreateNode = () => {
    console.log(form.getFieldsValue());
    form
      .validateFields()
      .then(values => {
        setLoading(true);
        setIsModalOpen(false);
        return axios.post('/api/account', {
          parentID: selectedId,
          ...values
        })
      })
      .then(res => {
        setLoading(false);
        fetchAccountHierarchy();
      })
      .catch(err => {
        setLoading(false);
        message.error('Failed to create node');
        console.error('Failed to create node:', err);
      });
  };

  const onReset = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const onChangeNodeType = () => {

  }


  return (
    <Row style={{marginTop: '2rem'}}>
      <Col span={14} push={5}>
        <Card 
          type="inner"
          title="Account Hierarchy"
          actions={[
            <Button type="text" key="add" onClick={showModal}>Add</Button>,
            <EditOutlined key="edit" />,
            <Button danger type="text" key="delete" onClick={onDeleteNode}>Delete</Button>,
          ]}
        >
          <Spin spinning={loading}>
          {
            treeData.length ? 
              <Tree
              showLine
              switcherIcon={<DownOutlined />}
              // defaultExpandedKeys={['0011']}
              defaultExpandAll
              treeData={treeData}
              selectable
              onSelect={onSelectNode}
              onRightClick={onRightClickHandler}
            /> : <Skeleton />
          }
          </Spin>
        </Card>
      </Col>
      <Modal title="Create node" open={isModalOpen} onOk={onCreateNode} onCancel={onReset}>
        <Form {...layout} form={form} name="control-hooks">
          <Form.Item name="nodeName" label="Node Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="nodeType" label="Type" rules={[{ required: true }]}>
            <Select
              placeholder="Select a type"
              onChange={onChangeNodeType}
              allowClear
            >
              <Option value="Region">Region</Option>
              <Option value="Market">Market</Option>
              <Option value="PortfolioType">PortfolioType</Option>
              <Option value="SupplyContract">SupplyContract</Option>
              <Option value="LoadContract">LoadContract</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Row>
  )
}

export default Home
