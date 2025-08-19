import { useState } from 'react';
import { Modal, Form, Input } from 'antd';
import useAlertsContext from '../AlertContext/useAlertsContextHook';
import { signUpHandler } from './backendHandler';
import { alertTypes } from '../utils/definitions';


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};


function SignUp({isOpen, setIsOpen}) {
  const [form] = Form.useForm();
  const {addAlert} = useAlertsContext();
  const [disableOk, setDisableOk] = useState(false);
  const [disableCancel, setDisableCancel] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOnOk = ()=>{
    setDisableCancel(true) // NOTE: Disable the Cancel button
    setDisableOk(true) // NOTE: Disable the ok button
    setConfirmLoading(true) // Note: show the loading icon
    
    form.validateFields()
    .then((values)=>{

      signUpHandler(values)
      .then((resData)=>{
        
        if(resData !== null){
          form.setFieldsValue({})
          setIsOpen(false)

          addAlert(alertTypes.success, "Create account", `Account '${resData.details.email}' was created successfully`);
          // TODO: alert with more info
          // TODO: move to SignIN.
          // TODO: Move to location where Sign in was triggered from
        }else{
          addAlert(alertTypes.error, "Create account", "Account was not created successfully");
        }
      })

      setDisableCancel(false);
      setDisableOk(false);
      setConfirmLoading(false);

    }).catch((errorInfo)=>{
      //alert Found errors
       console.log("Form Errors", errorInfo) // TODO: remove
       addAlert(alertTypes.error, "Sign in", "Sign in was not successful");
        
      setDisableCancel(false); // NOTE: Disable the Cancel button
      setDisableOk(false);
      setConfirmLoading(false);
    })
   
  }
  
  const handleOnCancel = ()=>{
    form.setFieldsValue({});
    setIsOpen(false)
  }
  

  return (
    <Modal title="Create an account" centered closable={false} open={isOpen} 
      onOk={() => handleOnOk()} onCancel={() => handleOnCancel()}
      okText="SignUp"  cancelText="Cancel" okButtonProps={{disabled: disableOk}}
      cancelButtonProps={{ disabled: disableCancel }} confirmLoading={confirmLoading}>
      <Form {...layout} form={form} name="signup" style={{ maxWidth: 600 }}>
        
        <Form.Item name="firstName" label="First Name" rules={[{ required: true, message: "Please provide a first name"}]}>
          <Input />
        </Form.Item>

        <Form.Item name="lastName" label="Last Name" rules={[{ required: true, message: "Please provide a last name"}]}>
          <Input />
        </Form.Item>

        <Form.Item name="email" label="Email" rules={[{ required: true, message: "Please Provide a valid Email"}]}>
          <Input />
        </Form.Item>
  
        <Form.Item name="password" label="Password" rules={[{ required: true, message: "Please Provide a password" }]}>
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default SignUp