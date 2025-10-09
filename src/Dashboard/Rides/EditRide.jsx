import React, {useState, useEffect} from 'react';
import { Modal, Form, Input, DatePicker, Button, Space } from 'antd';
import { CarOutlined, UserOutlined, EnvironmentOutlined } from '@ant-design/icons';


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

function EditRide({isOpen, setIsOpen, ride}) {
  const [form] = Form.useForm();
  const [disableOk, setDisableOk] = useState(false);
  const [disableCancel, setDisableCancel] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);


  useEffect(()=>{
    console.log("Editor Ride", ride);
    form.setFieldsValue({
      // depart_time: ride.depart_time,
      // end_time:ride.end_time, 
      seats: ride.seats,
      town_starting: ride.town_starting,
      town_ending: ride.town_ending,
    })
  },[ride, form])

  const handleSubmit = (values) => {
    setDisableCancel(true) // NOTE: Disable the Cancel button
    setDisableOk(true) // NOTE: Disable the ok button
    setConfirmLoading(true) // Note: show the loading icon
    
    console.log('Form values:', values);
     form.resetFields();
  };

  const handleOnCancel = () => {
    setIsOpen(false);
    form.resetFields();
  };

  return (
    <Modal title="Edit Ride" centered closable={false} open={isOpen} onOk={() => form.submit()} onCancel={() => handleOnCancel()}
      okText="Save"  cancelText="Cancel" okButtonProps={{disabled: disableOk}} cancelButtonProps={{ disabled: disableCancel }} 
      confirmLoading={confirmLoading}>

       <Form {...formItemLayout} form={form} name="create_ride" onFinish={handleSubmit} style={{ maxWidth: 600 }}>

        {/* town_starting */}
        <Form.Item name="town_starting" label={
            <span className="text-gray-700 dark:text-gray-300 font-medium"> Starting Town</span>
          } rules={[{ required: true, message: 'Please enter starting town!' }]} >
          <Input placeholder="Enter starting town" className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 
          text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            prefix={<EnvironmentOutlined className="text-gray-400" />} />
        </Form.Item>
        
        {/* town_ending */}
        <Form.Item name="town_ending" label={ <span className="text-gray-700 dark:text-gray-300 font-medium">Destination Town</span>}
          rules={[{ required: true, message: 'Please enter destination town!' }]}>
          <Input placeholder="Enter destination town" className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 
          text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            prefix={<EnvironmentOutlined className="text-gray-400" />} />
        </Form.Item>

        {/* depart_time */}
          <Form.Item name="depart_time" label={ <span className="text-gray-700 dark:text-gray-300 font-medium">Departure Time</span>}
            rules={[{ required: true, message: 'Please select departure time!' }]}>
           <DatePicker showTime format="YYYY-MM-DD HH:mm" className="w-full border-gray-300 dark:border-gray-600 [&_.ant-picker-input>input]:text-gray-900 
           [&_.ant-picker-input>input]:dark:text-white [&_.ant-picker-suffix]:text-gray-400" placeholder="Select date and time" />
          </Form.Item>
          
        {/* end_time */}
        <Form.Item name="end_time"  label={ <span className="text-gray-700 dark:text-gray-300 font-medium">Arrival Time</span>}
          rules={[{ required: true, message: 'Please select arrival time!' }]} >
          <DatePicker showTime format="YYYY-MM-DD HH:mm" className="w-full border-gray-300 dark:border-gray-600 [&_.ant-picker-input>input]:text-gray-900 
           [&_.ant-picker-input>input]:dark:text-white [&_.ant-picker-suffix]:text-gray-400" placeholder="Select date and time" />
        </Form.Item>

        {/* seats */}
        <Form.Item name="seats" label={<span className="text-gray-700 dark:text-gray-300 font-medium"> Available Seats</span>}
          rules={[{ required: true, message: 'Please enter number of seats!' },{ pattern: /^[1-9]\d*$/, message: 'Please enter a valid number!' } ]}>
          <Input  type="number" min="1" placeholder="Enter number of seats" className="border-gray-300 dark:border-gray-600 bg-white 
          dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            prefix={<UserOutlined className="text-gray-400" />}/>
        </Form.Item>
       </Form>
    </Modal>
  )
}

export default EditRide;