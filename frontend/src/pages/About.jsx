import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Card from "../components/common/Card";
import DeveloperCard from "../components/common/DeveloperCard";

const About = () => {
  const navigate = useNavigate();

  const features = [
    { icon: "🎯", title: "Goal Setting",     desc: "Define and track your personal fitness goals with ease." },
    { icon: "📅", title: "Smart Scheduling", desc: "Plan and schedule workouts on an interactive calendar." },
    { icon: "📝", title: "Workout Logging",  desc: "Log every exercise, rep, and set to monitor progress." },
    { icon: "⭐", title: "Feedback System",  desc: "Rate your sessions and leave notes to stay motivated." },
    { icon: "👥", title: "Admin Controls",   desc: "Manage users and review feedback from one dashboard." },
  ];

  const developers = [
    { initials: "ET", name: "Elijah Red Tingzon", avatarColor: "bg-orange-500" },
    { initials: "DR", name: "Daniel Refamonte",   avatarColor: "bg-sky-500"    },
    { initials: "DM", name: "Danisa Medallo",     avatarColor: "bg-purple-500" },
    { initials: "CA", name: "CJ Alvarado",        avatarColor: "bg-green-500"  },
    { initials: "HM", name: "Hanna Magbunay",     avatarColor: "bg-rose-500"   },
  ];

  const user     = JSON.parse(sessionStorage.getItem("fittrack_user") || "{}");
  const backPath = user.role === "admin" ? "/admin" : "/home";

  return (
    <div className="min-h-screen bg-orange-50">
      <NavBar />

      <main className="px-8 py-12 max-w-3xl mx-auto">

        {/* Hero */}
        <section className="text-center mb-12">
          <div className="w-20 h-20 bg-linear-to-br from-orange-400 to-orange-600 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-5 shadow-xl shadow-orange-200">
            🏋️
          </div>
          <h1 className="text-4xl font-black text-gray-800" style={{ fontFamily: "'Sora', sans-serif" }}>
            About FitTrack
          </h1>
          <p className="text-gray-500 text-base mt-3 max-w-md mx-auto leading-relaxed">
            FitTrack is your all-in-one personal fitness companion — built to help you set goals,
            log workouts, schedule sessions, and celebrate progress every single day.
          </p>
        </section>

        {/* Features */}
        <section className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
          {features.map((f) => (
            <Card key={f.title} as="article" className="p-6 text-center hover:shadow-md transition-all">
              <p className="text-3xl mb-2">{f.icon}</p>
              <h3 className="text-sm font-bold text-gray-800 mb-1" style={{ fontFamily: "'Sora', sans-serif" }}>
                {f.title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
            </Card>
          ))}
        </section>

        {/* Developers */}
        <Card as="section" className="p-8 mb-6">
          <h2 className="text-lg font-bold text-gray-800 text-center mb-1" style={{ fontFamily: "'Sora', sans-serif" }}>
            👨‍💻 Meet the Developers
          </h2>
          <p className="text-sm text-gray-400 text-center mb-6">The team behind FitTrack</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {developers.map((dev) => (
              <DeveloperCard key={dev.name} {...dev} />
            ))}
          </div>
        </Card>

        {/* Footer */}
        <Card as="section" className="p-7 text-center">
          <p className="text-sm text-gray-500 leading-relaxed">
            Version 1.0.0 · © 2025 FitTrack Team<br />
            Designed to keep you consistent, healthy, and always moving forward.
          </p>
          <button
            onClick={() => navigate(backPath)}
            className="mt-5 bg-white text-orange-500 border-2 border-orange-400 font-semibold px-5 py-2 rounded-xl text-sm hover:bg-orange-50 transition-all"
          >
            ← Go Back
          </button>
        </Card>

      </main>
    </div>
  );
};

export default About;