import { Tabs, TabsProps } from 'antd'
import InterfaceContent from 'components/InterfaceContent'
import { useAppDispatch, useAppSelector } from 'hooks'
import { useState, type ReactElement } from 'react'
import { addTab, removeTab } from './HomeStore'

type TargetKey = React.KeyboardEvent | React.MouseEvent | string

export default function HomePage(): ReactElement {
	const homeStore = useAppSelector(state => state.homeTabs.value)
	const items: TabsProps['items'] = homeStore.items.map(item => ({
		key: item.key,
		label: item.label,
		children: <InterfaceContent />
	}))
	const dispatch = useAppDispatch()
	const [activeKey, setActiveKey] = useState<string>(homeStore.activeKey ?? '')

	const onChange = (key: string): void => {
		setActiveKey(key)
	}

	const add = (): void => {
		const temporaryActiveKey = `newTab${items.length}-${Date.now().toString}`
		const tab = {
			label: 'New Request',
			key: temporaryActiveKey
		}
		dispatch(addTab(tab))
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
		dispatch(
			removeTab({
				removeKey: targetKey.toString(),
				activeKey: temporaryActiveKey
			})
		)
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
