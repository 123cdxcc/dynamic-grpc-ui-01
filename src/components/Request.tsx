import type { TabsProps } from 'antd'
import { List, Tabs } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import type { ReactElement } from 'react'

function MessageEdit(): ReactElement {
	return <TextArea style={{ height: '100%', resize: 'none' }} />
}

function MetadataEdit(): ReactElement {
	const data = ['a', 'b', 'c']
	return (
		<List
			bordered
			dataSource={data}
			renderItem={item => <List.Item>{item}</List.Item>}
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
	return <Tabs items={items} />
}
