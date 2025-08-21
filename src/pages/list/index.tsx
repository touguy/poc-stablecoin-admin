import { useState } from "react";

const issueData = [
  {
    id: "20240805001",
    tx: "0x1234...abcd",
    network: "Amoy",
    date: "2025-08-05 13:00",
    amount: "1000",
    address: "0xA1b2...C3d4",
    status: "승인대기",
    approvedAt: "-",
  },
  // ...더미 데이터 추가 가능
];

const refundData = [
  {
    id: "20240805002",
    tx: "0x5678...efgh",
    network: "Amoy",
    date: "2025-08-05 14:00",

    
    amount: "500",
    address: "0xB2c3...D4e5",
    refundAccount: "하나은행 1002-123-456789",
    status: "승인",
    approvedAt: "2025-08-05 15:00",
  },
  // ...더미 데이터 추가 가능
];

const IssueList = () => (
  <div className="p-4">
    <h3 className="text-lg font-semibold mb-2">발행 신청내역</h3>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded shadow border text-sm table-fixed">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 w-28">거래번호</th>
            <th className="p-2 w-36">연관 TX</th>
            <th className="p-2 w-20">네트워크</th>
            <th className="p-2 w-32">신청 일시</th>
            <th className="p-2 w-16">수량</th>
            <th className="p-2 w-40">지갑주소</th>
            <th className="p-2 w-20">상태</th>
            <th className="p-2 w-32">승인/거절 일시</th>
          </tr>
        </thead>
        <tbody>
          {issueData.map((row) => (
            <tr key={row.id} className="border-t text-center">
              <td className="p-2">{row.id}</td>
              <td className="p-2">{row.tx}</td>
              <td className="p-2">{row.network}</td>
              <td className="p-2">{row.date}</td>
              <td className="p-2">{row.amount}</td>
              <td className="p-2">{row.address}</td>
              <td className="p-2">{row.status}</td>
              <td className="p-2">{row.approvedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const RefundList = () => (
  <div className="p-4">
    <h3 className="text-lg font-semibold mb-2">환불 신청내역</h3>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded shadow border text-sm table-fixed">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 w-28">거래번호</th>
            <th className="p-2 w-36">연관 TX</th>
            <th className="p-2 w-20">네트워크</th>
            <th className="p-2 w-32">신청 일시</th>
            <th className="p-2 w-16">수량</th>
            <th className="p-2 w-40">지갑주소</th>
            <th className="p-2 w-40">환불 수령 계좌</th>
            <th className="p-2 w-20">상태</th>
            <th className="p-2 w-32">승인/거절 일시</th>
          </tr>
        </thead>
        <tbody>
          {refundData.map((row) => (
            <tr key={row.id} className="border-t text-center">
              <td className="p-2">{row.id}</td>
              <td className="p-2">{row.tx}</td>
              <td className="p-2">{row.network}</td>
              <td className="p-2">{row.date}</td>
              <td className="p-2">{row.amount}</td>
              <td className="p-2">{row.address}</td>
              <td className="p-2">{row.refundAccount}</td>
              <td className="p-2">{row.status}</td>
              <td className="p-2">{row.approvedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const ListPage = () => {


  const [tab, setTab] = useState<"issue" | "refund">("issue");

  return (
    <div className="max-w-7xl mx-auto mt-8 bg-gray-50 rounded shadow">
      <h2 className="text-2xl font-bold p-6 border-b">발행/환불 관리</h2>
      <div className="flex border-b">
        <button
          className={`flex-1 py-3 text-center font-semibold ${tab === "issue" ? "border-b-2 border-blue-500 text-blue-600 bg-white" : "text-gray-500 bg-gray-100"}`}
          onClick={() => setTab("issue")}
        >
          발행
        </button>
        <button
          className={`flex-1 py-3 text-center font-semibold ${tab === "refund" ? "border-b-2 border-blue-500 text-blue-600 bg-white" : "text-gray-500 bg-gray-100"}`}
          onClick={() => setTab("refund")}
        >
          환불
        </button>
      </div>
      <div>
        {tab === "issue" ? <IssueList /> : <RefundList />}
      </div>
    </div>
  );
};

export default ListPage;