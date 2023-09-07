import { useEffect, useState } from 'react';
import CustomIcon from '@/components/CustomIcon';
import s from './style.module.less';
import { Popup, Radio, DatePicker, Keyboard, Toast } from 'zarm';
import dayjs from 'dayjs';
import { tagMap, tagExpenseMap, tagIncomeMap, post } from 'utils';
import ProTypes from 'prop-types';

const now = dayjs();

const DEFAULT_STYLE = {
  fontSize: 30,
  gap: 6,
  borderRadius: 5,
  boxShadow: true,
};

const PopupAdd = ({ onAddOk }) => {
  const [payType, setPayType] = useState(1);
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(new Date(now));
  const [amount, setAmount] = useState('');
  const [tagNameMap, setTagNameMap] = useState({});
  const [tagData, setTagData] = useState({
    type_id: '',
    type_name: '',
  });

  useEffect(() => {
    // payType 为支出 1 或收入 2 时改变tagNameMap 对应字段
    setTagNameMap(payType === 1 ? tagExpenseMap : tagIncomeMap);
  }, [payType]);

  // 添加按钮点击事件
  const onAdd = () => {
    setVisible(true);
  };

  const onTagClick = (id, name) => {
    setTagData({
      type_id: id,
      type_name: name,
    });
  };

  const onSelectDate = async () => {
    // 调用DatePicker.prompt函数，传入参数：columnType，value，defaultValue
    const { value: changedValue } = await DatePicker.prompt({
      value: date,
      // defaultValue: new Date(date),
    });
    // 如果没有改变，则返回
    if (!changedValue) return;
    setDate(changedValue);
  };

  const onSelectPayType = (value) => {
    setPayType(value);
  };

  // 监听输入框改变值
  const handleMoney = async (value) => {
    console.log(value);
    value = String(value);
    // 点击是删除按钮时
    if (value == 'delete') {
      let _amount = amount.slice(0, amount.length - 1);
      setAmount(_amount);
      return;
    }

    // 点击确认按钮时
    if (value == 'ok') {
      // 这里后续将处理添加账单逻辑
      console.log(tagData);
      const res = await post('/api/bill/add', {
        pay_type: payType,
        amount,
        date: +date,
        type_id: tagData.type_id,
        type_name: tagData.type_name,
      });
      if (res && res.code === 200) {
        Toast.show(res.msg);
        setVisible(false)
        onAddOk();
      }
      return;
    }

    // 当输入的值为 '.' 且 已经存在 '.'，则不让其继续字符串相加。
    if (value == '.' && amount.includes('.')) return;
    // 小数点后保留两位，当超过两位时，不让其字符串继续相加。
    if (
      value != '.' &&
      amount.includes('.') &&
      amount &&
      amount.split('.')[1].length >= 2
    ) {
      return;
    }

    setAmount(amount + value);
  };

  return (
    <div className={s.popupBody}>
      {/* 添加按钮 */}
      <div onClick={onAdd} className={s.addBtn}>
        <CustomIcon type="add" />
      </div>

      <Popup
        visible={visible}
        direction="bottom"
        onMaskClick={() => setVisible(false)}
        destroy={false}
        mountContainer={() => document.body}
      >
        <div className={s.popupBox}>
          <div className={s.header}>
            <Radio.Group
              value={payType}
              onChange={onSelectPayType}
              type="button"
            >
              <Radio value={1}>支出</Radio>
              <Radio value={2}>收入</Radio>
            </Radio.Group>
            <div onClick={onSelectDate}>{dayjs(date).format('YYYY/MM/DD')}</div>
          </div>
          <div className={s.amount}>
            <span>￥</span>
            <span>{amount}</span>
          </div>

          <div className={s.tagBox}>
            {Object.entries(tagNameMap).map(([id, name]) => (
              <div
                onClick={() => onTagClick(id, name)}
                className={`${s.tabgItem} ${
                  tagData.type_id === id ? s.active : ''
                }`}
                key={id}
              >
                <CustomIcon type={tagMap[id]} />
                <span>{name}</span>
              </div>
            ))}
          </div>

          <Keyboard
            type="price"
            style={DEFAULT_STYLE}
            onKeyClick={handleMoney}
          />
        </div>
      </Popup>
    </div>
  );
};

PopupAdd.propTypes = {
  onAddOk: ProTypes.func,
};

export default PopupAdd;
