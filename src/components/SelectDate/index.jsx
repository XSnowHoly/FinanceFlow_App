import dayjs from 'dayjs';
import ProTypes from 'prop-types';
import { DatePicker } from 'zarm';
import { useState } from 'react';
import s from './style.module.less';


const SelectDate = ({ columnType = ['year', 'month', 'day'], defaultValue, onChange }) => {
  const [date, setDate] = useState(defaultValue);

  const onSelectDate = async () => {
    // 调用DatePicker.prompt函数，传入参数：columnType，value，defaultValue
    const { value: changedValue } = await DatePicker.prompt({
      columnType,
      value: date,
      // defaultValue: new Date(date),
    });
    // 如果没有改变，则返回
    if (!changedValue) return;
    setDate(changedValue);
    onChange(changedValue)
  };

  return (
    <div className={s.selectDateWrap}>
      <div onClick={onSelectDate}>{dayjs(date).format('YYYY/MM')}</div>
    </div>
  )
}

SelectDate.propTypes = {
  columnType: ProTypes.arrayOf(ProTypes.string),
  defaultValue: ProTypes.instanceOf(Date),
  onChange: ProTypes.func,
}

export default SelectDate;