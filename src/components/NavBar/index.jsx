import { useState } from 'react';
import ProTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { TabBar } from 'zarm';
import s from './style.module.less'

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
      <TabBar.Item itemKey="/" title="账单" />
      <TabBar.Item itemKey="/data" title="统计" />
      <TabBar.Item itemKey="/user" title="我的" />
    </TabBar>
  );
};

NavBar.propTypes = {
  showNav: ProTypes.bool, // 是否显示导航栏
};

export default NavBar;
