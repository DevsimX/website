import React from "react";
import {message} from 'antd';
import ProForm, {ProFormText, ProFormCaptcha} from '@ant-design/pro-form';
import {MobileOutlined, MailOutlined, UserOutlined, KeyOutlined} from '@ant-design/icons';
import styles from './index.less';
import Footer from "@/components/Footer";
import {Link} from "umi";

const Register: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.main}>
          <ProForm
            onFinish={async () => {
            }}
            submitter={{
              searchConfig: {
                submitText: '登录',
              },
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
                size: 'large',
                style: {
                  width: '100%',
                },
              },
            }}
          >
            <div className={styles.top}>
              <div className={styles.header}>
                <Link to="/">
                  <img alt="logo" className={styles.logo} src="/logo.svg"/>
                  <span className={styles.title}>用户注册</span>
                </Link>
              </div>
              <div className={styles.desc}>
              </div>
            </div>
            <ProFormText
              label='昵称'
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon}/>,
              }}
              name="name"
              placeholder="请输入昵称"
              rules={[
                {
                  required: true,
                  message: '昵称不能为空!',
                }
              ]}
            />
            <ProFormText
              label='用户名'
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon}/>,
              }}
              name="username"
              placeholder="请输入用户名（5-12个字符）"
              rules={[
                {
                  required: true,
                  message: '用户名不能为空!',
                },
                {
                  min: 5,
                  message: '用户名长度必须大于5!',
                },
                {
                  max: 12,
                  message: '用户名长度必须小于12!',
                },
                {
                  pattern: /^[A-Za-z0-9]+$/,
                  message: '用户名只能包含字母和数字!',
                }
              ]}
            />
            <ProFormText.Password
              label='密码'
              fieldProps={{
                size: 'large',
                prefix: <KeyOutlined className={styles.prefixIcon}/>,
              }}
              name='password'
              placeholder="请输入密码（5-20个字符）"
              rules={[
                {
                  required: true,
                  message: '请输入密码!',
                },
              ]}
            />
            <ProFormText
              label='电话'
              fieldProps={{
                size: 'large',
                prefix: <MobileOutlined className={styles.prefixIcon}/>,
              }}
              name="phone"
              placeholder="请输入手机号"
              rules={[
                {
                  required: true,
                  message: '请输入手机号!',
                },
                {
                  pattern: /^1\d{10}$/,
                  message: '不合法的手机号格式!',
                },
              ]}
            />
            <ProFormCaptcha
              fieldProps={{
                size: 'large',
                prefix: <MailOutlined/>,
              }}
              captchaProps={{
                size: 'large',
              }}
              phoneName="phone"
              name="captcha"
              rules={[
                {
                  required: true,
                  message: '请输入验证码',
                },
              ]}
              placeholder="请输入验证码"
              onGetCaptcha={async (phone) => {
                message.success(`手机号 ${phone} 验证码发送成功!`);
              }}
            />
          </ProForm>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Register;
