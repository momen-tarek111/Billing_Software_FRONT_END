import "./CustomerForm.css"

function CustomerForm({customerName,setCustomerName,mobileNumber,setMobileNumber}) {
  return (
    <div className="p-1">
        <div className='row-field'>
            <div className="d-flex align-items-center gap-2 row-field-container">
                <label htmlFor="customerName" className='col-4 label-form'>Customer Name</label>
                <input type="text" className='form-control customerNameField form-control-sm' id="customerName" onChange={(e)=>setCustomerName(e.target.value)} value={customerName} required/>
            </div>
        </div>
        <div className='row-field'>
            <div className="d-flex align-items-center gap-2 row-field-container">
                <label htmlFor="mobileNumber" className='col-4 label-form'>Mobile number</label>
                <input type="text" className='form-control form-control-sm customerNameField' id="mobileNumber" onChange={(e)=>setMobileNumber(e.target.value)} value={mobileNumber} required/>
            </div>
        </div>
    </div>
  )
}

export default CustomerForm