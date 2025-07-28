import { Alert } from 'antd';


function AlertsView({rmwAlerts, removeAlert}) {
  
  return (
    <div className="flex flex-col p-2 md:w-3/5 w-3/4 absolute top-0">
      {rmwAlerts.length>0 && rmwAlerts.map((alert, index)=>{
        return (
          <div key={index} className="p-1">
            <Alert type={alert.type} showIcon message={alert.message} 
            description={alert.description} closable onClose={()=>removeAlert(index)}/>
          </div>
          )
      })}
    </div>
  )
}

export default AlertsView