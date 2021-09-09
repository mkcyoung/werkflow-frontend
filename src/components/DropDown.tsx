import React from 'react'
import { Task, Person } from '../types'
import { Select } from 'antd';

interface Props {
    task: Task
}

const { Option } = Select;

function onChange(value: any) {
  console.log(`selected ${value}`);
}

function onBlur() {
  console.log('blur');
}

function onFocus() {
  console.log('focus');
}

function onSearch(val: any) {
  console.log('search:', val);
}

const DropDown = ({ task } : Props) => {

    return (
        <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onSearch={onSearch}
            filterOption={(input, option) =>
                option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
            {task.people?.map((person : Person) => 
                person && <Option key={person.id} value={person.firstName.toLowerCase()}>{`${person.firstName} ${person.lastName}`}</Option>
            ) // here is where I would add some sorting logic - or maybe filter option
            }
        </Select>
    )
}

export default DropDown