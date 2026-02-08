import { LayoutDashboard, PieChart, Search, Calendar, Settings, LogOut } from 'lucide-react';

export default function Sidebar({ activePage, setPage }) {
    const icons = [
        { id: 'dashboard', icon: LayoutDashboard },
        { id: 'chat', icon: PieChart },
        { id: 'search', icon: Search },
        { id: 'calendar', icon: Calendar },
        { id: 'settings', icon: Settings },
    ];

    return (
        <aside className="sidebar">
            <div className="logo-section" style={{ marginBottom: '20px' }}>
                <div className="icon-btn" style={{ background: 'var(--primary)', color: 'white', border: 'none' }}>
                    <LayoutDashboard size={22} />
                </div>
            </div>

            {icons.map(({ id, icon: Icon }) => (
                <div
                    key={id}
                    className={`sidebar-icon ${activePage === id ? 'active' : ''}`}
                    style={{
                        color: activePage === id ? 'white' : 'var(--text-dim)',
                    }}
                    onClick={() => setPage(id)}
                >
                    <Icon size={24} />
                </div>
            ))}

            <div style={{ marginTop: 'auto' }}>
                <div className="sidebar-icon">
                    <LogOut size={24} />
                </div>
            </div>
        </aside>
    );
}
