import { useState } from 'react';
import { Modal, Form, Input} from 'antd';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
    md: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
    md: { span: 18 }
  },
};

function JoinRide({isOpen, setIsOpen}) {
  const [form] = Form.useForm();
  const [disableOk, setDisableOk] = useState(false);
  const [disableCancel, setDisableCancel] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);


  const handleSubmit = (values) => {
      setDisableCancel(true) // NOTE: Disable the Cancel button
      setDisableOk(true) // NOTE: Disable the ok button
      setConfirmLoading(true) // Note: show the loading icon
      
    
      console.log('Form values:', values);
  
      form.resetFields();
      setIsOpen(false);
    };

  const handleOnCancel = () => {
    setIsOpen(false);
    form.resetFields();
  };

  return (
    <Modal title="Join Ride" centered closable={false} open={isOpen} 
      onOk={() => form.submit()} onCancel={() => handleOnCancel()}
      okText="Join"  cancelText="Cancel" okButtonProps={{disabled: disableOk}}
      cancelButtonProps={{ disabled: disableCancel }} confirmLoading={confirmLoading}>
      
      <Form {...formItemLayout} form={form} name="create_ride" onFinish={handleSubmit} style={{ maxWidth: 600 }}>

      </Form>
        
    </Modal>
  )
}

export default JoinRide;