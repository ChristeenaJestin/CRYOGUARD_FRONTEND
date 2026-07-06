import { TriangleAlert, BrainCircuit, MapPinned } from "lucide-react";

function AIRiskPanel() {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-lg h-full">

      <div className="flex items-center gap-2 mb-6">
        <BrainCircuit className="text-cyan-400" size={26} />
        <h2 className="text-xl font-semibold">
          AI Fleet Intelligence
        </h2>
      </div>

      <div className="space-y-5">

        <div>
          <p className="text-gray-400 text-sm">
            Fleet Health
          </p>

          <h2 className="text-4xl font-bold text-green-400">
            96%
          </h2>
        </div>

        <div className="border-t border-slate-700 pt-4">

          <div className="flex items-center gap-2">

            <TriangleAlert
              className="text-red-500"
              size={20}
            />

            <span className="font-semibold">
              Highest Risk
            </span>

          </div>

          <p className="mt-2 text-2xl font-bold">
            TRK-002
          </p>

          <p className="text-gray-400">
            Blood Samples
          </p>

        </div>

        <div className="border-t border-slate-700 pt-4">

          <p className="text-gray-400">
            Prediction
          </p>

          <p className="mt-2 text-red-400 font-semibold">
            Temperature will exceed
          </p>

          <h2 className="text-3xl font-bold">
            8°C
          </h2>

          <p className="text-gray-300">
            within 13 minutes
          </p>

        </div>

        <div className="border-t border-slate-700 pt-4">

          <div className="flex gap-2 items-center">

            <MapPinned
              size={18}
              className="text-cyan-400"
            />

            <p className="font-semibold">
              Recommendation
            </p>

          </div>

          <p className="mt-2">
            Nearest Cold Hub
          </p>

          <h2 className="text-xl text-cyan-400 font-bold">
            2.4 km Away
          </h2>

        </div>

      </div>

    </div>
  );
}

export default AIRiskPanel;