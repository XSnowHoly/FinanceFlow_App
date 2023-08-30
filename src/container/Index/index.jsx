// Index/index.jsx
import { Button } from 'zarm';
import style from './style.module.less'

export default function Index() {
  return <div className={style.index}>
    <span className={ style.text }>样式</span>
    <Button theme='primary'>Button</Button>
  </div>
}