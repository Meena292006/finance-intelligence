import { Bell, MessageSquare, Calendar as CalendarIcon } from 'lucide-react';

export default function TopNav({ title, onCalendarClick }) {
    return (
        <nav className="top-nav">
            <h1>{title}</h1>

            <div className="nav-icons">
                <div className="icon-btn" onClick={onCalendarClick} style={{ cursor: 'pointer' }}>
                    <CalendarIcon size={20} />
                </div>
                <div className="icon-btn">
                    <MessageSquare size={20} />
                </div>
                <div className="icon-btn">
                    <Bell size={20} />
                </div>

                <div
                    className="user-avatar"
                    style={{
                        width: '45px',
                        height: '45px',
                        borderRadius: '12px',
                        background: 'linear-gradient(45deg, #3d7eff, #9d50ff)',
                        marginLeft: '10px'
                    }}
                />
            </div>
        </nav>
    );
}
