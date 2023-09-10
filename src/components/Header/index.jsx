import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'
import { NavBar } from 'zarm';
import { ArrowLeft } from '@zarm-design/icons';

import s from './style.module.less'

const Header = ({ title = '' }) => {
  const navigateTo = useNavigate()
  return <div className={s.headerWarp}>
    <div className={s.block}>
      <NavBar
        className={s.header}
        left={<ArrowLeft theme="primary" onClick={() => navigateTo(-1)} />}
        title={title}
      />
    </div>
  </div>
};

Header.propTypes = {
  title: PropTypes.string, // 标题
};

export default Header;