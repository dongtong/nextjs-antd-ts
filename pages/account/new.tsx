import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Tree, Menu, Card, Button, Row, Col, Dropdown, Skeleton, Spin, message, Modal,  Form, Input, Select } from 'antd';
import React, { useState } from 'react';
import axios from 'axios';
import { 
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import styles from './new.module.scss';
import Logo from '../../components/common/Logo';

const layout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 15 },
};

const { Option } = Select;

const NewAccount: NextPage = () => {
  const [ loading, setLoading ] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = () => {
    form
    .validateFields()
    .then(values => {
      setLoading(true);
      return axios.post('/api/account/new', { ...values })
    })
    .then(res => {
      setLoading(false);
      router.push(`/?accountID=${res.data.accountID}`)
    })
    .catch(err => {
      setLoading(false);
      message.error('Failed to create account');
    });
  }

  return (
    // <Row style={{marginTop: '2rem'}}>
    //   <Col span={14} push={5}>
    //     <Card 
    //       type="inner"
    //       title="Sign up"
    //     >
    //       <Spin spinning={loading}>
    //         <Form {...layout} form={form} onFinish={onFinish} >
    //           <Form.Item name="accountType" label="Account Type" rules={[{ required: true }]}>
    //             <Select
    //               placeholder="Select a type"
    //               onChange={onChangeAccountType}
    //               allowClear
    //             >
    //               <Option value="Buyer">Buyer</Option>
    //               <Option value="Seller">Seller</Option>
    //             </Select>
    //           </Form.Item>
    //           <Form.Item name="accountName" label="Account Name" rules={[{ required: true }]}>
    //             <Input />
    //           </Form.Item>
    //           <Form.Item name="firstName" label="First Name">
    //             <Input />
    //           </Form.Item>
    //           <Form.Item name="lastName" label="Last Name">
    //             <Input />
    //           </Form.Item>
    //           <Form.Item name="username" label="Username">
    //             <Input />
    //           </Form.Item>
    //           <Form.Item name={['user', 'introduction']} label="Introduction">
    //             <Input.TextArea />
    //           </Form.Item>
    //           <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
    //             <Button type="primary" htmlType="submit">
    //               Submit
    //             </Button>
    //           </Form.Item>
    //         </Form>
    //       </Spin>
    //     </Card>
    //   </Col>
    // </Row>
    <div className={styles['wrapper']}>
      <div className={styles['left']}>
        <div className="d-flex justify-content-center align-content-center flex-1 flex-column">
          <Form
            {...layout}
            name="newAccount"
            className="login-form"
            form={form}
            // initialValues={{
            //   remember: true,
            //   csrfToken: csrfToken,
            // }}
            onFinish={onFinish}
            // action="/api/auth/callback/credentials"
            // method="post"
            style={{
              width: 480,
              padding: 10,
              margin: '0 auto 40px',
              borderRadius: 4,
              background: '#fff',
            }}
            size="large"
          >
            <div className="text-center mb-4">
              <Logo width={150} height={48} />
            </div>
            {/* <Form.Item name="csrfToken">
              <Input type="hidden"></Input>
            </Form.Item> */}
            <Form.Item
              name="accountType"
              label="Account Type"
              rules={[
                {
                  required: true,
                  message: 'Please select account type',
                },
              ]}
            >
              <Select
                placeholder="Select a type"
                // onChange={onChangeAccountType}
                allowClear
              >
                <Option value="Buyer">Buyer</Option>
                <Option value="Seller">Seller</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="accountName"
              label="Account Name"
              rules={[
                {
                  required: true,
                  message: 'Please input account name',
                },
              ]}
            >
              <Input
                placeholder="Account Name"
              />
            </Form.Item>
            <Form.Item
              name="firstName"
              label="First Name"
            >
              <Input
                placeholder="First Name"
              />
            </Form.Item>
            <Form.Item
              name="lastName"
              label="Last Name"
            >
              <Input
                placeholder="Last Name"
              />
            </Form.Item>
            <Form.Item
              name="username"
              label="Username"
            >
              <Input
                placeholder="User Name"
              />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
            >
              <Input
                // prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
            >
              <Input.Password
                // prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              name="passwordConfirmation"
              label="Password Confirmation"
            >
              <Input.Password
                // prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password confirmation"
              />
            </Form.Item>

            <Button
              type="primary"
              block
              htmlType="submit"
              className="login-form-button"
              loading={loading}
            >
              Sign Up
            </Button>
          </Form>
        </div>
        <div className="py-2">
          <strong className="text-primary">CFEX</strong>
          <span> 2022 © All Rights Reserved.</span>
        </div>
      </div>
      <div className={styles['right']}>
        <div className={styles['rightOverlay']} />
        <div className={styles['rightContent']}>
          <div className="ml-4 flex-1">
            <h1 className="pt-0 text-white">
              <Logo width={150} height={48} />
            </h1>
            <p className="description">CFEX streamlines and optimizes the clean energy transactions throughout each hour of the day.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewAccount;