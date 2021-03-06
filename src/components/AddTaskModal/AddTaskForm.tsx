import React, { useState } from 'react'
import * as Yup from 'yup';
import { 
  Form, 
  Button,
  Space,
  Input,
  Row,
  Col,
  Select,
  TimePicker,
  Typography,
  Divider,
  message,
  Radio,
  Card,
  InputNumber,
  AutoComplete
} from 'antd'
import { nameRules } from './validationRules';
import { MinusCircleTwoTone, PlusOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Person, TaskFormValues, WeekDay, Task } from '../../types';
const { Option } = Select;
const { Title } = Typography

interface Props {
  onSubmit: (values: TaskFormValues) => Promise<void>;
  onCancel: (modalType : 'person' | 'task') => void;
  peopleData: Person[];
  taskData: Task[];
}

const errorMessage = (error : string) => {
  message.error(error)
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const dayOptions = [
  {value: 'sunday', label:'Sunday'},
  {value: 'monday', label:'Monday'},
  {value: 'tuesday', label:'Tuesday'},
  {value: 'wednesday', label:'Wednesday'},
  {value: 'thursday', label:'Thursday'},
  {value: 'friday', label:'Friday'},
  {value: 'saturday', label: 'Saturday'}
]

const daySelections = {
  'sunday': false,
  'monday':false,
  'tuesday':false,
  'wednesday': false,
  'thursday':false,
  'friday':false,
  'saturday': false
}

const onlyUnique = (value: any, index: any, self: any) => {
  return self.indexOf(value) === index;
}

// let daysDeleted = 0

const AddTaskForm = ({ onSubmit, onCancel, peopleData, taskData } : Props ) => {
  const [form] = Form.useForm();
  const [availableDays, setDays] = useState(dayOptions)
  // Set up task categories
  const taskCategories = taskData.length > 0 ? taskData
                          .map(task => task.category)
                          .filter(onlyUnique)
                          .map(task => {
                            return {
                              value: task
                            }
                          }) : [{value: ''}]
  // const [newCategoryName, setNewCategoryName] = useState('')
  // const [radioValue, setRadio] = useState('full')
  // const [daySelection, setDaySelection] = useState(daySelections)
  // const [daysDeleted, setDaysDeleted] = useState(0)

  // const addNewCategory = (newCat: string) => {
  //   console.log("add new cat: ",newCat)
  //   setCategories(taskCategories.concat(newCat).filter(onlyUnique))
  // }

  // const onCatChange = (event : any) => setNewCategoryName(event.target.value)

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    errorMessage(errorInfo)
  };

  const handleDaySelection = (value: WeekDay) => {
    // console.log(value)
    const selectedDays = form.getFieldsValue().schedule.map((day:any)=> day ? day.day : '')
    // console.log(selectedDays)
    setDays(dayOptions.filter((dayObj)=> !selectedDays.includes(dayObj.value) ))
    // const updateDaySelection = {...daySelections}
    // selectedDays.forEach((day: WeekDay) => {
    //   updateDaySelection[day] = true
    // })
    // console.log(updateDaySelection)
    // setDaySelection(updateDaySelection)
    console.log('ALL FIELDS: ',form.getFieldsValue())
  }

  const removeDay = (name: any, remove: any) => {
    remove(name)
    // Update available days when we remove a day
    const selectedDays = form.getFieldsValue().schedule.map((day:any)=> day ? day.day : '')
    setDays(dayOptions.filter((dayObj)=> !selectedDays.includes(dayObj.value) ))
  }


  // const handleTimeSelection = (time : any, timeString : string[]) => {
  //   console.log(time, timeString)
  // }

  const handlePersonSelection = (value:any) => {
    console.log(`selected: ${value}`)
  }

  const handleRadioChange = (e:any) => {
    console.log(`selected: ${e.target.value}`)
    // setRadio(e.target.value)
  }


  return (
    <Form
      form={form}
      name='AddTaskForm'
      autoComplete='off'
      initialValues={{
        name: undefined,
        category: undefined,
        // schedule: [
        //   {
        //     day: undefined,
        //     fullDay: true,

        //   }
        // ],
      }}
      layout="horizontal"
      // requiredMark={'optional'}
      onFinish={(fieldsValues : any)  => {
            // same shape as initial values
            // console.log(fieldsValues);
            // if(!fieldsValues.schedule || fieldsValues.schedule.length === 0){
            //   errorMessage('must enter a schedule for task')
            //   throw new Error('must enter schedule')
              
            // }
            // console.log(fieldsValues)
            const values : TaskFormValues = {
              ...fieldsValues,
              'name': fieldsValues.name.trim(),
              'category': fieldsValues.category.trim(),
              'schedule': !Array.isArray(fieldsValues.schedule) ? null : fieldsValues.schedule.map((day: any) => {
                return {
                  ...day,
                  subTasks: day.fullDay ? null : day.subTasks.map((subtask: any) => {
                    return {
                      start: subtask.time.start.format('HH:mm'),
                      end: subtask.time.end.format('HH:mm'),
                    }
                  })
                }
              })
            }

            // console.log(values)
            onSubmit(values)
      }}
      onFinishFailed={onFinishFailed}
    >
      <Divider>
        <Title level={2} > task name </Title>
      </Divider>
      <Form.Item 
      // label='name'
      // labelCol={{ span: 4, offset: 3 }}
      wrapperCol={{ span: 6, offset: 9 }}>
          <Form.Item
            // validateTrigger="onBlur"
            name='name'
            required
            hasFeedback
            // label
            // tooltip="enter the name of the task"
            rules={nameRules}
          >
            <Input placeholder='task name'/>
          </Form.Item>
      </Form.Item>
      <Divider>
        <Title level={2} > task category </Title>
      </Divider>
      <Form.Item
        wrapperCol={{ span: 6, offset: 9 }}
        name='category'
      >
        <AutoComplete
          options={taskCategories}
          placeholder='enter task category'
          filterOption={(inputValue, option) =>
            option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
      </Form.Item>
      <Divider>
        <Title level={2}> task time </Title>
      </Divider>
      <Form.Item 
      // label='name'
      // labelCol={{ span: 4, offset: 3 }}
      wrapperCol={{ span: 6, offset: 9 }}
      name='taskTime'
      required
      hasFeedback
      >
        <InputNumber min={0} placeholder='# hours task typically takes'/>
      </Form.Item>

      <Divider>
        <Title level={2}> weekly schedule </Title>
      </Divider>

      <Form.Item
      // labelCol={{ span: 3, offset: 4}}
      wrapperCol={{ span: 16, offset: 4}}
      > 
        <Form.List name="schedule">
          {(fields, { add, remove }) => {
            console.log("in form list: ",fields)
            // readjusts fields keys incase there have been deletions
            fields = fields.map(({ ...restField }, index) => {
              return {
                ...restField,
                key: index,
                fieldKey: index
              }
            })
            return (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => {
                // need to update the key when I choose to delete fields
                // key = key - daysDeleted
                // fieldKey = fieldKey - daysDeleted
                return (
                // <Space key={key} >
                  // <Row key={key} justify='center'>
                  //   <Col span={15} >
                <Card key ={key} style={{ margin: 8 }}>
                  <Space align='baseline'>
                  <Form.Item
                    // label='day'
                    {...restField}
                    name={[name, 'day']}
                    fieldKey={[fieldKey, 'day']}
                    rules={[{ required: true, message: 'Missing day' }]}
                  >
                    <Select
                      onChange={handleDaySelection}
                      style={{ width: 120 }}
                      allowClear={true}
                      placeholder='select day'
                    >
                      {
                        availableDays.map((day)=> (
                          <Option key={day.value} value={day.value}> {day.label} </Option>
                        ))
                      }
                    </Select>
                  </Form.Item>
                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) => prevValues.schedule.length <= currentValues.schedule.length ? true : false }
                  >
                    {({ getFieldValue }) => {
                      console.log("in get field value for radio: ",getFieldValue(['schedule'])[key])
                      console.log(`key: ${key} fieldKey: ${fieldKey}`)
                      return getFieldValue(['schedule'])[key]?.day ? (
                        <Form.Item
                          name={[name,'fullDay']}
                          required
                          >
                          <Radio.Group name='radioGroup' onChange={handleRadioChange} value={true} >
                            <Radio value={true}>full day</Radio>
                            <Radio value={false}>set time(s)</Radio>
                          </Radio.Group>
                        </Form.Item>
                      ) : null
                    }}
                  </Form.Item>
                  <MinusCircleTwoTone twoToneColor="#eb2f96" onClick={() => removeDay(name,remove)} />
                  </Space>
                  <Form.Item
                    noStyle
                    shouldUpdate
                  >
                    {({ getFieldValue }) => {
                      if (getFieldValue(['schedule'])[key]?.day) {
                        // console.log(getFieldValue(['schedule']))
                        return getFieldValue(['schedule'])[key].fullDay === false ? (
                          <>
                            <Form.List 
                            name={[name,'subTasks']}
                            >
                              {(subFields, subTaskFns ) => {
                                console.log("in subtasks list",subFields)
                                return (
                                  <>
                                    {subFields.map((subField, index) => {
                                      
                                      return (
                                        <Form.Item
                                        {...subField}
                                        key={subField.key}
                                        name={[subField.name, 'time']}
                                        fieldKey={[fieldKey, subField.fieldKey]}
                                        // rules={[{ required: true, message: 'missing time' }]}
                                        >
                                          <Space align="baseline" >
                                            <Form.Item
                                              {...subField}
                                              name={[subField.name, 'time', 'start']}
                                              fieldKey={[fieldKey, subField.fieldKey, 'start']}
                                              rules={[{ required: true, message: 'please select start time for task.' }]}
                                            >
                                              <TimePicker placeholder='start time' minuteStep={5} showNow={false} use12Hours format='h:mm a'/>
                                            </Form.Item>
                                            <Form.Item
                                              {...subField}
                                              name={[subField.name,'time', 'end']}
                                              fieldKey={[fieldKey, subField.fieldKey, 'end']}
                                              rules={[{ required: true, message: 'please select end time for task' }]}
                                            >
                                              <TimePicker placeholder='end time' use12Hours minuteStep={5} showNow={false} format='h:mm a'/>
                                            </Form.Item>
                                            <MinusCircleTwoTone twoToneColor="#eb2f96" onClick={() => subTaskFns.remove(subField.name)} />
                                          </Space>
                                        </Form.Item>
                                        )
                                      })
                                    }
                                    <Form.Item
                                      wrapperCol={{span:10, offset:7}}
                                      shouldUpdate
                                    >
                                      {({ getFieldValue }) =>
                                        !getFieldValue(['schedule']) || getFieldValue(['schedule'])?.length < 7 ? (
                                                <Form.Item
                                                wrapperCol={{ span: 14, offset: 5 }}
                                                style={{marginTop: 8}}>
                                                <Button type="dashed" shape='round' onClick={() => subTaskFns.add()} block icon={<PlusOutlined />}>
                                                  add time
                                                </Button>
                                              </Form.Item>
                                              ) : null
                                        }
                                    </Form.Item>   
                                  </>                            
                                )}
                              }

                            </Form.List>
                          </> 
                        ):
                        null
                      } else {
                        return null
                      }
                    }
                  }
                  </Form.Item>
                </Card>

              )}
              )}
              <Form.Item
              shouldUpdate>
              {({ getFieldValue }) =>
                !getFieldValue(['schedule']) || getFieldValue(['schedule'])?.length < 7 ? (
                        <Form.Item
                        wrapperCol={{ span: 14, offset: 5 }}
                        style={{marginTop: 8}}>
                        <Button type="dashed" shape='round' onClick={() => add()} block icon={<PlusOutlined />}>
                          add day
                        </Button>
                      </Form.Item>
                      ) : null
                }
              </Form.Item>
            </>
          )}
          }
        </Form.List>
      </Form.Item>
      <Divider>
        <Title level={2}> add people </Title>
      </Divider>
      <Form.Item
        wrapperCol={{ span: 14, offset: 5 }}
        name='people'
      >
        <Select
          mode='multiple'
          allowClear
          optionFilterProp='children'
          placeholder="select people"
          onChange={handlePersonSelection}
          filterOption={(input, option) =>  
            option?.children.join('').toLowerCase().indexOf(input.toLowerCase()) >= 0 
          }

        >
          {
            peopleData.map((person)=> (
              <Option key={person.id} value={person.id}> {person.name.first} {person.name.last} </Option>
            ))
          }
        </Select>
      </Form.Item>

      
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default AddTaskForm