import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type TabStoreItemType = {
	key: string
	label: string
}

type TabStoreType = {
	activeKey?: string
	items: TabStoreItemType[]
}

const data: TabStoreType = {
	items: []
}

export const homeTabs = createSlice({
	name: 'homeTab',
	initialState: {
		value: data
	},
	reducers: {
		addTab: (state, action: PayloadAction<TabStoreItemType>) => {
			state.value = {
				activeKey: action.payload.key,
				items: [...state.value.items, action.payload]
			}
		},
		removeTab: (
			state,
			action: PayloadAction<{ removeKey: string; activeKey?: string }>
		) => {
			const temp: TabStoreItemType[] = []
			for (const item of state.value.items) {
				if (item.key !== action.payload.removeKey) {
					temp.push(item)
				}
			}
			state.value.items = temp
			state.value.activeKey = action.payload.activeKey
		}
	}
})

export const { addTab, removeTab } = homeTabs.actions

export default homeTabs.reducer
