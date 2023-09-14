import { useForm, Controller } from 'react-hook-form';
import Header from '@/components/Header';
import { post } from 'utils';
import { List, Input, Button, Toast } from 'zarm';
import s from './style.module.less';
import { useEffect } from 'react';

const ModifyPassword = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  // 提交修改方法
  const onSubmit = async (data) => {
    const { oldPassword, newPassword, confirmPassword } = data;
    if (confirmPassword != newPassword) {
      Toast.show('新密码输入不一致');
      return;
    }
    const res = await post('/api/user/modify_password', {
      oldPassword,
      newPassword,
      confirmPassword
    });

    if(res && res.code === 200) {
      Toast.show('修改成功');
      localStorage.removeItem('token')
      setTimeout(() => {
        window.location.href = '/login';
      }, 1000);
    } else {
      Toast.show('修改失败');
    }
    
  };

  return (
    <>
      <Header title="重置密码" />
      <div className={s.account}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <List>
            <List.Item title="原密码">
              <Controller
                name="oldPassword"
                control={control}
                rules={{ required: '原密码不能为空' }}
                render={({ field }) => (
                  <>
                    <Input {...field} placeholder="请输入原密码" clearable type='password' />
                    {errors.oldPassword && (
                      <span style={{ color: 'red' }}>
                        {errors.oldPassword.message}
                      </span>
                    )}
                  </>
                )}
              />
            </List.Item>
            <List.Item title="新密码">
              <Controller
                name="newPassword"
                control={control}
                rules={{ required: '新密码不能为空' }}
                render={({ field }) => (
                  <>
                    <Input {...field} placeholder="请输入新密码" clearable type='password' />
                    {errors.newPassword && (
                      <span style={{ color: 'red' }}>
                        {errors.newPassword.message}
                      </span>
                    )}
                  </>
                )}
              />
            </List.Item>
            <List.Item title="确认新密码">
              <Controller
                name="confirmPassword"
                control={control}
                rules={{ required: '确认新密码不能为空' }}
                render={({ field }) => (
                  <>
                    <Input {...field} placeholder="请再次输入新密码" clearable type='password' />
                    {errors.confirmPassword && (
                      <span style={{ color: 'red' }}>
                        {errors.confirmPassword.message}
                      </span>
                    )}
                  </>
                )}
              />
            </List.Item>
          </List>
          <Button className={s.submit} block theme="primary" htmlType="submit">
            提交
          </Button>
        </form>
      </div>
    </>
  );
};

export default ModifyPassword;
