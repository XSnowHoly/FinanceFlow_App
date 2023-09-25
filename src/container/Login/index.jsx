import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, Input, Button, Toast } from 'zarm';
import CustomIcon from '@/components/CustomIcon';
import Captcha from "@/components/Captcha"
import s from './style.module.less';
import { post } from '@/utils';

const Login = () => {
  const [formType, setFormType] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verify, setVerify] = useState(''); // 验证码
  const [initCaptcha, setInitCaptcha] = useState('');
  const [loading, setLoading] = useState(false);
  const captchaRef = useRef(null);
  const navigate = useNavigate();

  const onLogin = async () => {
    setLoading(true);

    if(verify !== initCaptcha) {
      Toast.show('验证码错误');
      captchaRef.current.refreshCaptcha();
      setLoading(false);
      return;
    }

    const res = await post('/api/user/login', { username, password }).catch(
      () => {
        setLoading(false);
      },
    );
    if (res && res.data) {
      localStorage.setItem('token', res.data.token);
      Toast.show(res.msg);
      setTimeout(() => {
        // 跳转到首页
        navigate('/');
      }, 500);
    }
    setLoading(false);
  };

  const onRegister = async () => {
    setLoading(true);

    if(verify !== initCaptcha) {
      Toast.show('验证码错误');
      captchaRef.current.refreshCaptcha();
      setLoading(false);
      return;
    }

    const res = await post('/api/user/register', { username, password }).catch(
      () => {
        setLoading(false);
      },
    );
    if (res && res.code === 200) {
      Toast.show(res.msg);
      setTimeout(() => {
        setFormType('login');
      }, 2000);
    }
    setLoading(false);
  };

  // 登录或注册切换时重置面板
  useEffect(() => {
    setUsername('');
    setPassword('');
  }, [formType]);

  return (
    <div>
      <div className={s.header}></div>
      <div className={s.container}>
        <div className={s.typeBox}>
          <span
            className={formType === 'login' ? s.active : ''}
            onClick={() => {
              setFormType('login');
            }}
          >
            登录
          </span>
          <span
            className={formType === 'register' ? s.active : ''}
            onClick={() => {
              setFormType('register');
            }}
          >
            注册
          </span>
        </div>
        <List>
          <List.Item
            prefix={
              <CustomIcon
                type="account"
                theme="primary"
                style={{ fontSize: 24 }}
              />
            }
            description="最少4个字符，包含大小写英文字母和数字"
          >
            <Input
              label="账号"
              placeholder="请输入您的账号"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </List.Item>
          <List.Item
            prefix={
              <CustomIcon
                type="password"
                theme="primary"
                style={{ fontSize: 24 }}
              />
            }
            description="最少8个字符，包含大小写英文字母、数字和字符"
          >
            <Input
              label="密码"
              type='password'
              placeholder="请输入密码"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </List.Item>
          <List.Item
            prefix={
              <CustomIcon
                type="password"
                theme="primary"
                style={{ fontSize: 24 }}
              />
            }
          >
            <Input
              clearable
              type="text"
              label="验证码"
              placeholder="请输入验证码"
              onChange={(e) => setVerify(e.target.value)}
            />
            <Captcha ref={captchaRef} charNum={4} onChange={setInitCaptcha} />
          </List.Item>
        </List>
        {formType === 'login' && (
          <Button
            onClick={onLogin}
            loading={loading}
            className={s.btn}
            block
            theme="primary"
          >
            登录
          </Button>
        )}

        {formType === 'register' && (
          <Button
            onClick={onRegister}
            loading={loading}
            className={s.btn}
            block
            theme="primary"
          >
            注册
          </Button>
        )}
      </div>
    </div>
  );
};

export default Login;
