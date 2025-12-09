"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  MoreVertical,
  Shield,
  ShieldAlert,
  User,
  Plus,
  X,
  Loader2,
  Trash2,
  Edit,
  CheckCircle2,
  Copy,
  Key,
} from "lucide-react";
import {
  getUsers,
  inviteUser,
  deleteUser,
  updateUserRole,
  resetUserPassword,
} from "./actions"; // <--- Import resetUserPassword
import { useFormStatus } from "react-dom";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal States
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [successData, setSuccessData] = useState({
    open: false,
    title: "",
    message: "",
    subtext: "",
  });

  const loadData = async () => {
    setLoading(true);
    const data = await getUsers();
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const refreshTable = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleDelete = async (uid) => {
    if (!confirm("Are you sure? This will delete the account permanently."))
      return;
    setUsers(users.filter((u) => u.uid !== uid));
    const res = await deleteUser(uid);
    if (res.success) {
      setSuccessData({
        open: true,
        title: "User Deleted",
        message: "The user has been removed.",
      });
    } else {
      alert(res.message);
    }
  };

  // --- NEW: RESET PASSWORD HANDLER ---
  const handleResetPassword = async (uid, userName) => {
    if (
      !confirm(
        `Reset password for ${userName}? They will be logged out immediately.`
      )
    )
      return;

    const res = await resetUserPassword(uid);

    if (res.success) {
      setSuccessData({
        open: true,
        title: "Password Reset Successful",
        message: `A new temporary password has been generated for ${userName}.`,
        subtext: res.password, // Display the new password
      });
    } else {
      alert("Error: " + res.message);
    }
  };

  return (
    <div className="space-y-6 relative">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            User Management
          </h1>
          <p className="text-gray-500 dark:text-zinc-400 text-sm">
            Manage team access and permissions.
          </p>
        </div>
        <button
          onClick={() => setIsInviteOpen(true)}
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
        >
          <Plus size={18} /> Invite User
        </button>
      </div>

      {/* SEARCH */}
      <div className="relative max-w-md">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Search users..."
          className="w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all shadow-sm"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 dark:bg-zinc-950 text-gray-500 dark:text-zinc-400 border-b border-gray-200 dark:border-zinc-800">
            <tr>
              <th className="px-6 py-4 font-medium">User</th>
              <th className="px-6 py-4 font-medium">Role</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
            {loading ? (
              <SkeletonRows />
            ) : users.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-12 text-center text-gray-500 dark:text-zinc-500"
                >
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center text-gray-500 dark:text-zinc-400 font-bold uppercase border border-gray-200 dark:border-zinc-700">
                        {user.name?.[0] || <User size={16} />}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">
                          {user.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-zinc-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <RoleBadge role={user.role} />
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-900">
                      {user.status || "Active"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {/* RESET PASSWORD BUTTON */}
                      <button
                        onClick={() => handleResetPassword(user.uid, user.name)}
                        className="p-2 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg text-gray-400 dark:text-zinc-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
                        title="Reset Password"
                      >
                        <Key size={16} />
                      </button>

                      <button
                        onClick={() => setEditingUser(user)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg text-gray-400 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        title="Edit Role"
                      >
                        <Edit size={16} />
                      </button>

                      <button
                        onClick={() => handleDelete(user.uid)}
                        className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-gray-400 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                        title="Remove User"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* --- MODALS --- */}
      {isInviteOpen && (
        <InviteModal
          onClose={() => setIsInviteOpen(false)}
          onSuccess={(msg, sub) => {
            refreshTable();
            setSuccessData({
              open: true,
              title: "User Created",
              message: msg,
              subtext: sub,
            });
          }}
        />
      )}

      {editingUser && (
        <EditRoleModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSuccess={() => {
            refreshTable();
            setSuccessData({
              open: true,
              title: "Role Updated",
              message: `Successfully updated role for ${editingUser.name}.`,
            });
          }}
        />
      )}

      {successData.open && (
        <SuccessModal
          title={successData.title}
          message={successData.message}
          subtext={successData.subtext}
          onClose={() => setSuccessData({ ...successData, open: false })}
        />
      )}
    </div>
  );
}

// ... (Rest of Sub-Components: InviteModal, EditRoleModal, SuccessModal, etc. remain the same) ...
// Ensure you include all the helper components (RoleBadge, SkeletonRows, etc.) from the previous version.
// I will paste the helper components below for completeness so you don't lose them.

function InviteModal({ onClose, onSuccess }) {
  async function clientAction(formData) {
    const result = await inviteUser(null, formData);
    if (result.success) {
      // result.message contains "User created! Password: ..."
      // We extract just the password for the subtext if needed, or pass the whole string
      const password = result.message.split("Password: ")[1];
      onSuccess("The user account has been created.", password);
      onClose();
    } else {
      alert("Error: " + result.message);
    }
  }

  return (
    <ModalBase title="Invite New User" onClose={onClose}>
      <form action={clientAction} className="space-y-4">
        <Input name="name" label="Full Name" placeholder="John Doe" required />
        <Input
          name="email"
          label="Email Address"
          placeholder="john@inogr.com"
          required
          type="email"
        />
        <Input
          name="password"
          label="Password (Optional)"
          placeholder="Auto-generated if empty"
        />
        <div>
          <label className="text-xs font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-wider block mb-1.5">
            Role
          </label>
          <div className="relative">
            <select
              name="role"
              className="w-full bg-white dark:bg-black border border-gray-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-gray-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary/50 outline-none appearance-none"
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
              <option value="Super Admin">Super Admin</option>
            </select>
          </div>
        </div>
        <div className="pt-4 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-lg border border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-zinc-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-zinc-800"
          >
            Cancel
          </button>
          <SubmitButton label="Create Account" />
        </div>
      </form>
    </ModalBase>
  );
}

function EditRoleModal({ user, onClose, onSuccess }) {
  const [role, setRole] = useState(user.role);
  const [saving, setSaving] = useState(false);

  const handleUpdate = async () => {
    setSaving(true);
    await updateUserRole(user.uid, role);
    setSaving(false);
    onSuccess();
    onClose();
  };

  return (
    <ModalBase title="Edit Role" onClose={onClose}>
      <div className="mb-6 p-4 bg-gray-50 dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center font-bold text-gray-500 dark:text-zinc-400 border border-gray-200 dark:border-zinc-700">
          {user.name[0]}
        </div>
        <div>
          <p className="font-bold text-gray-900 dark:text-white">{user.name}</p>
          <p className="text-xs text-gray-500 dark:text-zinc-500">
            {user.email}
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <label className="text-xs font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-wider block">
          Select New Role
        </label>
        <div className="space-y-2">
          {["User", "Admin", "Super Admin"].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                role === r
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-gray-200 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-900 text-gray-600 dark:text-gray-300"
              }`}
            >
              <span className="font-medium text-sm">{r}</span>
              {role === r && <CheckCircle2 size={16} />}
            </button>
          ))}
        </div>
      </div>
      <div className="pt-6 flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 py-2.5 rounded-lg border border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-zinc-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-zinc-800"
        >
          Cancel
        </button>
        <button
          onClick={handleUpdate}
          disabled={saving}
          className="flex-1 py-2.5 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary-dark flex items-center justify-center gap-2"
        >
          {saving ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </ModalBase>
  );
}

function SuccessModal({ title, message, subtext, onClose }) {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-6 relative animate-in zoom-in-95 duration-200 text-center">
        <div className="h-16 w-16 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={32} />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-zinc-400 mb-2">
          {message}
        </p>

        {subtext && (
          <div className="bg-gray-100 dark:bg-black border border-gray-200 dark:border-zinc-800 rounded-lg p-3 mb-6 text-sm font-mono text-gray-800 dark:text-gray-200 break-all select-all flex items-center justify-between gap-2">
            <span>{subtext}</span>
            <Copy
              size={14}
              className="text-gray-400 cursor-pointer hover:text-primary"
              onClick={() => navigator.clipboard.writeText(subtext)}
            />
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary-dark transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );
}

function ModalBase({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-6 relative animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-xs font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-wider block mb-1.5">
        {label}
      </label>
      <input
        {...props}
        className="w-full bg-white dark:bg-black border border-gray-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-gray-900 dark:text-white focus:border-primary outline-none transition-colors"
      />
    </div>
  );
}

function SubmitButton({ label }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex-1 py-2.5 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary-dark flex items-center justify-center gap-2 disabled:opacity-50"
    >
      {pending ? <Loader2 size={16} className="animate-spin" /> : label}
    </button>
  );
}

function RoleBadge({ role }) {
  if (role === "Super Admin")
    return (
      <span className="inline-flex items-center gap-1.5 text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/20 px-2.5 py-1 rounded-md text-xs font-bold border border-purple-200 dark:border-purple-800">
        <ShieldAlert size={12} /> {role}
      </span>
    );
  if (role === "Admin")
    return (
      <span className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20 px-2.5 py-1 rounded-md text-xs font-bold border border-blue-200 dark:border-blue-800">
        <Shield size={12} /> {role}
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1.5 text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-zinc-800 px-2.5 py-1 rounded-md text-xs font-medium border border-gray-200 dark:border-zinc-700">
      <User size={12} /> {role}
    </span>
  );
}

function SkeletonRows() {
  return [1, 2, 3].map((i) => (
    <tr key={i} className="animate-pulse">
      <td className="px-6 py-4">
        <div className="h-10 w-40 bg-gray-200 dark:bg-zinc-800 rounded-lg" />
      </td>
      <td className="px-6 py-4">
        <div className="h-6 w-24 bg-gray-200 dark:bg-zinc-800 rounded-md" />
      </td>
      <td className="px-6 py-4">
        <div className="h-6 w-16 bg-gray-200 dark:bg-zinc-800 rounded-full" />
      </td>
      <td className="px-6 py-4"></td>
    </tr>
  ));
}
