import SelectDate from '@/components/SelectDate';
import { useCallback, useEffect, useState } from 'react';
import { get, tagMap } from '@/utils';
import { Radio, Progress } from 'zarm';
import CustomIcon from '@/components/CustomIcon';
import dayjs from 'dayjs';
import s from './style.module.less';

// 获取当前时间
const now = new Date();

const Data = () => {
  const [time, setTime] = useState(+now);
  const [totalExpense, setTotalExpense] = useState('0.00');
  const [totalIncome, setTotalIncome] = useState('0.00');
  const [payType, setPayType] = useState(1);
  const [currentList, setCurrentList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
  const [incomeList, setIncomeList] = useState([]);

  const getTotalData = useCallback(async () => {
    const res = await get('/api/bill/get_total', {
      params: {
        start_time: +dayjs(time).startOf('month'),
        end_time: +dayjs(time).endOf('month'),
      },
    });
    if (res && res.code === 200) {
      const {
        totalExpense: total_expense,
        totalIncome: total_income,
        list: bills,
      } = res.data;
      setTotalExpense(total_expense);
      setTotalIncome(total_income);
      if (bills && bills.length > 0) {
        let expense_list = [];
        let income_list = [];
        for (let index = 0; index < bills.length; index++) {
          const element = bills[index];
          if (element.pay_type === 1) {
            const item = {
              // 获取百分比保留两位数
              percent: parseFloat(
                ((element.total_amount / total_expense) * 100).toFixed(2),
              ),
              ...element,
            };
            expense_list.push(item);
          } else if (element.pay_type === 2) {
            const item = {
              percent: parseFloat(
                ((element.total_amount / total_income) * 100).toFixed(2),
              ),
              ...element,
            };
            income_list.push(item);
          }
        }
        setExpenseList(expense_list);
        setIncomeList(income_list);
      }
    }
  }, [time]);

  useEffect(() => {
    if (payType === 1) {
      setCurrentList(expenseList);
    } else if (payType === 2) {
      setCurrentList(incomeList);
    }
  }, [payType, expenseList, incomeList]);

  useEffect(() => {
    getTotalData();
  }, [getTotalData]);

  const onChnageDate = (date) => {
    setTime(+date);
    console.log(+date, time);
  };

  return (
    <div className={s.selectDateWrap}>
      <div className={s.header}>
        <SelectDate
          columnType={['year', 'month']}
          defaultValue={now}
          onChange={onChnageDate}
        />
        <div className={s.moneyText}>共支出</div>
        <div className={`${s.moneyText} ${s.expenseText}`}>
          ￥{totalExpense}
        </div>
        <div className={`${s.moneyText} ${s.incomeText}`}>
          <span>共收入</span>
          <span>￥{totalIncome}</span>
        </div>
      </div>
      <div className={s.percentWrap}>
        <div className={s.titleWrap}>
          <span className={s.titleText}>收支构成</span>
          <Radio.Group
            compact
            type="button"
            value={payType}
            onChange={setPayType}
          >
            <Radio value={1}>支出</Radio>
            <Radio value={2}>收入</Radio>
          </Radio.Group>
        </div>
        <div>
          {currentList.map((item, index) => {
            return (
              <div className={s.percentItem} key={index}>
                <div className={s.amountType}>
                  <CustomIcon type={tagMap[item.type_id]} />
                  <span className={s.amountText}>{item.type_name}</span>
                  <span className={s.amountText}>￥{item.total_amount}</span>
                </div>
                <Progress shape="line" percent={item.percent} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Data;
