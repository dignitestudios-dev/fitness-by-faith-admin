import React, { useEffect, useState } from 'react'
import TicketsList from '../components/Tickets/TicketsList'
import Loader from '../components/Global/Loader'
import Axios from "../axios"
import { ErrorToaster, SuccessToaster } from '../components/Global/Toaster'

const Tickets = () => {
  const [loading, setLoading] = useState(true)
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);
  const [mails , setMails] = useState("")

  const handleDelete = async (id) => {
    setDeleteLoadingId(id)
    try{
      const {data} = await Axios.delete(`support/delete/emails/${id}`)
      if(data?.status === 200){
        SuccessToaster("Ticket Deleted")
        getTicketMails()
      }
    }catch(err){
      console.log(err)
      ErrorToaster(err)
    }finally{
      setDeleteLoadingId(null)
    }
  }

  const getTicketMails = async()=>{
    try {
      setLoading(true)
      const { data } = await Axios.get("support/get/emails");
      setMails(data?.data)
      setLoading(false); 
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{
    getTicketMails()
  },[])
  
  return (
    <div className='min-h-screen'>
      <h1 className='text-xl font-semibold mb-6'>Support Requests</h1>
      {!loading ? <TicketsList mails={mails} handleDelete={(id)=>handleDelete(id)} deleteLoadingId={deleteLoadingId}/> : <Loader/> }
    </div>
  )
}

export default Tickets
