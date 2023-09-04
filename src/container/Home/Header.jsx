import s from './Header.module.less';
import ProTypes from 'prop-types';

const Header = ({ totalIncome, totalExpense, type, date,  onSelectType, onSelectDate }) => {
  return (
    <div className={s.headerBody}>
      <div className={s.top}>
        <div className={s.statistics}>
          <span className={s.key} >总支出:</span>
          <span className={s.value}>￥{totalIncome}</span>
        </div>
        <div className={s.statistics}>
          <span className={s.key}>总支出:</span>
          <span className={s.value}>￥{totalExpense}</span>
        </div>
      </div>
      <div className={s.bottom}>
        <div onClick={onSelectType} className={s.selectBtn}>{type || '全部类型' }</div>
        <div onClick={onSelectDate} className={s.selectBtn}>{date}</div>
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
