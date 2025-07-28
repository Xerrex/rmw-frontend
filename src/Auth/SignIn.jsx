import { useState } from 'react';
import { Modal, Form, Input } from 'antd';
import useAlertsContext from '../Contexts/useAlertsContextHook';
import { signInHandler } from './backendHandler';
import { alertTypes } from '../utils/definitions';


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};


function SignIn({isOpen, setIsOpen}) {
  const [form] = Form.useForm();
  const {addAlert} = useAlertsContext();
  const [disableOk, setDisableOk] = useState(false);
  const [disableCancel, setDisableCancel] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  


  const handleSubmit = (values)=>{
    console.log("Form values", values); // TODO: remove

    setDisableCancel(true) // NOTE: Disable the Cancel button
    setDisableOk(true) // NOTE: Disable the ok button
    setConfirmLoading(true) // Note: show the loading icon

    // TODO: Get Sign In details
    signInHandler(values)
    .then((resData)=>{
      if(resData !== null){
        addAlert(alertTypes.success, "Sign in", "Sign in into you account was successful");
        form.resetFields();
        setIsOpen(false)
        // TODO: move to dashboard on SignIN.
        // TODO: Move to location where Sign in was triggered from
      }else{
        addAlert(alertTypes.error, "Sign in", "Sign in into your account was not successful");
      }
    })

    setDisableCancel(false); // NOTE: Disable the Cancel button
    setDisableOk(false);
    setConfirmLoading(false);
    
  }
  
  const handleOnCancel = ()=>{
    form.setFieldsValue({})
    setIsOpen(false)
  }

   
  

  return (
    <Modal title="Sign In" centered closable={false} open={isOpen} 
      onOk={() => form.submit()} onCancel={() => handleOnCancel()}
      okText="SignIn"  cancelText="Cancel" okButtonProps={{disabled: disableOk}}
      cancelButtonProps={{ disabled: disableCancel }} confirmLoading={confirmLoading}>
    
    <Form {...layout} form={form} name="signin" onFinish={handleSubmit} style={{ maxWidth: 600 }}>
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

export default SignIn