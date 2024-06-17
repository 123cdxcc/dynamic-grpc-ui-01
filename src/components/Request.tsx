import type { TabsProps } from 'antd'
import { Button, Input, List, Space, Tabs } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useState, type ReactElement } from 'react'

function MessageEdit(): ReactElement {
	return <TextArea style={{ height: '100%', resize: 'none' }} />
}

function MetadataEdit(): ReactElement {
	interface DataItem {
		key: string
		value: string
		keyEditable: boolean
		valueEditable: boolean
	}
	const [data, setData] = useState<DataItem[]>([
		{
			key: 'key1',
			value: 'value',
			keyEditable: false,
			valueEditable: false
		},
		{
			key: 'key2',
			value: 'value',
			keyEditable: false,
			valueEditable: false
		}
	])
	const onAddItem = () => {
		setData([
			...data,
			{ key: '', value: '', keyEditable: true, valueEditable: true }
		])
	}
	const onRemoveItem = (index: number) => {
		const newData: DataItem[] = []
		for (const [i, datum] of data.entries()) {
			if (i !== index) {
				newData.push(datum)
			}
		}
		console.log(newData.map(item => item.key).toString(), index)
		setData(newData)
	}
	return (
		<List
			className='overflow-auto'
			bordered
			dataSource={data}
			header={
				<div className='flex'>
					<div>metadata list</div>
					<div className='flex flex-1 flex-row-reverse'>
						<Button onClick={onAddItem}>新增</Button>
					</div>
				</div>
			}
			renderItem={(item, index) => (
				<List.Item key={index}>
					<Space direction='vertical' className='w-full'>
						<Space.Compact block>
							<Input
								defaultValue={item.key}
								className='flex-1'
								placeholder='key'
							/>
							<Input
								id='a'
								defaultValue={item.value}
								className='flex-1'
								placeholder='value'
							/>
							<Button onClick={() => onRemoveItem(index)}>删除</Button>
						</Space.Compact>
					</Space>
				</List.Item>
			)}
		/>
	)
}

const items: TabsProps['items'] = [
	{
		key: 'message',
		children: <MessageEdit />,
		label: 'request'
	},
	{
		key: 'metadata',
		children: <MetadataEdit />,
		label: 'metadata'
	}
]

export default function Request(): ReactElement {
	return <Tabs className='h-full' items={items} />
}
