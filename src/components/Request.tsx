import type { TableColumnsType, TabsProps } from 'antd'
import { Table, Tabs } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import type { ReactElement } from 'react'

function MessageEdit(): ReactElement {
	return <TextArea style={{ height: '100%', resize: 'none' }} />
}

function MetadataEdit(): ReactElement {
	interface DataType {
		key: React.Key
		name: string
		age: number
		address: string
	}

	const columns: TableColumnsType<DataType> = [
		{
			title: 'Name',
			dataIndex: 'name',
			render: (text: string) => <div>{text}</div>
		},
		{
			title: 'Age',
			dataIndex: 'age'
		},
		{
			title: 'Address',
			dataIndex: 'address'
		}
	]

	const data: DataType[] = [
		{
			key: '1',
			name: 'John Brown',
			age: 32,
			address: 'New York No. 1 Lake Park'
		},
		{
			key: '2',
			name: 'Jim Green',
			age: 42,
			address: 'London No. 1 Lake Park'
		},
		{
			key: '3',
			name: 'Joe Black',
			age: 32,
			address: 'Sydney No. 1 Lake Park'
		},
		{
			key: '4',
			name: 'Disabled User',
			age: 99,
			address: 'Sydney No. 1 Lake Park'
		}
	]
	const rowSelection = {
		onChange: (
			selectedRowKeys: React.Key[],
			selectedRows: DataType[]
		): void => {
			console.log(
				`selectedRowKeys: ${selectedRowKeys.toString()}`,
				'selectedRows:',
				selectedRows
			)
		},
		getCheckboxProps: (record: DataType) => ({
			disabled: record.name === 'Disabled User', // Column configuration not to be checked
			name: record.name
		})
	}
	return (
		<Table
			rowSelection={{
				type: 'checkbox',
				...rowSelection
			}}
			pagination={false}
			columns={columns}
			dataSource={data}
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
