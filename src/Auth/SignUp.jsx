import { Modal } from 'antd';

function SignUp({isOpen, setIsOpen}) {
  return (
    <Modal title="Sign up" centered
      open={isOpen} onOk={() => setIsOpen(false)} onCancel={() => setIsOpen(false)}
      okText="SignUp"  cancelText="Cancel">
      <p>some contents...</p>
      <p>some contents...</p>
      <p>some contents...</p>
    </Modal>
  )
}

export default SignUp