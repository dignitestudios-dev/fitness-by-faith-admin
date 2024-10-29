import React from "react";
import moment from "moment"

const List = ({subscription}) => {
  const convertText = (string = '') =>{
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }
  return (
    <div className="w-full overflow-x-auto rounded-xl bg-white px-6 py-4 mt-3">
      <table className="w-full border-collapse text-left text-sm text-gray-500">
        <thead className="">
          <tr className="">
            <th
              scope="col"
              className="px-6 lg:px-4 xl:px-0 py-4 font-medium text-base"
            >
              Date
            </th>
            <th
              scope="col"
              className="px-6 lg:px-4 xl:px-0 py-4 font-medium text-base"
            >
              Plan
            </th>
            <th
              scope="col"
              className="px-6 lg:px-4 xl:px-0 py-4 font-medium text-base"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 lg:px-4 xl:px-0 py-4 font-medium text-base"
            >
              Amount
            </th>
            
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {subscription?.map((item,index)=>{
            if(index < 5){
              return(
                <tr className="" key={index}>
                {/* <div className="relative h-10 w-10">
                  <img
                  className="h-full w-full rounded-full object-cover object-center"
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                  />
                  </div> */} 
                <td className="px-6 lg:px-4 xl:px-0 py-4">{moment(item?.createdAt).format("DD.MM.YYYY")}</td>
                <th className="px-6 lg:px-4 xl:px-0 flex gap-3  py-4 font-normal text-gray-900">
                  {item?.productId} 
              </th>
              <td className="px-6 lg:px-4 xl:px-0 py-4">
                <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                  {convertText(item?.status)}
                </span>
              </td> 
              <td className="px-6 lg:px-4 xl:px-0 py-4">{item?.price} $</td>
              
            </tr>
              )} 
              return null;   
        })}
          
        </tbody>
      </table>
    </div>
  );
};

export default List;
