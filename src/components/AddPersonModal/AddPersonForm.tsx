import React from 'react'
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import { useFormik } from 'formik'
import * as Yup from 'yup';
// import { Grid, Button } from "semantic-ui-react";
import { 
  Form, 
  Button,
  Space,
  Input,
  Row,
  Col
} from 'antd'
import { nameRules } from './validationRules';

interface Props {
  onSubmit: () => void;
  onCancel: () => void;
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

const AddPersonForm = ({ onSubmit, onCancel } : Props ) => {
  // const formik = useFormik({
  //   initialValues: {
  //     firstName: '',
  //     lastName: ''
  //   },
  //   validationSchema: validationSchema,
  //   // onSubmit: {onSubmit},
  //   onSubmit: (values : any) => {
  //     // same shape as initial values
  //     console.log(values);
  //   },
  // });
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name='AddPersonForm'
      initialValues={{
        name: {
          firstName: '',
          lastName: ''
        }
      }}
      labelCol={{ span: 4, offset: 3 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      // requiredMark={'optional'}
      onFinish={(values : any) => {
            // same shape as initial values
            console.log(values);
      }}
      onFinishFailed={onFinishFailed}
    >

      <Form.Item label='name'>
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

      
      <div>
        <Button htmlType='submit'>submit</Button>
      </div>

    </Form>



    // <Formik
    //   initialValues={
    //     {
    //       firstName: '',
    //       lastName: ''
    //     }
    //   }
    //   onSubmit={values => {
    //     // same shape as initial values
    //     console.log(values);
    //   }}
    //   validationSchema={validationSchema}
    // >
    //   {({ isValid, dirty, values, errors }) => (
    //      <Form>
    //        <Field 
    //         name='firstName'
    //         label='first name'
    //         placeholder='first name'

    //       />
    //        <ErrorMessage name="firstName" />
    //        <Field 
    //         name="lastName" 
    //         label="last name"
    //         placeholder='last name'
    //       />
    //        <ErrorMessage name="lastName" />
    //        <Grid>
    //             <Grid.Column floated="left" width={5}>
    //               <Button type="button" onClick={onCancel} color="red">
    //                 Cancel
    //               </Button>
    //             </Grid.Column>
    //             <Grid.Column floated="right" width={5}>
    //               <Button
    //                 type="submit"
    //                 floated="right"
    //                 color="green"
    //                 disabled={!dirty || !isValid}
    //               >
    //                 Add
    //               </Button>
    //             </Grid.Column>
    //           </Grid>
    //      </Form>
    //    )}
    // </Formik>
  )
}

export default AddPersonForm