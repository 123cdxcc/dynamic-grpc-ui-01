import { createSlice } from '@reduxjs/toolkit'

interface MetadataItemType {
	key?: string
	value?: string
}

interface InterfaceContentStoreType {
	requestUrl?: string
	methodName?: string
	requestValue?: string
	medadata?: MetadataItemType[]
}

const data: InterfaceContentStoreType = {}

const InterfaceContent = createSlice({
	name: 'interfaceContent',
	initialState: {
		value: data
	},
	reducers: {}
})

export default InterfaceContent.reducer
