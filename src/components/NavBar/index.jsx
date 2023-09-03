import { useState } from 'react';
import ProTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { TabBar } from 'zarm';
import s from './style.module.less'
import CustomIcon from '../CustomIcon'

const NavBar = ({ showNav }) => {
  const [activeKey, setActiveKey] = useState('/');
  const navigateTo = useNavigate();

  const changeTab = (key) => {
    setActiveKey(key);
    navigateTo(key);
  };

  return showNav && (
    <TabBar
      className={s.tabBar}
      activeKey={activeKey}
      onChange={changeTab}
    >
      <TabBar.Item itemKey="/" title="账单" icon={<CustomIcon type='bill' />} />
      <TabBar.Item itemKey="/data" title="统计" icon={<CustomIcon type='statistics' />} />
      <TabBar.Item itemKey="/user" title="我的" icon={<CustomIcon type='user' />} />
    </TabBar>
  );
};

NavBar.propTypes = {
  showNav: ProTypes.bool, // 是否显示导航栏
};

export default NavBar;
