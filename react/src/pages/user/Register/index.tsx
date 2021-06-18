import React, {useRef, useState} from "react";
import {FormInstance, message} from 'antd';
import ProForm, { ProFormSelect, ProFormText} from '@ant-design/pro-form';
import {
  MobileOutlined,
  MailOutlined,
  UserOutlined,
  KeyOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone
} from '@ant-design/icons';
import styles from './index.less';
import Footer from "@/components/Footer";
import {Link} from "umi";
import {login} from "@/services/ant-design-pro/api";

const Register: React.FC = () => {
  const formRef = useRef<FormInstance>();
  const [submitting, setSubmitting] = useState(false);
  const submitRegister = async (values: API.RegisterParams) =>{
    console.log(values)
    setSubmitting(true);
    // try {
      // 注册
    //   const msg = await login({...values, type});
    //   if (msg.status === 'ok') {
    //     const defaultloginSuccessMessage = intl.formatMessage({
    //       id: 'pages.login.success',
    //       defaultMessage: '登录成功！',
    //     });
    //     message.success(defaultloginSuccessMessage);
    //     await fetchUserInfo();
    //     goto();
    //     return;
    //   }
    //   // 如果失败去设置用户错误信息
    //   setUserLoginState(msg);
    // } catch (error) {
    //   const defaultloginFailureMessage = intl.formatMessage({
    //     id: 'pages.login.failure',
    //     defaultMessage: '登录失败，请重试！',
    //   });
    //
    //   message.error(defaultloginFailureMessage);
    // }
    setSubmitting(false);
  }
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.main}>
          <ProForm
            onFinish={async (values) => {
              await submitRegister(values as API.RegisterParams)
            }}
            formRef={formRef}
            submitter={{
              searchConfig: {
                submitText: '注册',
              },
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
                loading: submitting,
                size: 'middle',
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
                size: 'middle',
                prefix: <UserOutlined className={styles.prefixIcon}/>,
              }}
              name="name"
              allowClear={true}
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
                size: 'middle',
                prefix: <UserOutlined className={styles.prefixIcon}/>,
              }}
              name="username"
              allowClear={true}
              placeholder="请输入用户名（5-12个字符）"
              rules={[
                {
                  required: true,
                  message: '用户名不能为空!',
                },
                {
                  min: 5,
                  message: '用户名长度必须不小于5!',
                },
                {
                  max: 12,
                  message: '用户名长度必须不大于12!',
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
                size: 'middle',
                prefix: <KeyOutlined className={styles.prefixIcon}/>,
                iconRender: function (visible) {
                  return visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                },
              }}
              name='password'
              allowClear={true}
              placeholder="请输入密码（5-20个字符）"
              rules={[
                {
                  required: true,
                  message: '密码不能为空!',
                },
                {
                  min: 5,
                  message: '密码长度必须不小于5!',
                },
                {
                  max: 20,
                  message: '密码长度必须不大于20!',
                },
              ]}
            />
            <ProFormText.Password
              label='确认密码'
              fieldProps={{
                size: 'middle',
                prefix: <KeyOutlined className={styles.prefixIcon}/>,
                iconRender: function (visible) {
                  return visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                },
              }}
              name='check_password'
              allowClear={true}
              placeholder="请再次输入密码"
              transform={(value: any) => ({})}
              rules={[
                {
                  required: true,
                  message: '输入的密码不能为空!',
                },
                {
                  validator: function (rule, value, callback) {
                    const password = formRef?.current?.getFieldValue('password');

                    if(value && password != value)
                      return Promise.reject("两次输入的密码不一致!");
                    else
                      return Promise.resolve();
                  },
                }
              ]}
            />
            <ProFormText
              label='电话'
              fieldProps={{
                size: 'middle',
                prefix: <MobileOutlined className={styles.prefixIcon}/>,
              }}
              name="phone"
              allowClear={true}
              placeholder="请输入手机号"
              rules={[
                {
                  required: true,
                  message: '手机号不能为空!',
                },
                {
                  pattern: /^1\d{10}$/,
                  message: '不合法的手机号格式!',
                },
              ]}
            />
            <ProFormText
              label='邮箱'
              fieldProps={{
                size: 'middle',
                prefix: <MailOutlined className={styles.prefixIcon}/>,
              }}
              name="mail"
              allowClear={true}
              placeholder="请输入邮箱"
              rules={[
                {
                  required: true,
                  message: '邮箱不能为空!',
                },
                {
                  pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                  message: '不合法的邮箱格式!',
                },
              ]}
            />
            <ProFormSelect
              fieldProps={{
                size: 'middle',
              }}
              options={[
                { label: '男', value: '1' },
                { label: '女', value: '0' },
              ]}
              rules={[
                {
                  required: true,
                  message: '请选择你的性别!',
                },
              ]}
              name="gender"
              label="性别"
            />
            <ProFormSelect
              fieldProps={{
                size: 'middle',
              }}
              options={[
                { label: '普通用户', value: '1' },
                { label: '管理员', value: '0' },
              ]}
              rules={[
                {
                  required: true,
                  message: '请选择你的身份!',
                },
              ]}
              name="role"
              label="用户身份"
            />
          </ProForm>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Register;
