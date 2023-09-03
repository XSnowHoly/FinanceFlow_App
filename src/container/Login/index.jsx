import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, Input, Button } from 'zarm';
import CustomIcon from '@/components/CustomIcon';
import s from './style.module.less';
import { post } from '@/utils'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onLogin = async () => {
    setLoading(true);
    const res = await post('/api/user/login', {username, password}).catch(() => {
      setLoading(false);
    });
    if(res && res.data) {
      localStorage.setItem('token', res.data.token);
      // 跳转到首页
      navigate('/');
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Login</h1>
      <div className={s.container}>
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
              type="password"
              placeholder="请输入您的密码"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </List.Item>
        </List>
        <Button onClick={onLogin} loading={loading} className={s.btn} block theme="primary">
          登录
        </Button>
      </div>
    </div>
  );
};

export default Login;
