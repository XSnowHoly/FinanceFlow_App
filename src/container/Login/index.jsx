import { List, Input, Button } from 'zarm';
import CustomIcon from '@/components/CustomIcon';
import s from './style.module.less';

const Login = () => {
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
            <Input label="账号" placeholder="请输入您的账号" />
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
            <Input label="密码" type="password" placeholder="请输入您的密码" />
          </List.Item>
        </List>
        <Button className={s.btn} block theme="primary">
          登录
        </Button>
      </div>
    </div>
  );
};

export default Login;
