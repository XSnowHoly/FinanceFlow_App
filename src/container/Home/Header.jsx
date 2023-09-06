import s from './Header.module.less';
import ProTypes from 'prop-types';
import CustomIcon from '@/components/CustomIcon'

const Header = ({ totalIncome, totalExpense, type, date,  onSelectType, onSelectDate }) => {
  return (
    <div className={s.headerBody}>
      <div className={s.top}>
        <div className={s.statistics}>
          <span className={s.key}>总支出:</span>
          <span className={s.value}>￥{totalExpense}</span>
        </div>
        <div className={s.statistics}>
          <span className={s.key} >总收入:</span>
          <span className={s.value}>￥{totalIncome}</span>
        </div>
      </div>
      <div className={s.bottom}>
        <div onClick={onSelectType} className={s.selectBtn}>
          <span>{type || '全部类型' }</span>
          <CustomIcon type='down' />
        </div>
        <div onClick={onSelectDate} className={s.selectBtn}>
          <span>{date}</span>
          <CustomIcon type='down' />
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  onSelectType: ProTypes.func.isRequired,
  onSelectDate: ProTypes.func.isRequired,
  totalIncome: ProTypes.string,
  totalExpense: ProTypes.string,
  type: ProTypes.string,
  date: ProTypes.string,
}

export default Header;
