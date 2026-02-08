import TopNav from "../components/TopNav";
import { AlertCircle, BellRing, ShieldAlert } from 'lucide-react';

export default function Alerts() {
  const mockAlerts = [
    { id: 1, type: 'danger', msg: 'High spending detected in Food category!', icon: ShieldAlert },
    { id: 2, type: 'warning', msg: 'Subscription for Netflix is due tomorrow.', icon: BellRing },
    { id: 3, type: 'info', msg: 'You saved 15% more than last month!', icon: AlertCircle },
  ];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <TopNav title="Security & Alerts" />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {mockAlerts.map(alert => (
          <div key={alert.id} className="card" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            background: 'linear-gradient(90deg, #121424, #0a0b18)',
          }}>
            <div className="icon-btn" style={{
              background: alert.type === 'danger' ? 'rgba(244, 63, 94, 0.1)' :
                alert.type === 'warning' ? 'rgba(251, 191, 36, 0.1)' : 'rgba(61, 126, 255, 0.1)',
              color: alert.type === 'danger' ? '#f43f5e' :
                alert.type === 'warning' ? '#fbbf24' : '#3d7eff'
            }}>
              <alert.icon size={24} />
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '18px' }}>{alert.msg}</div>
              <div style={{ color: 'var(--text-dim)', fontSize: '14px' }}>Detected just now</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
