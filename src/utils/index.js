import axios from './axios'

export const get = axios.get
export const post = axios.post

export const tagMap = {
  1: 'food',
  2: 'clothes',
  3: 'trip',
  4: 'commodity',
  5: 'shop',
  6: 'study',
  7: 'medical',
  8: 'travel',
  9: 'human',
  10: 'other',
  11: 'wage',
  12: 'bonus',
  13: 'transfer',
  14: 'finance',
  15: 'refund',
  16: 'other'
}

export const tagExpenseMap = {
  1: '餐饮',
  2: '服饰',
  3: '出行',
  4: '日用',
  5: '购物',
  6: '学习',
  7: '医疗',
  8: '旅游',
  9: '人情',
  10: '其他',
}

export const tagIncomeMap = {
  11: '工资',
  12: '奖金',
  13: '转账',
  14: '金融',
  15: '退款',
  16: '其他'
}