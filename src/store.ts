import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'


// import notificationReducer from './reducers/notificationReducer'
import taskReducer from './reducers/taskReducer'
import peopleReducer from './reducers/peopleReducer'


const reducer = combineReducers({
    tasks: taskReducer,
    people: peopleReducer,
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store