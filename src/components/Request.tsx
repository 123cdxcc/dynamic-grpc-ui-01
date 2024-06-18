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
	}
	const [data, setData] = useState<DataItem[]>([])
	const onAddItem = () => {
		setData([...data, { key: '', value: '' }])
	}
	const onRemoveItem = (index: number) => {
		const newData: DataItem[] = []
		for (const [i, datum] of data.entries()) {
			if (i !== index) {
				newData.push(datum)
			}
		}
		setData(newData)
	}
	const onKeyChangeHanlder = (value: string, index: number) => {
		data[index].key = value
	}
	const onValueChangeHanlder = (value: string, index: number) => {
		data[index].value = value
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
					<Space.Compact block>
						<Input
							defaultValue={item.key}
							className='flex-1'
							placeholder='key'
							onChange={e => onKeyChangeHanlder(e.target.value, index)}
						/>
						<Input
							id='a'
							defaultValue={item.value}
							className='flex-1'
							placeholder='value'
							onChange={e => onValueChangeHanlder(e.target.value, index)}
						/>
					</Space.Compact>
					<Button onClick={() => onRemoveItem(index)} type='link' danger>
						删除
					</Button>
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
