// imports do módulo
import { createSlice } from '@reduxjs/toolkit'

// tipagem do state
interface ColorState {
    theme: string
}

// declaração do state
const initialState: ColorState = {
    theme: 'dark'
}

// declaração e export do slice e declaração da action
export const ColorSlice = createSlice({
    name: 'color',
    initialState,
    reducers: {
        toggleTheme(state) {
            state.theme = state.theme === 'light' ? 'dark' : 'light'
        },
        setDefaultTheme(state) {
            state.theme = 'light'
        }
    }
})

// export da action
export const { toggleTheme, setDefaultTheme } = ColorSlice.actions

// export do reducer
export const colorReducer = ColorSlice.reducer


