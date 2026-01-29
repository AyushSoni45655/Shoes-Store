

// import React, { useState } from "react";
// import { useSelector } from "react-redux";

// const Users = () => {
//   const { users } = useSelector((state) => state.user);
//   const [search, setSearch] = useState("");

//   const filteredUsers = users?.filter(
//     (user) =>
//       user.name.toLowerCase().includes(search.toLowerCase()) ||
//       user.email.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="w-full min-h-screen bg-gray-100 p-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
//         <h1 className="text-3xl font-extrabold tracking-wide">
//           👥 Users Management
//         </h1>

//         <input
//           type="text"
//           placeholder="🔍 Search by name or email"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="px-4 py-2 rounded-lg shadow outline-none w-full sm:w-72"
//         />
//       </div>

//       {/* ================= DESKTOP TABLE ================= */}
//       <div className="hidden md:block bg-white rounded-xl shadow-lg overflow-x-auto">
//         <table className="w-full text-sm">
//           <thead className="bg-black text-white">
//             <tr>
//               <th className="p-3 text-left">#</th>
//               <th className="p-3 text-left">Name</th>
//               <th className="p-3 text-left">Email</th>
//               <th className="p-3 text-left">Phone</th>
//               <th className="p-3 text-left">Joined</th>
//               <th className="p-3 text-center">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filteredUsers?.length === 0 ? (
//               <tr>
//                 <td colSpan="6" className="text-center py-6 text-gray-500">
//                   No Users Found
//                 </td>
//               </tr>
//             ) : (
//               filteredUsers.map((user, index) => (
//                 <tr
//                   key={user._id}
//                   className="border-b hover:bg-gray-100 transition"
//                 >
//                   <td className="p-3">{index + 1}</td>
//                   <td className="p-3 font-semibold">{user.name}</td>
//                   <td className="p-3">{user.email}</td>
//                   <td className="p-3">{user.phone}</td>
//                   <td className="p-3">
//                     {new Date(user.createdAt).toLocaleDateString()}
//                   </td>
//                   <td className="p-3 text-center">
//                     <button className="text-blue-600 font-semibold hover:underline mr-3">
//                       View
//                     </button>
//                     <button className="text-red-500 font-semibold hover:underline">
//                       Block
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* ================= MOBILE CARD VIEW ================= */}
//       <div className="md:hidden grid grid-cols-1 gap-4">
//         {filteredUsers?.map((user) => (
//           <div
//             key={user._id}
//             className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-2"
//           >
//             <div className="flex justify-between items-center">
//               <h3 className="font-bold text-lg">{user.name}</h3>
//               <span className="text-xs text-gray-500">
//                 {new Date(user.createdAt).toLocaleDateString()}
//               </span>
//             </div>

//             <p className="text-sm text-gray-600">
//               📧 {user.email}
//             </p>
//             <p className="text-sm text-gray-600">
//               📞 {user.phone}
//             </p>

//             <div className="flex justify-end gap-4 mt-3">
//               <button className="text-blue-600 font-semibold">
//                 View
//               </button>
//               <button className="text-red-500 font-semibold">
//                 Block
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Users;






import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { FiSearch, FiMoreVertical } from "react-icons/fi";

const Users = () => {
  const { users } = useSelector((state) => state.user);
  const [search, setSearch] = useState("");

  const filteredUsers = useMemo(() => {
    return users?.filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#eef2ff] p-6">
      
      {/* ===== Header ===== */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-gray-900">
            Users
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage all registered users in your platform
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <FiSearch className="absolute left-4 top-3 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white shadow focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>
      </div>

      {/* ===== Desktop Table ===== */}
      <div className="hidden lg:block bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Joined</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers?.map((user) => (
              <tr
                key={user._id}
                className="border-b hover:bg-indigo-50 transition"
              >
                {/* User */}
                <td className="p-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <span className="font-semibold text-gray-800">
                    {user.name}
                  </span>
                </td>

                {/* Email */}
                <td className="p-4 text-gray-600">{user.email}</td>

                {/* Phone */}
                <td className="p-4">{user.phone}</td>

                {/* Date */}
                <td className="p-4 text-sm text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>

                {/* Status */}
                <td className="p-4 text-center">
                  <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 font-semibold">
                    ACTIVE
                  </span>
                </td>

                {/* Action */}
                <td className="p-4 text-center">
                  <button className="p-2 rounded-lg hover:bg-gray-200">
                    <FiMoreVertical />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== Mobile / Tablet Cards ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:hidden">
        {filteredUsers?.map((user) => (
          <div
            key={user._id}
            className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-5 flex flex-col gap-3 hover:scale-[1.02] transition"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold">{user.name}</h3>
                  <p className="text-xs text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 font-semibold">
                ACTIVE
              </span>
            </div>

            <p className="text-sm text-gray-600">📧 {user.email}</p>
            <p className="text-sm text-gray-600">📞 {user.phone}</p>

            <button className="mt-2 text-indigo-600 font-semibold text-sm self-end">
              View Details →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
