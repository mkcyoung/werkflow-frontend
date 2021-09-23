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
// import { StyledEngineProvider } from '@mui/material/styles'; // material ui styles

ReactDOM.render(
  <Router>
    <Provider store={store}>
      {/* <StyledEngineProvider injectFirst> */}
        <App />
      {/* </StyledEngineProvider> */}
    </Provider>
  </Router>,
  document.getElementById('root')
)


