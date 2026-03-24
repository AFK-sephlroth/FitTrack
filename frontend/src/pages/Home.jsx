import NavBar from "../components/NavBar";
import MiniCalendar from "../components/MiniCalendar";
import StarRating from "../components/StarRating";
import Card from "../components/common/Card";
import { defaultGoals, defaultWorkouts } from "../data/Mockdata";
import { useState, useEffect } from "react";

<<<<<<< HEAD
=======
const BACKEND_PORT = import.meta.env.VITE_BACKEND_API_PORT;

>>>>>>> 4c1984f (update commit 3/24/2026)
const Home = () => {
  // ── Goals ──────────────────────────────────────────────────────
  const [goals, setGoals]                 = useState(defaultGoals);
  const [checked, setChecked]             = useState(defaultGoals.map(() => false));
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [newGoal, setNewGoal]             = useState("");
<<<<<<< HEAD
=======
  const [editGoalIdx, setEditGoalIdx]     = useState(null);
  const [editGoalVal, setEditGoalVal]     = useState("");
>>>>>>> 4c1984f (update commit 3/24/2026)

  // ── Workouts ───────────────────────────────────────────────────
  const [workouts, setWorkouts] = useState(defaultWorkouts);
  const [workoutForm, setWorkoutForm] = useState({
    name: "",
    reps: 10,
    sets: 3
  });
<<<<<<< HEAD
=======
  const [editWorkoutIdx, setEditWorkoutIdx] = useState(null);
>>>>>>> 4c1984f (update commit 3/24/2026)

  useEffect(() => {
    const saved = localStorage.getItem("fittrack_workouts");
    if (saved) setWorkouts(JSON.parse(saved));
  }, []); 
  
  useEffect(() => {
    localStorage.setItem("fittrack_workouts", JSON.stringify(workouts));
  }, [workouts]);

  // ── Calendar Events  { "YYYY-MM-DD": ["event title", ...] } ───
  const [events, setEvents]                       = useState({});
  const [selectedDateKey, setSelectedDateKey]     = useState(null);
  const [selectedDateLabel, setSelectedDateLabel] = useState("");
  const [showEventModal, setShowEventModal]       = useState(false);
  const [newEvent, setNewEvent]                   = useState("");

  // ── Feedback ───────────────────────────────────────────────────
  const [rating, setRating]       = useState(0);
  const [feedback, setFeedback]   = useState("");
  const [submitted, setSubmitted] = useState(false);

  // ── Handlers ───────────────────────────────────────────────────
<<<<<<< HEAD
  const addGoal = () => {
    if (!newGoal.trim()) return;
    setGoals((g) => [...g, newGoal.trim()]);
    setChecked((c) => [...c, false]);
    setNewGoal("");
    setShowGoalModal(false);
  };

  const addWorkout = () => {
=======
  const addGoal = async () => {
    if (!newGoal.trim()) return;
    try {
      const payload = { goal: newGoal.trim() };
      const response = await fetch(`${BACKEND_PORT}/api/goals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      console.log(result);
      setGoals((g) => [...g, newGoal.trim()]);
      setChecked((c) => [...c, false]);
      setNewGoal("");
      setShowGoalModal(false);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const saveGoal = async () => {
    if (!editGoalVal.trim()) return;
    try {
      const payload = { goal: editGoalVal.trim() };
      const response = await fetch(`${BACKEND_PORT}/api/goals/${editGoalIdx}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      console.log(result);
      setGoals((g) => g.map((v, i) => (i === editGoalIdx ? editGoalVal.trim() : v)));
      setEditGoalIdx(null);
      setEditGoalVal("");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const deleteGoal = async (idx) => {
    try {
      const response = await fetch(`${BACKEND_PORT}/api/goals/${idx}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
      console.log(result);
      setGoals((g) => g.filter((_, i) => i !== idx));
      setChecked((c) => c.filter((_, i) => i !== idx));
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const addWorkout = async () => {
>>>>>>> 4c1984f (update commit 3/24/2026)
    if (!workoutForm.name.trim()) {
      alert("Please enter an exercise name.");
      return;
    }
<<<<<<< HEAD
    setWorkouts((w) => [...w, { ...workoutForm }]);
    setWorkoutForm({ name: "", reps: 10, sets: 3 });
=======
    try {
      if (editWorkoutIdx !== null) {
        const payload = { ...workoutForm };
        const response = await fetch(`${BACKEND_PORT}/api/workouts/${editWorkoutIdx}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const result = await response.json();
        console.log(result);
        setWorkouts((w) => w.map((item, i) => (i === editWorkoutIdx ? { ...workoutForm } : item)));
        setEditWorkoutIdx(null);
      } else {
        const isDuplicate = workouts.some(
          (w) => w.name.trim().toLowerCase() === workoutForm.name.trim().toLowerCase()
        );
        if (isDuplicate) {
          alert(`"${workoutForm.name}" is already in your workout list.`);
          return;
        }
        const payload = { ...workoutForm };
        const response = await fetch(`${BACKEND_PORT}/api/workouts`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const result = await response.json();
        console.log(result);
        setWorkouts((w) => [...w, { ...workoutForm }]);
      }
      setWorkoutForm({ name: "", reps: 10, sets: 3 });
    } catch (error) {
      console.log(error);
      alert(error);
    }
>>>>>>> 4c1984f (update commit 3/24/2026)
  };

  const handleDayClick = (key) => {
    setSelectedDateKey(key);
    setSelectedDateLabel(key);
    setShowEventModal(true);
  };

  const addEvent = () => {
    if (!newEvent.trim() || !selectedDateKey) return;
    setEvents((ev) => ({
      ...ev,
      [selectedDateKey]: [...(ev[selectedDateKey] || []), newEvent.trim()]
    }));
    setNewEvent("");
  };

  const removeEvent = (key, idx) => {
    setEvents((ev) => {
      const updated = [...(ev[key] || [])];
      updated.splice(idx, 1);
      return { ...ev, [key]: updated };
    });
  };

<<<<<<< HEAD
  const submitFeedback = () => {
=======
  const submitFeedback = async () => {
>>>>>>> 4c1984f (update commit 3/24/2026)
    if (rating === 0) {
      alert("Please select a star rating first.");
      return;
    }
<<<<<<< HEAD
    setSubmitted(true);
=======
    try {
      const payload = { rating, feedback };
      const response = await fetch(`${BACKEND_PORT}/api/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      console.log(result);
      setSubmitted(true);
    } catch (error) {
      console.log(error);
      alert(error);
    }
>>>>>>> 4c1984f (update commit 3/24/2026)
  };

  const totalSets = workouts.reduce((a, w) => a + w.sets, 0);
  const inputCls  = "w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm text-gray-800 bg-white outline-none transition-all focus:border-orange-400 focus:ring-2 focus:ring-orange-100 placeholder-gray-400";

  return (
    <div className="min-h-screen bg-orange-50">
      <NavBar />

      <main className="px-8 py-7 max-w-7xl mx-auto">

        {/* ── Goal Modal ── */}
        {showGoalModal && (
          <div className="fixed inset-0 bg-black/45 z-50 flex items-center justify-center" onMouseDown={(e) => { if (e.target === e.currentTarget) setShowGoalModal(false); }}>
            <Card className="w-96 p-7">
              <h3 className="font-bold text-gray-800 mb-3" style={{ fontFamily: "'Sora', sans-serif" }}>
                Set a New Goal
              </h3>
              <input
                className={inputCls} placeholder="e.g. Deadlift 100kg"
                value={newGoal} onChange={(e) => setNewGoal(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addGoal()} autoFocus
              />
              <div className="flex gap-2.5 mt-3.5">
<<<<<<< HEAD
                <button onClick={addGoal} className="flex-1 bg-liinear-to-r from-orange-400 to-orange-600 text-white font-semibold py-2.5 rounded-xl text-sm hover:shadow-md transition-all">
                  Add Goal
=======
                <button onClick={addGoal} className="flex-1 bg-linear-to-r from-orange-400 to-orange-600 text-white font-semibold py-2.5 rounded-xl text-sm hover:shadow-md transition-all cursor-pointer">
                  Submit
>>>>>>> 4c1984f (update commit 3/24/2026)
                </button>
                <button onClick={() => setShowGoalModal(false)} className="bg-white text-orange-500 border-2 border-orange-400 font-semibold px-4 py-2 rounded-xl text-sm hover:bg-orange-50 transition-all cursor-pointer">
                  Cancel
                </button>
              </div>
            </Card>
          </div>
        )}

        {/* ── Event Modal ── */}
        {showEventModal && (
          <div className="fixed inset-0 bg-black/45 z-50 flex items-center justify-center" onMouseDown={(e) => { if (e.target === e.currentTarget) { setShowEventModal(false); setNewEvent(""); } }}>
            <Card className="w-105 p-7">
              <h3 className="font-bold text-gray-800 mb-1" style={{ fontFamily: "'Sora', sans-serif" }}>
                📅 {selectedDateLabel}
              </h3>
              <p className="text-xs text-gray-500 mb-4">Manage scheduled events for this day.</p>

              {(events[selectedDateKey] || []).length > 0 ? (
                <ul className="list-none mb-4 space-y-2">
                  {(events[selectedDateKey] || []).map((ev, i) => (
                    <li key={i} className="flex items-center justify-between px-3 py-2.5 bg-orange-50 rounded-xl border border-orange-100">
                      <span className="text-sm text-gray-700">🟠 {ev}</span>
                      <button onClick={() => removeEvent(selectedDateKey, i)} className="text-red-400 hover:text-red-600 bg-transparent border-none cursor-pointer text-base leading-none">✕</button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-gray-400 mb-4">No events yet for this day.</p>
              )}

              <div className="flex gap-2.5">
                <input className={`${inputCls} flex-1`} placeholder="New event (e.g. Leg Day)" value={newEvent}
                  onChange={(e) => setNewEvent(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addEvent()} />
                <button onClick={addEvent} className="bg-linear-to-r from-orange-400 to-orange-600 text-white font-semibold px-4 rounded-xl text-sm whitespace-nowrap hover:shadow-md transition-all cursor-pointer">
                  + Add
                </button>
              </div>
              <button onClick={() => { setShowEventModal(false); setNewEvent(""); }} className="w-full mt-3.5 bg-white text-orange-500 border-2 border-orange-400 font-semibold py-2.5 rounded-xl text-sm hover:bg-orange-50 transition-all cursor-pointer">
                Done
              </button>
            </Card>
          </div>
        )}

        {/* ── Row 1: Goals + Calendar ── */}
        <div className="grid grid-cols-2 gap-5 mb-5">

          <Card>
            <header className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-gray-800" style={{ fontFamily: "'Sora', sans-serif" }}>🎯 Goals</h2>
              <button onClick={() => setShowGoalModal(true)} className="bg-linear-to-r from-orange-400 to-orange-600 text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg hover:shadow-md transition-all cursor-pointer">
                + Set Goals
              </button>
            </header>
            {goals.map((g, i) => (
              <div key={i} className="flex items-center gap-3 px-3.5 py-2.5 bg-orange-50 rounded-xl mb-2 border border-orange-100 hover:border-orange-300 transition-colors">
                <div
                  onClick={() => setChecked((c) => c.map((v, j) => (j === i ? !v : v)))}
                  className={`w-5 h-5 rounded-md border-2 border-orange-400 flex items-center justify-center text-xs shrink-0 cursor-pointer transition-all ${checked[i] ? "bg-orange-500 text-white" : "bg-white"}`}
                >
                  {checked[i] && "✓"}
                </div>
<<<<<<< HEAD
                <span className={`text-sm text-gray-700 flex-1 ${checked[i] ? "line-through opacity-50" : ""}`}>{g}</span>
=======
                {editGoalIdx === i ? (
                  <input
                    className={`${inputCls} flex-1 py-1`}
                    value={editGoalVal}
                    onChange={(e) => setEditGoalVal(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && saveGoal()}
                    autoFocus
                  />
                ) : (
                  <span className={`text-sm text-gray-700 flex-1 ${checked[i] ? "line-through opacity-50" : ""}`}>{g}</span>
                )}
                {editGoalIdx === i ? (
                  <button onClick={saveGoal} className="text-xs text-white bg-orange-500 hover:bg-orange-600 font-semibold px-2.5 py-1 rounded-lg transition-all cursor-pointer">
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => { setEditGoalIdx(i); setEditGoalVal(g); }}
                    className="text-gray-400 hover:text-orange-500 transition-colors cursor-pointer bg-transparent border-none p-0.5"
                    title="Edit goal"
                  >
                    ✏️
                  </button>
                )}
                <button
                  onClick={() => deleteGoal(i)}
                  className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer bg-transparent border-none p-0.5"
                  title="Delete goal"
                >
                  🗑️
                </button>
>>>>>>> 4c1984f (update commit 3/24/2026)
              </div>
            ))}
            {goals.length === 0 && <p className="text-gray-400 text-sm text-center py-5">No goals yet.</p>}
          </Card>

          <Card>
            <header className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-gray-800" style={{ fontFamily: "'Sora', sans-serif" }}>📅 My Schedule</h2>
              <span className="text-xs text-gray-400">Click a day to add events</span>
            </header>
            <MiniCalendar events={events} onDayClick={handleDayClick} />
            {Object.keys(events).filter((k) => (events[k] || []).length > 0).length > 0 && (
              <div className="mt-4 pt-3.5 border-t border-gray-100">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Upcoming Events</p>
                {Object.keys(events).filter((k) => (events[k] || []).length > 0).sort().slice(0, 3).map((k) => (
                  <div key={k} className="mb-1.5">
                    <span className="text-xs text-orange-500 font-semibold">{k}: </span>
                    <span className="text-xs text-gray-700">{events[k].join(", ")}</span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* ── Row 2: Workout Log + Today's Workout ── */}
        <div className="grid grid-cols-2 gap-5 mb-5">

          <Card>
            <h2 className="text-base font-bold text-gray-800 mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>📝 New Workout Log</h2>
            <div className="grid grid-cols-[1fr_70px_70px] gap-2.5 mb-3">
              <label className="text-xs font-semibold text-gray-500">Exercise Name</label>
              <label className="text-xs font-semibold text-gray-500">Reps</label>
              <label className="text-xs font-semibold text-gray-500">Sets</label>
              <input
                className={inputCls} placeholder="e.g. Bench Press"
                value={workoutForm.name}
                onChange={(e) => setWorkoutForm({ ...workoutForm, name: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && addWorkout()}
              />
              <input
                className={inputCls} type="number" min="1"
                value={workoutForm.reps}
                onChange={(e) => setWorkoutForm({ ...workoutForm, reps: Number(e.target.value) })}
              />
              <input
                className={inputCls} type="number" min="1"
                value={workoutForm.sets}
                onChange={(e) => setWorkoutForm({ ...workoutForm, sets: Number(e.target.value) })}
              />
            </div>
<<<<<<< HEAD
            <button onClick={addWorkout} className="bg-linear-to-r from-orange-400 to-orange-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer">
              + Log Exercise
            </button>
=======
            <div className="flex gap-2.5">
              <button onClick={addWorkout} className="bg-linear-to-r from-orange-400 to-orange-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer">
                {editWorkoutIdx !== null ? "💾 Save Changes" : "+ Log Exercise"}
              </button>
              {editWorkoutIdx !== null && (
                <button onClick={() => { setEditWorkoutIdx(null); setWorkoutForm({ name: "", reps: 10, sets: 3 }); }} className="bg-white text-orange-500 border-2 border-orange-400 font-semibold px-4 py-2 rounded-xl text-sm hover:bg-orange-50 transition-all cursor-pointer">
                  Cancel
                </button>
              )}
            </div>
>>>>>>> 4c1984f (update commit 3/24/2026)
          </Card>

          <Card>
            <h2 className="text-base font-bold text-gray-800 mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>💪 Today's Workout</h2>
            <div className="flex gap-3.5 items-start">
              <div
                className="shrink-0 w-22 bg-linear-to-b from-orange-400 to-orange-600 rounded-2xl flex flex-col items-center justify-center gap-1 shadow-lg shadow-orange-200 py-4 px-2"
                style={{ minHeight: workouts.length > 0 ? workouts.length * 58 : 80 }}
              >
                <span className="text-white text-2xl font-black leading-none">{totalSets}</span>
                <span className="text-white/80 text-[10px] font-semibold text-center uppercase tracking-widest leading-tight">sets/wk</span>
              </div>
              <div className="flex-1">
                {workouts.map((w, i) => (
                  <div key={i} className="flex items-center justify-between px-3.5 py-2.5 mb-2 bg-orange-50 rounded-xl border border-orange-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 bg-linear-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0">{i + 1}</div>
                      <span className="text-sm font-medium text-gray-800">{w.name}</span>
                    </div>
<<<<<<< HEAD
                    <span className="text-xs text-gray-500">{w.reps}r × {w.sets}s</span>
=======
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{w.reps}r × {w.sets}s</span>
                      <button
                        onClick={() => { setEditWorkoutIdx(i); setWorkoutForm({ name: w.name, reps: w.reps, sets: w.sets }); }}
                        className="text-gray-400 hover:text-orange-500 transition-colors cursor-pointer bg-transparent border-none p-0.5"
                        title="Edit workout"
                      >
                        ✏️
                      </button>
                    </div>
>>>>>>> 4c1984f (update commit 3/24/2026)
                  </div>
                ))}
                {workouts.length === 0 && <p className="text-gray-400 text-sm py-3.5">No exercises logged yet.</p>}
              </div>
            </div>
          </Card>
        </div>

        {/* ── Row 3: Feedback ── */}
        <Card>
          <h2 className="text-base font-bold text-gray-800 mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>⭐ Rating / Feedback</h2>
          {submitted ? (
            <div className="text-center py-5">
              <div className="text-5xl mb-3">🎉</div>
              <p className="font-bold text-lg text-gray-800">Thanks for your feedback!</p>
              <p className="text-gray-500 text-sm mt-1">You rated: {rating}/5 ⭐</p>
              <button onClick={() => { setSubmitted(false); setRating(0); setFeedback(""); }} className="mt-4 bg-white text-orange-500 border-2 border-orange-400 font-semibold px-5 py-2 rounded-xl text-sm hover:bg-orange-50 transition-all">
                Submit another
              </button>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-2.5">How was today's workout?</p>
              <StarRating value={rating} onChange={setRating} />
              <div className="mt-4 mb-4">
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Description (optional)</label>
                <textarea
                  className={`${inputCls} resize-y min-h-20`} rows={3}
                  placeholder="Tell us about your workout…"
                  value={feedback} onChange={(e) => setFeedback(e.target.value)}
                />
              </div>
              <button onClick={submitFeedback} className="bg-linear-to-r from-orange-400 to-orange-600 text-white font-semibold px-7 py-2.5 rounded-xl text-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer">
                Submit Feedback
              </button>
            </>
          )}
        </Card>
      </main>
    </div>
  );
};

export default Home;