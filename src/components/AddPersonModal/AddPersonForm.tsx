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
  Divider
} from 'antd'
import { nameRules } from './validationRules';
import { MinusCircleTwoTone, PlusOutlined } from '@ant-design/icons';
import { Task, PersonFormValues } from '../../types';
const { Option } = Select;
const { Title } = Typography

interface Props {
  onSubmit: (values: PersonFormValues) => Promise<void>;
  onCancel: () => void;
  taskData: Task[]
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

const AddPersonForm = ({ onSubmit, onCancel, taskData } : Props ) => {
  const [form] = Form.useForm();
  const [availableDays, setDays] = useState(dayOptions)

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleDaySelection = () => {
    const selectedDays = form.getFieldsValue().schedule.map((day:any)=> day ? day.day : '')
    setDays(dayOptions.filter((dayObj)=> !selectedDays.includes(dayObj.value) ))
  }

  // const handleTimeSelection = (time : any, timeString : string[]) => {
  //   console.log(time, timeString)
  // }

  const handleTaskSelection = (value:any) => {
    console.log(`selected: ${value}`)
  }

  return (
    <Form
      form={form}
      name='AddPersonForm'
      initialValues={{
        name: {
          firstName: '',
          lastName: ''
        },
        // schedule: [
        //   {
        //     day: 'Sunday',
        //     startTime: '',
        //     endTime: '',
        //   }
        // ],
      }}
      layout="horizontal"
      // requiredMark={'optional'}
      onFinish={(fieldsValues : any)  => {
            // same shape as initial values
            console.log(fieldsValues);
            const values : PersonFormValues = {
              ...fieldsValues,
              'schedule': fieldsValues.schedule.map((day: any) => {
                return {
                  ...day,
                  time: {
                    start: day.time.start.format('HH:mm'),
                    end: day.time.end.format('HH:mm'),
                  }
                }
              })
            }
            console.log(values)
            onSubmit(values)
      }}
      onFinishFailed={onFinishFailed}
    >
      <Divider>
        <Title level={2} > name </Title>
      </Divider>
      <Form.Item 
      // label='name'
      // labelCol={{ span: 4, offset: 3 }}
      wrapperCol={{ span: 14, offset: 5 }}>
        <Space>
          <Form.Item
            // validateTrigger="onBlur"
            name={['name', 'first']}
            required
            hasFeedback
            // tooltip="This is a required field"
            rules={nameRules}
          >
            <Input placeholder='first name'/>
          </Form.Item>
          <Form.Item
            name={['name','last']}
            required
            hasFeedback
            // tooltip="This is a required field"
            rules={nameRules}
          >
            <Input placeholder='last name'/>
          </Form.Item>
        </Space>
      </Form.Item>
      <Divider>
        <Title level={2}> weekly schedule </Title>
      </Divider>

      <Form.Item
      // labelCol={{ span: 3, offset: 4}}
      // wrapperCol={{ span: 14, offset: 5}}
      > 
        <Form.List name="schedule">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <Space key={key} align="baseline">
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
                    label='time'
                    labelCol={{ span: 4, offset: 0 }}
                    // wrapperCol={{ span: 14 }}
                  >
                    <Space align="baseline">
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
                      <MinusCircleTwoTone twoToneColor="#eb2f96" onClick={() => remove(name)} />
                    </Space>
                  </Form.Item>
                
                </Space>
              ))}
              <Form.Item
                wrapperCol={{ span: 14, offset: 5 }}>
                <Button type="dashed" shape='round' onClick={() => add()} block icon={<PlusOutlined />}>
                  add day
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Divider>
        <Title level={2}> tasks </Title>
      </Divider>
      <Form.Item
        wrapperCol={{ span: 14, offset: 5 }}
        name={'tasks'}
      >
        <Select
          mode='multiple'
          allowClear
          placeholder="select tasks"
          onChange={handleTaskSelection}
        >
          {
            taskData.map((task)=> (
              <Option key={task.id} value={task.id}> {task.name} </Option>
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

export default AddPersonForm