/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Loader2, Ban, CheckCircle, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { AdminService } from "@/src/services/admin.service";

export default function ManageUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await AdminService.getAllUsers();
      setUsers(data);
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleBlockUser = async (userId: string) => {
    if (!confirm("Are you sure you want to block this user?")) return;
    try {
      await AdminService.blockUser(userId);
      toast.success("User blocked successfully");
      fetchUsers(); // Refresh list
    } catch (error) {
      toast.error("Failed to block user");
    }
  };

  if (loading) return <Loader2 className="animate-spin h-8 w-8 mx-auto mt-10 text-indigo-600" />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">User Management</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-slate-50 transition">
                <td className="px-6 py-4 font-bold text-slate-900">{user.name}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                    user.role === 'admin' ? 'bg-red-100 text-red-700' :
                    user.role === 'guide' ? 'bg-indigo-100 text-indigo-700' : 
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-500">{user.email}</td>
                <td className="px-6 py-4">
                  {user.isBlocked ? (
                    <span className="text-red-500 flex items-center gap-1"><Ban className="h-4 w-4" /> Blocked</span>
                  ) : (
                    <span className="text-green-500 flex items-center gap-1"><CheckCircle className="h-4 w-4" /> Active</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  {!user.isBlocked && user.role !== 'admin' && (
                    <button 
                      onClick={() => handleBlockUser(user._id)}
                      className="text-red-600 hover:text-red-800 font-medium text-xs border border-red-200 hover:bg-red-50 px-3 py-1 rounded transition"
                    >
                      Block User
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}