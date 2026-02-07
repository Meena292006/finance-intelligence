export default function AlertCard({ alert }) {
  return (
    <div className="alert-card">
      <h4>{alert.title}</h4>
      <p>{alert.message}</p>
    </div>
  );
}
