


import React from "react";
import { useSelector } from "react-redux";
import { FiMail, FiPhone, FiUser, FiCalendar } from "react-icons/fi";

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6 md:p-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-center gap-4 border-b pb-6">
          <div className="w-24 h-24 rounded-full bg-black text-white flex items-center justify-center text-3xl font-bold">
            {user?.name?.charAt(0)}
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold text-gray-800">
              {user?.name}
            </h2>
            <p className="text-gray-500 text-sm">
              Premium Shoes Store Member 👟
            </p>
          </div>
        </div>

        {/* User Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

          <InfoCard icon={<FiMail />} label="Email" value={user?.email} />
          <InfoCard icon={<FiPhone />} label="Phone" value={user?.phone} />
          <InfoCard icon={<FiUser />} label="User ID" value={user?._id} />
          <InfoCard
            icon={<FiCalendar />}
            label="Joined On"
            value={new Date(user?.createdAt).toLocaleDateString()}
          />

        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition">
            Edit Profile
          </button>
          <button className="w-full border border-black text-black py-3 rounded-xl hover:bg-black hover:text-white transition">
            My Orders
          </button>
        </div>
      </div>
    </div>
  );
};

/* Reusable Info Card */
const InfoCard = ({ icon, label, value }) => (
  <div className="flex items-start gap-4 bg-gray-50 p-4 rounded-xl">
    <div className="text-xl text-black">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-gray-800 font-medium break-all">{value || "N/A"}</p>
    </div>
  </div>
);

export default Profile;
