import { configureStore } from '@reduxjs/toolkit'
import InterfaceContentReducer from 'components/InterfaceContentStore'
import homeTabsReducer from 'pages/HomeStore'

const store = configureStore({
	reducer: {
		homeTabs: homeTabsReducer,
		interfaceContent: InterfaceContentReducer
	}
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
