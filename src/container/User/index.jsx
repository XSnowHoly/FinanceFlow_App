import { useState, useEffect } from 'react';
import { Image, Button, List, Toast, Modal } from 'zarm';
import s from './style.module.less';
import { get } from '@/utils';
import CustomIcon from '@/components/CustomIcon';
import { useNavigate } from 'react-router-dom';

const User = () => {
  const navigateTo = useNavigate();
  const [userInfo, setUserInfo] = useState({});

  const getUserInfo = async () => {
    const res = await get('/api/user/get_userinfo');
    if (res && res.code === 200) {
      setUserInfo(res.data);
    } else {
      Toast.show(res.msg || '获取用户信息失败');
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const onLogout = () => {
    Modal.confirm({
      title: '提示',
      content: '确定退出登录吗？',
      onConfirm: async () => {
        // 退出登录
        localStorage.removeItem('token');
        window.location.href = '/login';
      },
    });
  };

  return (
    <div className={s.userWrap}>
      <div className={s.header}>
        <div className={s.info}>
          <div className={s.nick}>
            <span>昵称:</span>
            <span className={s.nickText}>{userInfo.username}</span>
          </div>
          <div className={s.signature}>{userInfo.signature}</div>
        </div>
        <div className={s.imgBox}>
          <Image src={userInfo.avatar} shape="circle" />
        </div>
      </div>
      <div className={s.actionsList}>
        <List>
          <List.Item
            hasArrow
            title="用户信息修改"
            prefix={<CustomIcon className={s.customIcon} type="edit" />}
            onClick={() => {
              navigateTo('/userInfo')
            }}
          />
          <List.Item
            hasArrow
            title="重置密码"
            prefix={<CustomIcon className={s.passwordIcon} type="password" />}
            onClick={() => {
              navigateTo('/modifyPassword')
            }}
          />
          <List.Item
            hasArrow
            title="关于我们"
            prefix={<CustomIcon className={s.userIcon} type="user" />}
            onClick={() => {}}
          />
        </List>
      </div>
      <div className={s.btnWrap}>
        <Button onClick={onLogout} shadow block theme="danger">
          退出登录
        </Button>
      </div>
    </div>
  );
};

export default User;
