function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-5 border-b border-slate-700">

      <div>

        <h1 className="text-3xl font-bold text-cyan-400">
          FROST AI
        </h1>

        <p className="text-gray-400 text-sm">
          Predictive Cold Chain Intelligence Platform
        </p>

      </div>

      <div className="flex gap-4">

        <button className="bg-cyan-500 px-4 py-2 rounded-lg">
          Dashboard
        </button>

        <button className="bg-slate-800 px-4 py-2 rounded-lg">
          Reports
        </button>

      </div>

    </nav>
  );
}

export default Navbar;