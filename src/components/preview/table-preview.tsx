export function TablePreview() {
  const data = [
    { id: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
    { id: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
    { id: "INV003", status: "Unpaid", method: "Bank Transfer", amount: "$350.00" },
    { id: "INV004", status: "Paid", method: "Credit Card", amount: "$450.00" },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-foreground">Table</h3>
      <div className="rounded-lg border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Invoice
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Status
              </th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Method
              </th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr
                key={row.id}
                className="border-b last:border-0 hover:bg-muted/50 transition-colors"
              >
                <td className="px-4 py-3 font-medium">{row.id}</td>
                <td className="px-4 py-3">{row.status}</td>
                <td className="px-4 py-3">{row.method}</td>
                <td className="px-4 py-3 text-right">{row.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
