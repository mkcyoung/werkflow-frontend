import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import {
  BrowserRouter as Router
} from 'react-router-dom'
import 'antd/dist/antd.css' //ANTD styling components
import 'semantic-ui-css/semantic.min.css' //Semantic UI styling

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
)


