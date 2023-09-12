import { useState, useEffect } from 'react'
import { Image, Button, List, Toast } from 'zarm';
import s from './style.module.less';
import { get } from '@/utils'

const User = () => {
  const [userInfo, setUserInfo] = useState({});

  const getUserInfo = async () => {
    const res = await get('/api/user/get_userinfo')
    if(res && res.code === 200) {
      setUserInfo(res.data)
    } else {
      Toast.show(res.msg || '获取用户信息失败')
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className={s.userWrap}>
      <div className={s.header}>
        <div className={s.info}>
          <div className={s.nick}>
            <span>昵称:</span>
            <span className={s.nickText}>{ userInfo.username }</span>
          </div>
          <div className={s.signature}>{ userInfo.signature }</div>
        </div>
        <div className={s.imgBox}>
          <Image src={userInfo.avatar} shape="circle" />
        </div>
      </div>
      <div className={s.actionsList}>
        <List>
          <List.Item hasArrow title="用户信息修改" onClick={() => {}} />
          <List.Item hasArrow title="重置密码" onClick={() => {}} />
          <List.Item hasArrow title="关于我们" onClick={() => {}} />
        </List>
      </div>
      <div className={s.btnWrap}>
        <Button shadow block theme="danger">退出登录</Button>
      </div>
    </div>
  );
};

export default User;
