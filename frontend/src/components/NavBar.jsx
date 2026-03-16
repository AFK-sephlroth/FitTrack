import { useNavigate, useLocation } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState({});

  useEffect(() => {
    const stored = JSON.parse(sessionStorage.getItem("fittrack_user") || "{}");
    setUser(stored);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("fittrack_user");
    sessionStorage.removeItem("token");
    navigate("/");
  };

  const isAbout = location.pathname === "/about";

  return (
    <nav className="bg-white border-b border-orange-100 px-8 h-16 flex items-center justify-between sticky top-0 z-50 shadow-sm">

      {/* Left: Logo + Welcome */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-linear-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center text-lg shrink-0">
          🏋️
        </div>
        <div>
          <p className="font-black text-base text-orange-500" style={{ fontFamily: "'Sora', sans-serif" }}>
            FitTrack
          </p>
          <p className="text-xs text-gray-500">
            Welcome back, <strong className="text-gray-800">{user.username}</strong>
          </p>
        </div>
      </div>

      {/* Right: Links + Logout */}
      <div className="flex items-center gap-1">
        {isAbout ? (
          <button
            onClick={() => navigate("/about")}
            className="text-sm font-medium px-3 py-2 rounded-lg transition-all cursor-pointer border-none text-orange-500 bg-orange-50"
          >
            ℹ️ About
          </button>
        ) : (
          <button
            onClick={() => navigate("/about")}
            className="text-sm font-medium px-3 py-2 rounded-lg transition-all cursor-pointer border-none bg-transparent text-gray-500 hover:text-orange-500 hover:bg-orange-50"
          >
            ℹ️ About
          </button>
        )}
        <button
          onClick={handleLogout}
          className="ml-2 bg-gradient-to-r from-orange-400 to-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:shadow-lg hover:shadow-orange-200 transition-all border-none cursor-pointer"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;