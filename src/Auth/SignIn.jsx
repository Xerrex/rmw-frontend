import { useState } from 'react';
import { Modal, Form, Input } from 'antd';
import { useNavigate } from 'react-router';
import useAlertsContext from '../AlertContext/useAlertsContextHook';
import useAuthContext from './AuthContext/useAuthContext';
import { signInHandler } from './backendHandler';
import { alertTypes } from '../utils/definitions';


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};


function SignIn({isOpen, setIsOpen, navigateTo}) {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const {addAlert} = useAlertsContext();
  const {saveUserDetails} = useAuthContext();
  const [disableOk, setDisableOk] = useState(false);
  const [disableCancel, setDisableCancel] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const moveTo = navigateTo? navigateTo : "/dashboard";
  


  const handleSubmit = (values)=>{
    setDisableCancel(true) // NOTE: Disable the Cancel button
    setDisableOk(true) // NOTE: Disable the ok button
    setConfirmLoading(true) // Note: show the loading icon

    // TODO: Get Sign In details
    signInHandler(values)
    .then((resData)=>{
      if(resData.success){
        saveUserDetails(resData.data);
        addAlert(alertTypes.success, "Sign In", "Sign in into you account was successful");
        form.resetFields();
        setIsOpen(false)
        navigate(moveTo, {replace:true});  // move to dashboard on Sign in.
        // TODO: Move to location where Sign in was triggered from
      }else{
        addAlert(alertTypes.error, "Sign In", resData.error);
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
          <Input/>
        </Form.Item>

        <Form.Item name="password" label="Password" rules={[{ required: true, message: "Please Provide a password" }]}>
          <Input.Password/>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default SignIn