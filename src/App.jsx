import { useState, useEffect, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom';
import routes from './router';
import { ConfigProvider } from 'zarm';
import zhCN from 'zarm/lib/config-provider/locale/zh_CN';
import NavBar from '@/components/NavBar';
import useRouterListener from './utils/useRouterListener';

function App() {
  const [pathname, setPathname] = useState('/')
  const [showNavBar, setShowNavBar] = useState(true)

  useRouterListener((locaiton) => {
    setPathname(locaiton.pathname);
  })

  useEffect(() => {
    const whitheList = ['/', '/data', '/user']
    if(whitheList.includes(pathname)) {
      setShowNavBar(true)
    } else {
      setShowNavBar(false)
    }
  }, [pathname])

  return (
      <>
        <ConfigProvider locale={zhCN}>
        <Suspense fallback={<div>Loading...</div>} >
          <Routes>
            {routes.map((route) => {
              return (
                <Route
                  exact
                  key={route.path}
                  path={route.path}
                  element={<route.component />}
                />
              );
            })}
          </Routes>
        </Suspense>
        </ConfigProvider>
        <NavBar showNav={showNavBar} />
      </>
  );
}

export default App;
