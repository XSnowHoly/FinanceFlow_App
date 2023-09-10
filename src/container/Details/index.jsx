import Header from '@/components/Header';
import CustomIcon from '@/components/CustomIcon';
import { useNavigate } from 'react-router-dom';
import { Modal, Toast } from 'zarm';
import s from './style.module.less';
import qs from 'query-string';
import { post, get, tagMap } from '@/utils';
import { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';

const Details = () => {
  // 获取路由 id 参数
  const { id } = qs.parse(location.search);
  const navigateTo = useNavigate();
  const [details, setDetails] = useState({
    pay_type: '',
    amount: '',
    date: '',
    type_id: '',
    type_name: '',
    remark: '',
  });

  const initDetails = useCallback(async () => {
    const res = await get('/api/bill/get_detail', { params: { id } });
    if (res && res.code === 200) {
      setDetails(res.data);
    } else {
      Toast.show({ icon: 'error', content: res.msg });
    }
  }, [id]);

  useEffect(() => {
    initDetails();
  }, [initDetails]);

  const deleteAction = () => {
    Modal.confirm({
      title: '提示',
      content: '确定删除该账单吗？',
      onConfirm: async () => {
        const res = await post('/api/bill/delete', { id });
        if (res && res.code === 200) {
          Toast.show({ icon: 'success', content: res.msg });
          navigateTo('/');
        }
      },
    });
  };

  return (
    <div className={s.detailsBody}>
      <Header title="账单详情" />
      <div className={s.cardWrap}>
        <div className={s.type}>
          <CustomIcon type={tagMap[details.type_id]} />
          <span className={s.title}>{details.type_name}</span>
        </div>
        <div className={s.money}>
          {details.pay_type === 1 ? '-' : '+'}
          {details.amount}
        </div>
        <div className={s.item}>
          <span className={s.key}>记录时间</span>
          <span className={s.value}>
            {dayjs(+details.date).format('YYYY-MM-DD HH:mm')}
          </span>
        </div>
        <div className={s.item}>
          <span className={s.key}>备注</span>
          <span className={s.value}>{details.remark}</span>
        </div>
        <div className={s.btnGroup}>
          <div onClick={deleteAction} className={s.delete}>
            <CustomIcon type="delete" />
            <span>删除</span>
          </div>
          <div className={s.edit}>
            <CustomIcon type="edit" />
            <span>编辑</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
