import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import {
  BrowserRouter as Router
} from 'react-router-dom'
import 'antd/dist/antd.css' //ANTD styling components

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
)


