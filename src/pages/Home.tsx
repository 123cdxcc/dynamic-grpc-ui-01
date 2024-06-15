import type { TabsProps } from 'antd'
import { Tabs } from 'antd'
import InterfaceContent from 'components/InterfaceContent'
import { useRef, useState, type ReactElement } from 'react'

type TargetKey = React.KeyboardEvent | React.MouseEvent | string

const initialItems: TabsProps['items'] = []

export default function HomePage(): ReactElement {
	const [activeKey, setActiveKey] = useState<string>()
	const [items, setItems] = useState(initialItems)
	const tabIndex = useRef(0)

	const onChange = (key: string): void => {
		setActiveKey(key)
	}

	const add = (): void => {
		const temporaryActiveKey = `newTab${tabIndex.current}`
		tabIndex.current += 1
		if (!items) {
			return
		}
		const panes = [...items]
		panes.push({
			label: 'New Request',
			children: <InterfaceContent />,
			key: temporaryActiveKey
		})
		setItems(panes)
		setActiveKey(temporaryActiveKey)
	}

	const remove = (targetKey: TargetKey): void => {
		let temporaryActiveKey = activeKey
		let lastIndex = -1
		if (!items) {
			return
		}
		for (const [index, item] of items.entries()) {
			if (item.key === targetKey) {
				lastIndex = index - 1
			}
		}
		const panes = items.filter(item => item.key !== targetKey)
		if (panes.length > 0 && temporaryActiveKey === targetKey) {
			temporaryActiveKey = lastIndex >= 0 ? panes[lastIndex].key : panes[0].key
		}
		setItems(panes)
		setActiveKey(temporaryActiveKey)
	}

	const onEdit = (
		targetKey: React.KeyboardEvent | React.MouseEvent | string,
		action: 'add' | 'remove'
	): void => {
		if (action === 'add') {
			add()
		} else {
			remove(targetKey)
		}
	}
	return (
		<div className='px-3 py-1'>
			<Tabs
				type='editable-card'
				items={items}
				activeKey={activeKey}
				onEdit={onEdit}
				onChange={onChange}
			/>
		</div>
	)
}
