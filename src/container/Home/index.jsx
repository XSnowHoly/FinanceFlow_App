import Header from './header';
import { useEffect, useState, useRef, useCallback } from 'react';
import { get } from '@/utils';
import dayjs from 'dayjs';
import { DatePicker, Picker, Pull, List } from 'zarm';
import BillCard from './BillCard';
import PopupAdd from '@/components/PopupAdd';
import CustomIcon from '@/components/CustomIcon';
import s from './style.module.less';

const now = dayjs();
const startOfMonth = now.startOf('month');
const endOfMonth = now.endOf('month');
const monthStartTimestamp = startOfMonth.unix();
const monthEndTimestamp = endOfMonth.unix();
const defaultDate = startOfMonth.format('YYYY/MM');

let lock = false;

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

const REFRESH_STATE = {
  normal: 0, // 普通
  pull: 1, // 下拉刷新（未满足刷新条件）
  drop: 2, // 释放立即刷新（满足刷新条件）
  loading: 3, // 加载中
  success: 4, // 加载成功
  failure: 5, // 加载失败
};

const LOAD_STATE = {
  normal: 0, // 普通
  abort: 1, // 中止
  loading: 2, // 加载中
  success: 3, // 加载成功
  failure: 4, // 加载失败
  complete: 5, // 加载完成（无新数据）
};

const Home = () => {
  const pullRef = useRef();
  const [type, setType] = useState('');
  const [typeValue, setTypeValue] = useState([]);
  const [date, setDate] = useState(defaultDate);
  const [dateValue, setDateValue] = useState('');
  const [totalIncome, setTotalIncome] = useState('');
  const [totalExpense, setTotalExpense] = useState('');
  const [billList, setBillList] = useState([]);
  const [refreshing, setRefreshing] = useState(REFRESH_STATE.normal);
  const [loading, setLoading] = useState(LOAD_STATE.normal);
  const [currentPage, setCurrentPage] = useState(1); // 当前页码
  const [totalPage, setTotalPage] = useState(0); // 总页数

  const getBills = useCallback(async ({
    start_time,
    end_time,
    pay_type,
    page = 1,
    page_size = 8,
  }) => {
    const res = await get('/api/bill/get_list', {
      params: {
        start_time: start_time || monthStartTimestamp,
        end_time: end_time || monthEndTimestamp,
        page,
        page_size,
        pay_type,
      },
    });
    return res;
  }, []);


  // 获取账单列表
  const getData = useCallback(
    async (
      { start_time, end_time, pay_type, page = 1},
      { onSuccess, onError } = {},
    ) => {
      const res = await getBills({
        start_time: start_time || monthStartTimestamp,
        end_time: end_time || monthEndTimestamp,
        page,
        pay_type,
      }).catch((err) => {
        onError && onError(err);
      });
      if (res && res.data) {
        const {
          totalIncome: total_income,
          totalExpense: total_expense,
          list,
          totalPages
        } = res.data;
          setTotalIncome(total_income);
          setTotalExpense(total_expense);
          setBillList(list);
          setTotalPage(totalPages);
          setCurrentPage(1);
          setLoading(LOAD_STATE.normal)
        onSuccess && onSuccess();
        return;
      }
      onError && onError();
    },
    [getBills],
  );

  useEffect(() => {
    // 账单类型或日期筛选条件变动
    const queryDate = dayjs(dateValue);
    const query = {
      start_time: queryDate.startOf('month').unix(),
      end_time: queryDate.endOf('month').unix(),
      pay_type: typeValue[0] === 'all' ? '' : typeValue[0],
    };
    getData(query);
  }, [typeValue, dateValue, getData]);

  const onAddOk = () => {
    getData({});
  };

  const getBaseQuery = (time_value, type_value) => {
    const queryDate = dayjs(time_value);
    const query = {
      start_time: queryDate.startOf('month').unix(),
      end_time: queryDate.endOf('month').unix(),
      pay_type: type_value[0] === 'all' ? '' : type_value[0],
    };
    return query;
  }

  const loadMore = useCallback(async ({ onSuccess, onError } = {}) => {
    // 账单类型或日期筛选条件变动
    const query = getBaseQuery(dateValue, typeValue)
    const res = await getBills({
      ...query,
      page: currentPage + 1,
    }).catch(err => {
      onError(err)
    })
    if (res && res.data) {
      onSuccess(res);
      return;
    }
    onError();
  }, [currentPage, dateValue, getBills, typeValue])

  // 模拟请求数据
  const refreshData = useCallback(() => {
    const query = getBaseQuery(dateValue, typeValue)
    setRefreshing(REFRESH_STATE.loading);
    getData(
      query,
      {
        onSuccess: () => setRefreshing(REFRESH_STATE.success),
        onError: () => setRefreshing(REFRESH_STATE.failure),
      },
    );
  }, [dateValue, typeValue, getData]) 

  // 模拟加载更多数据
  const loadData = useCallback(() => {
    if(lock) return;
    lock = true; 
    setLoading(LOAD_STATE.loading);
    if(currentPage === totalPage) {
      setLoading(LOAD_STATE.complete);
      lock = false;
      return;
    }
    loadMore(
      {
        onSuccess: (res) => {
          setLoading(LOAD_STATE.success);
          const {
            list,
          } = res.data;
          setBillList([...billList, ...list]); // 加载更多
          setCurrentPage(currentPage + 1);
          lock = false;
        },
        onError: () => {
          setLoading(LOAD_STATE.failure);
          lock = false;
        },
      },
    );
  }, [currentPage, billList, loadMore, totalPage]);

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
    <div className={s.homeWrap}>
      <Header
        totalIncome={totalIncome}
        totalExpense={totalExpense}
        type={type}
        date={date}
        onSelectType={onSelectType}
        onSelectDate={onSelectDate}
      />
      <Pull
        ref={pullRef}
        style={{ overflowY: 'auto', flex: 1 }}
        refresh={{
          state: refreshing,
          handler: refreshData,
        }}
        load={{
          state: loading,
          distance: 200,
          handler: loadData,
        }}
      >
        <List>
          {
            billList.length === 0 && (
              <div className={s.emptyWrap}>
                <CustomIcon size="lg" type="empty" />
                <p>暂无账单，现在记一笔吧~</p>
              </div>
            )
          }
          {billList.map((data, index) => (
            <BillCard
              key={index}
              date={data.date}
              totalIncome={data.totalIncome}
              totalExpense={data.totalExpense}
              bills={data.bills}
            />
          ))}
        </List>
      </Pull>
      <PopupAdd onAddOk={onAddOk} />
    </div>
  );
};

export default Home;
