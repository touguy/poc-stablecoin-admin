interface RequestTransactionsTableProps {
    transactions: any[];
    explorerUrl?: string;
  }
  
  const RequestTransactionsTable = ({
    transactions,
    explorerUrl,
  }: RequestTransactionsTableProps) => {
    if (!transactions || transactions.length === 0) {
      return <p className="text-gray-500">트랜잭션 데이터가 없습니다.</p>;
    }
  
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b">#</th>
              <th className="px-4 py-2 border-b">Method</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">Transaction Hash</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx: any, index: number) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{tx.method || "-"}</td>
                <td className="px-4 py-2">{tx.transactionStatus || "-"}</td>
                <td className="px-4 py-2 break-all">
                  {explorerUrl && tx.transactionHash ? (
                    <a
                      href={`${explorerUrl}/tx/${tx.transactionHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {tx.transactionHash}
                    </a>
                  ) : (
                    tx.transactionHash || "-"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default RequestTransactionsTable;
  