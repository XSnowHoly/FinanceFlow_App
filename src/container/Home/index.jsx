import Header from './header';
import { useEffect, useState } from 'react';
import { get } from '@/utils';
import dayjs from 'dayjs';
import { DatePicker, Picker } from 'zarm';
import BillCard from './BillCard';

const now = dayjs();
const startOfMonth = now.startOf('month');
const endOfMonth = now.endOf('month');
const monthStartTimestamp = startOfMonth.unix();
const monthEndTimestamp = endOfMonth.unix();
const defaultDate = startOfMonth.format('YYYY/MM');

const SINGLE_DATA = [
  { value: 'all', label: '全部类型' },
  { value: '1', label: '支出' },
  { value: '2', label: '收入' },
];

const TYPE_DATA_MAP = {
  all: '全部类型',
  1: '支出',
  2: '收入',
};

const Home = () => {
  const [type, setType] = useState('');
  const [typeValue, setTypeValue] = useState([]);
  const [date, setDate] = useState(defaultDate);
  const [dateValue, setDateValue] = useState('');
  const [totalIncome, setTotalIncome] = useState('');
  const [totalExpense, setTotalExpense] = useState('');
  const [billList, setBillList] = useState([]);

  // useEffect(() => {
  //   // 获取数据
  //   getData({});
  // }, []);

  useEffect(() => {
    // 账单类型或日期筛选条件变动
    const queryDate = dayjs(dateValue);
    const query = {
      start_time: queryDate.startOf('month').unix(),
      end_time: queryDate.endOf('month').unix(),
      type_id: typeValue[0],
    };
    getData(query);
  }, [typeValue, dateValue]);

  // 获取账单列表
  const getData = async ({ start_time, end_time, type_id }) => {
    const res = await get('/api/bill/get_list', {
      params: {
        start_time: start_time || monthStartTimestamp,
        end_time: end_time || monthEndTimestamp,
        page: 1,
        page_size: 5,
        type_id,
      },
    });
    if (res && res.data) {
      console.log(res.data);
      const {
        totalIncome: total_income,
        totalExpense: total_expense,
        list,
      } = res.data;
      setTotalIncome(total_income);
      setTotalExpense(total_expense);
      setBillList(list);
    }
  };

  const onSelectType = async () => {
    // 调用Picker.prompt函数，传入参数：value，dataSource
    const { value: changedValue } = await Picker.prompt({
      value: typeValue,
      dataSource: SINGLE_DATA,
    });
    // 如果没有改变，则返回
    if (!changedValue) return;
    // 设置typeValue的值
    setTypeValue(changedValue);
    // 设置type的值
    setType(TYPE_DATA_MAP[changedValue[0]]);
  };

  const onSelectDate = async () => {
    // 调用DatePicker.prompt函数，传入参数：columnType，value，defaultValue
    const { value: changedValue } = await DatePicker.prompt({
      columnType: ['year', 'month'],
      value: dateValue,
      defaultValue: new Date(defaultDate),
    });
    // 如果没有改变，则返回
    if (!changedValue) return;
    // 设置dateValue的值
    setDateValue(changedValue);
    // 设置date的值
    setDate(dayjs(changedValue).format('YYYY/MM'));
  };

  return (
    <div>
      <Header
        totalIncome={totalIncome}
        totalExpense={totalExpense}
        type={type}
        date={date}
        onSelectType={onSelectType}
        onSelectDate={onSelectDate}
      />
      {billList.map((data, index) => (
        <BillCard
          key={index}
          date={data.date}
          totalIncome={data.totalIncome}
          totalExpense={data.totalExpense}
          bills={data.bills}
        />
      ))}
    </div>
  );
};

export default Home;
