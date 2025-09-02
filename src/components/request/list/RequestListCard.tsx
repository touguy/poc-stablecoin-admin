import { useState } from "react";
import MintListTable from "./table/MintListTable";
import RedeemListTable from "./table/RedeemListTable";

export default function RequestListCard() {
  const [tab, setTab] = useState<"issue" | "refund">("issue");

  return (
    <div>
      <h2 className="text-2xl font-bold p-6 border-b">발행/환불 관리</h2>
      <div className="flex border-b">
        <button
          className={`flex-1 py-3 text-center font-semibold ${
            tab === "issue"
              ? "border-b-2 border-blue-500 text-blue-600 bg-white"
              : "text-gray-500 bg-gray-100"
          }`}
          onClick={() => setTab("issue")}
        >
          발행
        </button>
        <button
          className={`flex-1 py-3 text-center font-semibold ${
            tab === "refund"
              ? "border-b-2 border-blue-500 text-blue-600 bg-white"
              : "text-gray-500 bg-gray-100"
          }`}
          onClick={() => setTab("refund")}
        >
          환불
        </button>
      </div>
      <div className="p-4">
        {tab === "issue" ? <MintListTable /> : <RedeemListTable />}
      </div>
    </div>
  );
}
