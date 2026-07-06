function StatCard({ title, value, color }) {

  return (

    <div className="bg-slate-900 rounded-xl p-6 shadow-lg">

      <p className="text-gray-400">
        {title}
      </p>

      <h2 className={`text-4xl font-bold ${color}`}>
        {value}
      </h2>

    </div>

  );

}

export default StatCard;