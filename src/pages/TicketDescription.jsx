import React from "react";

const TicketDescription = () => {
  return (
    <div className="min-h-screen w-full">
      <h1 className="text-xl font-semibold">Ticket description</h1>
      <div className="w-full bg-white p-6 rounded-xl mt-6">
        <div className="w-full flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="block w-14 h-14 rounded-full"
          />
          <div className="flex flex-col">
            <h1 className="text-[15px] font-semibold">John doe</h1>
            <p className="text-xs text-gray-400">johndoe@gmail.com</p>
          </div>
        </div>
        <div className="w-full pt-6">
            <p className="text-sm leading-6 tracking-wide">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil nostrum explicabo nisi tenetur rerum sint, totam id saepe laudantium. Nam eaque voluptatum similique ut distinctio aut ipsum asperiores minima vero eius corporis, nulla, iusto tempore, laboriosam eum voluptate a enim.
            </p>
        </div>
      </div>
    </div>
  );
};

export default TicketDescription;
