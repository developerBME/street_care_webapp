import React from "react";
import { useNavigate } from "react-router-dom";
import user_list from "../../images/user_list.svg";
import post_approval_list from "../../images/postApprovals.png";
import Avatar from "@mui/material/Avatar";
import Card from "./CardInfo";

const AdminDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="relative flex flex-col items-center font-dmsans">
      <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-10 mt-32 rounded-2xl text-black">
        <h2 className="text-4xl font-bold mb-4 text-start">Admin Control</h2>
        <p className="mb-6 text-start">
          Review community posts and manage user accounts
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-5xl mx-auto">
          <button
            onClick={() => navigate("/admin/postApprovals")}
            className="w-full col-span-1"
          >
            <Card bgColor="bg-[#F7F7F7]" className="min-h-48">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-2">
                  <Avatar src={post_approval_list} sx={{ width: 80, height: 80 }} />
                </div>
                <p className="text-black text-[24px] font-[500]">
                  Post Approvals
                </p>
              </div>
            </Card>
          </button>
          <button
            onClick={() => navigate("/admin/userManagement")}
            className="w-full col-span-1"
          >
            <Card bgColor="bg-[#F7F7F7]" className="min-h-48">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-2">
                  <Avatar src={user_list} sx={{ width: 100, height: 100 }} />
                </div>
                <p className="text-black text-[24px] font-[500]">
                  User Management
                </p>
              </div>
            </Card>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;