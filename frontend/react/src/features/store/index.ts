// import do módulo
import { configureStore } from "@reduxjs/toolkit"

// import do reducer
import { colorReducer } from "../reducers"

// declaração da store
export const store = configureStore({
    reducer: {
        theme: colorReducer
    }
})

// exports das tipagens que serão utilizadas no arquivo 'app/hooks.ts'
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch