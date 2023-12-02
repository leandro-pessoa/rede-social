// import dos módulos
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

// import das tipagens especificadas na store
import type { RootState, AppDispatch } from '../features/store'

// exports do 'useDispatch' e 'useSelector' devidamente tipados
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector