import StatCard from "../components/StatCard";
import TransactionFeed from "../components/TransactionFeed";
import useLiveData from "../hooks/useLiveData";

export default function Dashboard() {
  const { stats, transactions } = useLiveData();

  return (
    <div className="page">
      <h3>Live Spending Overview</h3>

      <div className="grid">
        <StatCard title="Total Spend" value={`₹${stats.total}`} />
        <StatCard title="Avg Spend" value={`₹${stats.avg}`} />
        <StatCard title="Transactions" value={stats.count} />
      </div>

      <TransactionFeed data={transactions} />
    </div>
  );
}
