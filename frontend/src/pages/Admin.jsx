import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Card from "../components/common/Card";

const API = import.meta.env.VITE_BACKEND_API_PORT;
const AVATAR_COLORS = ["bg-orange-400","bg-sky-400","bg-purple-400","bg-green-400","bg-rose-400","bg-teal-400","bg-indigo-400","bg-yellow-400"];

const Admin = () => {
  const [users, setUsers]     = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/users`)
      .then(r => r.json())
      .then(res => setUsers(res.data || []))
      .catch(console.error);

    fetch(`${API}/api/reviews`)
      .then(r => r.json())
      .then(res => { setReviews(res.data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "suspended" ? "active" : "suspended";
    const action    = newStatus === "suspended" ? "suspend" : "reactivate";
    if (!confirm(`Are you sure you want to ${action} this user?`)) return;
    try {
      await fetch(`${API}/api/users/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      setUsers(u => u.map(user => user.id === id ? { ...user, status: newStatus } : user));
    } catch (error) { alert(error); }
  };

  const avg = reviews.length > 0
    ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1)
    : "—";

  const thCls = "px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-widest bg-gray-50 border-b border-gray-200";
  const tdCls = "px-4 py-3.5 text-sm text-gray-700 border-b border-gray-100";

  return (
    <div className="min-h-screen bg-orange-50">
      <NavBar />

      <main className="px-8 py-7 max-w-7xl mx-auto">
        <header className="mb-7">
          <h2 className="text-2xl font-black text-gray-800" style={{ fontFamily: "'Sora', sans-serif" }}>Admin Dashboard</h2>
          <p className="text-sm text-gray-500 mt-1">Manage users and monitor feedback.</p>
        </header>

        {/* ── Users Table ── */}
        <Card as="section" className="overflow-hidden mb-6">
          <header className="px-6 py-4.5 bg-linear-to-r from-orange-400 to-orange-600 flex items-center gap-2.5">
            <span className="text-xl">👥</span>
            <h3 className="font-bold text-base text-white" style={{ fontFamily: "'Sora', sans-serif" }}>Users</h3>
            <span className="ml-auto bg-white/25 text-white text-xs font-bold px-3 py-0.5 rounded-full">{users.length} total</span>
          </header>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={thCls}>Name</th>
                <th className={thCls}>Username</th>
                <th className={thCls}>Age</th>
                <th className={thCls}>Role</th>
                <th className={thCls}>Status</th>
                <th className={thCls}>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={u.id} className={`transition-colors ${u.status === "suspended" ? "bg-gray-50 opacity-70" : "hover:bg-orange-50"}`}>
                  <td className={tdCls}>
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-full ${AVATAR_COLORS[i % AVATAR_COLORS.length]} flex items-center justify-center text-white font-bold text-sm shrink-0 ${u.status === "suspended" ? "grayscale" : ""}`}>
                        {u.fullname[0]}
                      </div>
                      <strong className="text-gray-800">{u.fullname}</strong>
                    </div>
                  </td>
                  <td className={`${tdCls} text-gray-500`}>{u.username}</td>
                  <td className={tdCls}>{u.age}</td>
                  <td className={tdCls}>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${u.role === "admin" ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className={tdCls}>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${u.status === "suspended" ? "bg-red-100 text-red-600" : "bg-emerald-100 text-emerald-700"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${u.status === "suspended" ? "bg-red-400" : "bg-emerald-400"}`} />
                      {u.status === "suspended" ? "Suspended" : "Active"}
                    </span>
                  </td>
                  <td className={tdCls}>
                    {u.role !== "admin" && (
                      <button
                        onClick={() => toggleStatus(u.id, u.status)}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-lg border-none cursor-pointer transition-all
                          ${u.status === "suspended"
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            : "bg-orange-50 text-orange-700 hover:bg-orange-100"
                          }`}
                      >
                        {u.status === "suspended" ? "✅ Reactivate" : "⏸ Suspend"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr><td colSpan={6} className="text-center py-6 text-gray-400 text-sm">No users found.</td></tr>
              )}
            </tbody>
          </table>
        </Card>

        {/* ── Reviews Table ── */}
        <Card as="section" className="overflow-hidden">
          <header className="px-6 py-4.5 bg-linear-to-r from-gray-800 to-gray-700 flex items-center gap-2.5">
            <span className="text-xl">⭐</span>
            <h3 className="font-bold text-base text-white" style={{ fontFamily: "'Sora', sans-serif" }}>Rating / Feedback</h3>
            <div className="ml-auto flex items-center gap-1.5 bg-orange-500/20 px-3 py-1.5 rounded-xl">
              <span className="text-base">⭐</span>
              <span className="text-orange-200 font-black text-base">{avg}</span>
              <span className="text-gray-400 text-xs">avg</span>
            </div>
          </header>
          {loading ? (
            <p className="text-center py-6 text-gray-400 text-sm">Loading…</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className={thCls}>Username</th>
                  <th className={thCls}>Stars</th>
                  <th className={thCls}>Feedback</th>
                  <th className={thCls}>Date</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((r, i) => (
                  <tr key={r.id} className="hover:bg-orange-50 transition-colors">
                    <td className={tdCls}>
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-full ${AVATAR_COLORS[i % AVATAR_COLORS.length]} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                          {r.username[0].toUpperCase()}
                        </div>
                        <strong className="text-gray-800">{r.username}</strong>
                      </div>
                    </td>
                    <td className={tdCls}>
                      <div className="flex items-center gap-0.5">
                        {"⭐".repeat(r.rating)}
                        <span className="ml-1.5 text-xs text-gray-400">{r.rating}/5</span>
                      </div>
                    </td>
                    <td className={`${tdCls} text-gray-500`}>{r.feedback || <span className="italic text-gray-300">No description</span>}</td>
                    <td className={`${tdCls} text-gray-400 text-xs`}>{new Date(r.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
                {reviews.length === 0 && (
                  <tr><td colSpan={4} className="text-center py-6 text-gray-400 text-sm">No reviews yet.</td></tr>
                )}
              </tbody>
            </table>
          )}
        </Card>
      </main>
    </div>
  );
};

export default Admin;