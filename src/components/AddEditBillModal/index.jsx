import { useEffect, useState, forwardRef } from 'react';
import dayjs from 'dayjs';
import CustomIcon from '@/components/CustomIcon';
import { Popup, Radio, DatePicker, Keyboard, Input } from 'zarm';
import { tagMap, tagExpenseMap, tagIncomeMap } from 'utils';
import ProTypes from 'prop-types';
import s from './style.module.less';

const now = dayjs();

const DEFAULT_STYLE = {
  fontSize: 30,
  gap: 6,
  borderRadius: 5,
  boxShadow: true,
};

const AddEditBillModal = forwardRef(({ onConfirm }, ref) => {
  const [payType, setPayType] = useState(1);
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(new Date(now));
  const [amount, setAmount] = useState('');
  const [tagNameMap, setTagNameMap] = useState({});
  const [tagData, setTagData] = useState({
    type_id: '',
    type_name: '',
  });
  const [remarkVisible, setRemarkVisible] = useState(false);
  const [remark, setRemark] = useState('');

  if (ref) {
    ref.current = {
      show: () => setVisible(true),
      hide: () => setVisible(false),
      resetState: () => resetState(),
    };
  }

  const resetState = () => {
    setPayType(1);
    setVisible(false);
    setDate(new Date(now));
    setAmount('');
    setTagNameMap({});
    setTagData({
      type_id: '',
      type_name: '',
    });
    setRemarkVisible(false);
    setRemark('');
  }

  const showRemark = () => {
    setRemarkVisible(true);
  }

  useEffect(() => {
    // payType 为支出 1 或收入 2 时改变tagNameMap 对应字段
    setTagNameMap(payType === 1 ? tagExpenseMap : tagIncomeMap);
  }, [payType]);

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
      // 返回账单填写参数
      console.log(tagData);
      const parms = {
        pay_type: payType,
        amount,
        date: +date,
        type_id: tagData.type_id,
        type_name: tagData.type_name,
        remark
      };
      onConfirm(parms);
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
    <Popup
      visible={visible}
      direction="bottom"
      onMaskClick={() => setVisible(false)}
      destroy={false}
      mountContainer={() => document.body}
    >
      <div className={s.popupBox}>
        <div className={s.header}>
          <Radio.Group value={payType} onChange={onSelectPayType} type="button">
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

        <div className={s.remarkBox}>
          {remarkVisible ? (
            <Input
              className={s.remark}
              autoHeight
              showLength
              value={remark}
              onChange={(e) => {
                setRemark(e.target.value);
              }}
              rows={4}
              maxLength={200}
              placeholder="填写备注"
            />
          ) : (
            <span className={s.remarkBtn} onClick={showRemark}>添加备注</span>
          )}
        </div>

        <Keyboard type="price" style={DEFAULT_STYLE} onKeyClick={handleMoney} />
      </div>
    </Popup>
  );
});

AddEditBillModal.displayName = 'AddEditBillModal';

AddEditBillModal.propTypes = {
  onConfirm: ProTypes.func,
};

export default AddEditBillModal;
