import { combineReducers , configureStore } from '@reduxjs/toolkit'
import dashboard from "./dashboard"
const reducers = combineReducers({
  dashboard
})


export default configureStore(
  {reducer: reducers}
)