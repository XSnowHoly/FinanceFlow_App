import styles from './BillCard.module.less';
import ProTypes from 'prop-types';
import dayjs from 'dayjs';
import CustomIcon from '@/components/CustomIcon';
import { tagMap } from '@/utils';
import { useNavigate } from 'react-router-dom';

const BillCard = ({ date, totalIncome, totalExpense, bills = [] }) => {
  const navigateTo = useNavigate();

  const goToDetails = (id) => {
    navigateTo(`/details?id=${id}`);
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.date}>{date}</div>
        <div className={styles.statistics}>
          <div className={styles.money}>
            <span className={styles.iconMoney}>支</span>
            <span>￥{totalExpense}</span>
          </div>
          <div className={styles.money}>
            <span className={styles.iconMoney}>收</span>
            <span>￥{totalIncome}</span>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        {bills.map((data, index) => (
          <div onClick={() => { goToDetails(data.id) }} className={styles.item} key={index}>
            <div className={styles.detail}>
              <div className={styles.title}>
                <CustomIcon type={tagMap[data.type_id]} />
                <span>{data.type_name}</span>
              </div>
              <div className={styles.time}>
                <span>
                  {dayjs(new Date(Number(data.date))).format('HH:mm')}
                </span>
                {data.remark && <span> | {data.remark}</span>}
              </div>
            </div>
            <div
              className={`${styles.cost} ${
                data.pay_type === 2 && styles.income
              }`}
            >
              {data.pay_type === 2 ? '' : '-'}
              {data.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

BillCard.propTypes = {
  bills: ProTypes.array,
  date: ProTypes.string,
  totalIncome: ProTypes.string,
  totalExpense: ProTypes.string,
};

export default BillCard;
