import React from 'react'
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Box from '@mui/material/Box';
import { Menu } from 'antd'
import { Link } from "react-router-dom"
import PeopleIcon from '@mui/icons-material/People';
import TaskIcon from '@mui/icons-material/Task';
import {
    CalendarOutlined,
    TeamOutlined,
    PaperClipOutlined
  } from '@ant-design/icons';


const NavMenu = () => {
    const padding = {
      paddingRight: 5
    }
    return (
        <Menu defaultSelectedKeys={['calendar']} mode='horizontal'>
            <Menu.Item key='calendar' icon={<CalendarOutlined/>}>
                <Link to='/' style={padding}>Calendar</Link>
            </Menu.Item>
            <Menu.Item key='people' icon={<TeamOutlined/>}>
                <Link to='/people' style={padding}>People</Link>
            </Menu.Item>
            <Menu.Item key='tasks' icon={<PaperClipOutlined/>}>
                <Link to='/tasks' style={padding}>Tasks</Link>
            </Menu.Item>
        </Menu>
    )
}

export default NavMenu