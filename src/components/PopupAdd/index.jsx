import { useRef } from 'react';
import CustomIcon from '@/components/CustomIcon';
import s from './style.module.less';
import { Toast } from 'zarm';
import AddEditBillModal from '../AddEditBillModal';
import { post } from 'utils';
import ProTypes from 'prop-types';

const PopupAdd = ({ onAddOk }) => {
  const addRef = useRef(); // 添加账单

  // 添加按钮点击事件
  const onAdd = () => {
    addRef.current && addRef.current.show();
  };

  const onConfirm = async (params) => {
    const res = await post('/api/bill/add', params);
    if (res && res.code === 200) {
      Toast.show(res.msg);
      addRef.current && addRef.current.hide();
      onAddOk();
    }
  }

  return (
    <div className={s.popupBody}>
      {/* 添加按钮 */}
      <div onClick={onAdd} className={s.addBtn}>
        <CustomIcon type="add" />
      </div>

      <AddEditBillModal onConfirm={onConfirm} ref={addRef} />
    </div>
  );
};

PopupAdd.propTypes = {
  onAddOk: ProTypes.func,
};

export default PopupAdd;
