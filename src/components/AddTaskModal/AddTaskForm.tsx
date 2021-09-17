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
  Card
} from 'antd'
import { nameRules } from './validationRules';
import { MinusCircleTwoTone, PlusOutlined } from '@ant-design/icons';
import { Person, TaskFormValues, WeekDay } from '../../types';
const { Option } = Select;
const { Title } = Typography

interface Props {
  onSubmit: (values: TaskFormValues) => Promise<void>;
  onCancel: (modalType : 'person' | 'task') => void;
  peopleData: Person[]
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

// let daysDeleted = 0

const AddTaskForm = ({ onSubmit, onCancel, peopleData } : Props ) => {
  const [form] = Form.useForm();
  const [availableDays, setDays] = useState(dayOptions)
  // const [radioValue, setRadio] = useState('full')
  // const [daySelection, setDaySelection] = useState(daySelections)
  // const [daysDeleted, setDaysDeleted] = useState(0)

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
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
            //   errorMessage('must enter a schedule')
            //   throw new Error('must enter schedule')
              
            // }
            console.log(fieldsValues)
            const values : TaskFormValues = {
              ...fieldsValues,
              'name': fieldsValues.name.trim().toLowerCase(),
              'category': fieldsValues.category.trim().toLowerCase()
              // 'schedule': fieldsValues.schedule.map((day: any) => {
              //   return {
              //     ...day,
              //     time: {
              //       start: day.time.start.format('HH:mm'),
              //       end: day.time.end.format('HH:mm'),
              //     }
              //   }
              // })
            }

            console.log(values)
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
            // tooltip="This is a required field"
            rules={nameRules}
          >
            <Input placeholder='task name'/>
          </Form.Item>
      </Form.Item>
      <Divider>
        <Title level={2} > task category </Title>
      </Divider>
      <Form.Item 
      // label='name'
      // labelCol={{ span: 4, offset: 3 }}
      wrapperCol={{ span: 6, offset: 9 }}>
          <Form.Item
            // validateTrigger="onBlur"
            name='category'
            required
            hasFeedback
            // tooltip="This is a required field"
            rules={nameRules}
          >
            <Input placeholder='task category'/>
          </Form.Item>
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
                          >
                          <Radio.Group name='radioGroup' onChange={handleRadioChange} value={true} >
                            <Radio value={true}>full day</Radio>
                            <Radio value={false}>set time(s)</Radio>
                          </Radio.Group>
                        </Form.Item>
                      ) : null
                    }}
                  </Form.Item>
                  <MinusCircleTwoTone twoToneColor="#eb2f96" onClick={() => remove(name)} />
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
                                      // { key, name, fieldKey, ...restField }
                                      return (
                                        <Form.Item
                                        key={subField.key}
                                        // {...restField}
                                        name={[`task-${index}`]}
                                        // fieldKey={[fieldKey, subField.fieldKey, `task-${index}`]}
                                        rules={[{ required: true, message: 'missing time' }]}
                                        >
                                          <Space align="baseline" >
                                            <Form.Item
                                              // {...restField}
                                              name={[`task-${index}`, 'time', 'start']}
                                              // fieldKey={[fieldKey, subField.fieldKey, 'start']}
                                              rules={[{ required: true, message: 'please select start time for task.' }]}
                                            >
                                              <TimePicker placeholder='start time' minuteStep={5} showNow={false} use12Hours format='h:mm a'/>
                                            </Form.Item>
                                            {/* <Form.Item
                                              // {...restField}
                                              name={[name, 'subtasks', 'time', 'end']}
                                              fieldKey={[fieldKey, 'end']}
                                              rules={[{ required: true, message: 'please select end time for task' }]}
                                            >
                                              <TimePicker placeholder='end time' use12Hours minuteStep={5} showNow={false} format='h:mm a'/>
                                            </Form.Item> */}
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
                              {/* <Form.Item
                                wrapperCol={{span:10, offset:7}}
                                shouldUpdate
                              >
                                {({ getFieldValue }) =>
                                  !getFieldValue(['schedule']) || getFieldValue(['schedule'])?.length < 7 ? (
                                          <Form.Item
                                          wrapperCol={{ span: 14, offset: 5 }}
                                          style={{marginTop: 8}}>
                                          <Button type="dashed" shape='round' onClick={() => add()} block icon={<PlusOutlined />}>
                                            add time
                                          </Button>
                                        </Form.Item>
                                        ) : null
                                  }
                              </Form.Item> */}
                              {/* <Space align="baseline" >
                                <Form.Item
                                  {...restField}
                                  name={[name, 'time', 'start']}
                                  fieldKey={[fieldKey, 'start']}
                                  rules={[{ required: true, message: 'please select start time.' }]}
                                >
                                  <TimePicker placeholder='start time' minuteStep={5} showNow={false} use12Hours format='h:mm a'/>
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  name={[name, 'time', 'end']}
                                  fieldKey={[fieldKey, 'end']}
                                  rules={[{ required: true, message: 'please select end time' }]}
                                >
                                  <TimePicker placeholder='end time' use12Hours minuteStep={5} showNow={false} format='h:mm a'/>
                                </Form.Item>
                              </Space> */}
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
                // </Col>
                // </Row>
                // </Space>

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
        name={'tasks'}
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