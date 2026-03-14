import { useState } from "react";
import NavBar from "../components/NavBar";
import Card from "../components/common/Card";
import { users as mockUsers, feedbacks as mockFeedbacks } from "../data/Mockdata";

const Admin = () => {
  const [users, setUsers] = useState(mockUsers);
  const [feedbacks]       = useState(mockFeedbacks);

  const toggleStatus = (idx) => {
    setUsers((us) =>
      us.map((u, i) =>
        i === idx ? { ...u, status: u.status === "Active" ? "Suspended" : "Active" } : u
      )
    );
  };

  const avg = (feedbacks.reduce((a, f) => a + f.stars, 0) / feedbacks.length).toFixed(1);

  const thCls = "px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-widest bg-gray-50 border-b border-gray-200";
  const tdCls = "px-4 py-3.5 text-sm text-gray-700 border-b border-gray-100";
  const AVATAR_COLORS = ["bg-orange-400", "bg-sky-400", "bg-purple-400", "bg-green-400", "bg-rose-400", "bg-teal-400", "bg-indigo-400", "bg-yellow-400"];

  return (
    <div className="min-h-screen bg-orange-50">
      <NavBar />

      <main className="px-8 py-7 max-w-screen-xl mx-auto">
        <header className="mb-7">
          <h2 className="text-2xl font-black text-gray-800" style={{ fontFamily: "'Sora', sans-serif" }}>
            Admin Dashboard
          </h2>
          <p className="text-sm text-gray-500 mt-1">Manage users and monitor feedback.</p>
        </header>

        {/* ── Users Table ── */}
        <Card as="section" className="overflow-hidden mb-6">
          <header className="px-6 py-[18px] bg-gradient-to-r from-orange-400 to-orange-600 flex items-center gap-2.5">
            <span className="text-xl">👥</span>
            <h3 className="font-bold text-base text-white" style={{ fontFamily: "'Sora', sans-serif" }}>Users</h3>
            <span className="ml-auto bg-white/25 text-white text-xs font-bold px-3 py-0.5 rounded-full">
              {users.length} total
            </span>
          </header>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={thCls}>Name</th>
                <th className={thCls}>Email</th>
                <th className={thCls}>Account Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={i} className="hover:bg-orange-50 transition-colors">
                  <td className={tdCls}>
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-full ${AVATAR_COLORS[i % AVATAR_COLORS.length]} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                        {u.name[0]}
                      </div>
                      <strong className="text-gray-800">{u.name}</strong>
                    </div>
                  </td>
                  <td className={`${tdCls} text-gray-500`}>{u.email}</td>
                  <td className={tdCls}>
                    {u.status === "Active" ? (
                      <span
                        onClick={() => toggleStatus(i)}
                        title="Click to toggle status"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-all hover:opacity-80 hover:scale-95 bg-green-100 text-green-700"
                      >
                        ● Active <span className="text-[10px] opacity-60">✎</span>
                      </span>
                    ) : (
                      <span
                        onClick={() => toggleStatus(i)}
                        title="Click to toggle status"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-all hover:opacity-80 hover:scale-95 bg-red-100 text-red-700"
                      >
                        ○ Suspended <span className="text-[10px] opacity-60">✎</span>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-gray-400 px-4 py-2.5">
            💡 Click a status badge to toggle Active / Suspended.
          </p>
        </Card>

        {/* ── Feedback Table ── */}
        <Card as="section" className="overflow-hidden">
          <header className="px-6 py-[18px] bg-gradient-to-r from-gray-800 to-gray-700 flex items-center gap-2.5">
            <span className="text-xl">⭐</span>
            <h3 className="font-bold text-base text-white" style={{ fontFamily: "'Sora', sans-serif" }}>
              Rating / Feedback
            </h3>
            <div className="ml-auto flex items-center gap-1.5 bg-orange-500/20 px-3 py-1.5 rounded-xl">
              <span className="text-base">⭐</span>
              <span className="text-orange-200 font-black text-base">{avg}</span>
              <span className="text-gray-400 text-xs">avg</span>
            </div>
          </header>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={thCls}>Name</th>
                <th className={thCls}>Stars</th>
                <th className={thCls}>Description</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((f, i) => (
                <tr key={i} className="hover:bg-orange-50 transition-colors">
                  <td className={tdCls}>
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-full ${AVATAR_COLORS[i % AVATAR_COLORS.length]} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                        {f.name[0]}
                      </div>
                      <strong className="text-gray-800">{f.name}</strong>
                    </div>
                  </td>
                  <td className={tdCls}>
                    <div className="flex items-center gap-0.5">
                      {"⭐".repeat(f.stars)}
                      <span className="ml-1.5 text-xs text-gray-400">{f.stars}/5</span>
                    </div>
                  </td>
                  <td className={`${tdCls} text-gray-500`}>{f.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </main>
    </div>
  );
};

export default Admin;