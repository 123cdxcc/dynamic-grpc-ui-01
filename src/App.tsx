import type { MenuProps } from 'antd'
import { Layout, Menu } from 'antd'
import Home from 'pages/Home'
import Setting from 'pages/Setting'
import { type ReactElement } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

// const Home = lazy(async () => import('pages/Home'))
// const Setting = lazy(async () => import('pages/Setting'))

const { Sider, Content } = Layout
type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
	{ key: '/', icon: undefined, label: '首页' },
	{ key: '/setting', icon: undefined, label: '设置' }
]

export default function App(): ReactElement {
	const navigate = useNavigate()
	const onItemSelectHandler = ({ key }: { key: string }): void => {
		navigate(key, { replace: true })
	}
	return (
		<Layout className='h-full'>
			<Sider className='h-[100vh]'>
				<Menu
					defaultSelectedKeys={['/']}
					defaultOpenKeys={['/']}
					mode='vertical'
					theme='dark'
					onSelect={onItemSelectHandler}
					items={items}
				/>
			</Sider>
			<Content className='h-[100vh]'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/setting' element={<Setting />} />
				</Routes>
			</Content>
		</Layout>
	)
}
