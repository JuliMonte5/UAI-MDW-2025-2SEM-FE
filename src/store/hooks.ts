import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from './store'

// Hooks tipados para usar en toda la aplicación
// Estos hooks ya tienen los tipos correctos del store
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
