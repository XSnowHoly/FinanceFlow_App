import { useState, useEffect, useRef } from 'react';
import CustomIcon from '@/components/CustomIcon';
import s from './style.module.less';
import { Toast } from 'zarm';
import AddEditBillModal from '../AddEditBillModal';
import { post } from 'utils';
import ProTypes from 'prop-types';

const PopupAdd = ({ onAddOk }) => {
  const addRef = useRef(); // 添加账单
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const boxRef = useRef(null);

  useEffect(() => {
    // 将元素初始位置设置为右下角
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const initialX = screenWidth - 60; // 100 是元素的宽度
    const initialY = screenHeight - 100; // 100 是元素的高度
    setPosition({ x: initialX, y: initialY });
  }, []);

  const handleTouchStart = (e) => {
    setIsDragging(true);
    const touch = e.touches[0];
    setOffset({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
    });
    // 设置 html 和 body 样式
    document.documentElement.style.height = '100%';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.height = '100%';
    document.body.style.overflow = 'hidden';

    // 添加 TouchMove 事件监听
    boxRef.current.addEventListener('touchmove', handleTouchMove, { passive: false });
    e.stopPropagation();
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const newX = touch.clientX - offset.x;
    const newY = touch.clientY - offset.y;
    setPosition({ x: newX, y: newY });
    e.stopPropagation();
  };

  const handleTouchEnd = (e) => {
    setIsDragging(false);
    // 清空 html 和 body 样式
    document.documentElement.style.height = '';
    document.documentElement.style.overflow = '';
    document.body.style.height = '';
    document.body.style.overflow = '';
    // 添加 TouchMove 事件监听
    boxRef.current.addEventListener('touchmove', handleTouchMove, { passive: false });
    e.stopPropagation();
  };

  // 添加按钮点击事件
  const onAdd = (e) => {
    addRef.current && addRef.current.show();
    e.stopPropagation();
  };

  const onConfirm = async (params) => {
    const res = await post('/api/bill/add', params);
    if (res && res.code === 200) {
      Toast.show(res.msg);
      addRef.current && addRef.current.hide();
      addRef.current && addRef.current.resetState();
      onAddOk();
    }
  };

  return (
    <div className={s.popupBody}>
      {/* 添加按钮 */}
      <div
        ref={boxRef}
        className={`${s.addBtn} ${isDragging ? s.dragging: ''}`}
        style={{ left: position.x, top: position.y }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={onAdd}
      >
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
