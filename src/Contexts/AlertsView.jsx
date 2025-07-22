import { Alert } from 'antd';


function AlertsView({rmwAlerts, removeAlert}) {
  

  return (
    <div className="flex flex-col w-3/4">
      {rmwAlerts.length>1 && rmwAlerts.map((alert, index)=>{
        return (
          <Alert type={alert.type} showIcon message={alert.message} 
            description={alert.description} closable onClose={()=>removeAlert(index)}/>)
      })}
    </div>
  )
}

export default AlertsView