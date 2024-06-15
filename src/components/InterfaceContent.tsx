import { Button, Input, Select, Space } from 'antd'
import 'antd/dist/reset.css'
import type { ReactElement } from 'react'
import Request from './Request'

const { TextArea } = Input

const options = [
	{
		value: 'zhejiang',
		label: 'Zhejiang'
	},
	{
		value: 'jiangsu',
		label: 'Jiangsu'
	}
]

export default function InterfaceContent(): ReactElement {
	return (
		<div className='flex h-[90vh] flex-col gap-4'>
			<Space direction='vertical' className='w-full'>
				<Space.Compact block size='large'>
					<Input type='text' className='w-[20em]' />
					<Select
						defaultValue='zhejiang'
						options={options}
						className='flex-1'
					/>
					<Button>执行</Button>
				</Space.Compact>
			</Space>
			<div className='flex-1'>
				<Request />
			</div>
			<div className='flex-1'>
				<TextArea style={{ height: '100%', resize: 'none' }} />
			</div>
		</div>
	)
}
