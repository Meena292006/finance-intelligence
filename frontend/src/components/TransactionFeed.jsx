export default function TransactionFeed({ data }) {
  return (
    <div>
      <h4>Live Transactions</h4>
      <ul>
        {data.map((t, i) => (
          <li key={i}>
            ₹{t.amount} – {t.category}
          </li>
        ))}
      </ul>
    </div>
  );
}
