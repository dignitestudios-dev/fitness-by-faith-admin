import React, { Fragment } from "react";
import Loader from "../Global/Loader";
import { ImagePlaceHolder } from "../../assets/export";

const RecentUsersList = ({usersData, loading}) => {
  
  return (
    <div className="w-full bg-white rounded-xl p-6">
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h1 className="text-lg font-semibold">Recent Users</h1>
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm text-gray-500">
              <thead className="">
                <tr className="">
                  <th scope="col" className="px-6 lg:px-4 xl:px-0 py-4 font-medium text-base"
                  >
                    Name
                  </th>
                  <th scope="col" className="px-6 lg:px-4 xl:px-0 py-4 font-medium text-base"
                  >
                    Gender
                  </th>
                  <th
                    scope="col" className="px-6 lg:px-4 xl:px-0 py-4 font-medium text-base"
                  >
                    Plan
                  </th>
                  <th scope="col" className="px-6 lg:px-4 xl:px-0 py-4 font-medium text-base">
                    Height
                  </th>
                  <th scope="col" className="px-6 lg:px-4 xl:px-0 py-4 font-medium text-base">
                    Weight
                  </th>

                  {/* <th
                    scope="col"
                    className="px-6 lg:px-4 xl:px-0 py-4 font-medium text-base"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 lg:px-4 xl:px-0 py-4 font-medium text-base"
                  >
                    Date
                  </th> */}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                {usersData?.map((user, index) => (
                  <tr className="" key={index}>
                    <th className="px-6 lg:px-4 xl:px-0 flex gap-3  py-4 font-normal text-gray-900">
                      <div className="relative h-10 w-10">
                        <img
                          className="h-full w-full rounded-full object-cover object-center"
                          src={user?.profilePicture || ImagePlaceHolder}
                          alt="user"
                        />
                      </div>
                      <div className="text-sm">
                        <div className="font-medium text-gray-700">
                          {user?.fullName ?? "--"}
                        </div>
                        <p className="text-gray-400">{user?.email}</p>
                      </div>
                    </th>
                    <td className="px-6 lg:px-4 xl:px-0 py-4">
                      <span className="text-sm">{user?.gender ?? "--"}</span>
                    </td>
                    <td className="px-6 lg:px-4 xl:px-0 py-4">
                      {user?.target ?? "--"}
                    </td>
                    <td className="px-6 lg:px-4 xl:px-0 py-4 ">{user?.height ?? "--"}</td>
                    <td className="px-6 lg:px-4 xl:px-0 py-4">{user?.weight ?? "--"}</td>
                    {/* <td className="px-6 lg:px-4 xl:px-0 py-4">$80.00</td>
                    <td className="px-6 lg:px-4 xl:px-0 py-4">07.05.2024</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default RecentUsersList;
