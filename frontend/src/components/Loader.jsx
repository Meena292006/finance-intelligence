export default function Loader() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
      <div style={{ 
        width: '40px', 
        height: '40px', 
        border: '3px solid rgba(61, 126, 255, 0.1)', 
        borderTopColor: 'var(--primary)', 
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <p style={{ color: 'var(--text-dim)', fontSize: '14px' }}>Analyzing data...</p>
    </div>
  );
}
