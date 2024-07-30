import React from 'react';
import outreach from "../images/outreach_events.svg";
import visit from "../images/visit_logs.svg";
import help from "../images/help_request.svg";
import user_list from "../images/user_list.svg";
import users from "../images/users.svg";
import Avatar from "@mui/material/Avatar";
import Card from '../admin/card';

const Admin_Dashboard = () => {
  return (
    <div className="relative flex flex-col items-center font-dmsans">
      <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-10 mt-32 rounded-2xl text-black">
        <h2 className="text-4xl font-bold mb-4 text-start">Admin Control</h2>
        <p className="mb-6 text-start">Edit user details, track website activity, manage events, and handle support requests</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Card bgColor="bg-gradient-to-b from-[#D3C4FF] to-[#DEDCE4]">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2">
                <Avatar            
                  src={outreach}
                  sx={{ width: 40, height: 40 }}
                />
                </div>
                <p className="text-black text-[24px] font-[500]">Outreach events</p>
              </div>
            </Card>
            <Card bgColor="bg-gradient-to-b from-[#D3F2CE] to-[#E7E7E7]">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 flex items-center justify-center mb-2">
                <Avatar            
                  src={visit}
                  sx={{ width: 40, height: 40 }}
                />
                </div>
                <p className="text-black text-[24px] font-[500]">Visit Logs</p>
              </div>
            </Card>
            <Card bgColor="bg-gradient-to-b from-[#FFF8BA] to-[#EAE7DC]">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2">
                <Avatar            
                  src={help}
                  sx={{ width: 40, height: 40 }}
                />
                </div>
                <p className="text-black text-[24px] font-[500]">Help Requests</p>
              </div>
            </Card>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
            <Card bgColor="bg-[#F7F7F7]">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2">
                <Avatar            
                  src={user_list}
                  sx={{ width: 40, height: 40 }}
                />
                </div>
                <p className="text-black text-[24px] font-[500]">User List</p>
              </div>
            </Card>
            <Card bgColor="bg-[#F7F7F7]">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2">
                <Avatar            
                  src={users}
                  sx={{ width: 40, height: 40 }}
                />
                </div>
                <p className="text-black text-[24px] font-[500]">User Details</p>
              </div>
            </Card>
          </div>
      </div>
    </div>
  );
}

export default Admin_Dashboard;