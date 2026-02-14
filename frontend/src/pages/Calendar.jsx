import { useState, useMemo, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus, TrendingUp, AlertTriangle, Sparkles, Target, Calendar as CalendarIcon } from 'lucide-react';
import TopNav from '../components/TopNav';
import DateDetailModal from '../components/DateDetailModal';
import BudgetRuleModal from '../components/BudgetRuleModal';
import AIInsightPanel from '../components/AIInsightPanel';
import '../styles/Calendar.css';

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [view, setView] = useState('month'); // 'day', 'week', 'month'
    const [selectedDates, setSelectedDates] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [budgets, setBudgets] = useState({});
    const [expenses, setExpenses] = useState({});
    const [showDateModal, setShowDateModal] = useState(false);
    const [selectedDateForDetail, setSelectedDateForDetail] = useState(null);
    const [showBudgetModal, setShowBudgetModal] = useState(false);
    const [budgetRules, setBudgetRules] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const [showAIPanel, setShowAIPanel] = useState(true);

    // Generate calendar days
    const calendarDays = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - startDate.getDay());

        const days = [];
        const current = new Date(startDate);

        for (let i = 0; i < 42; i++) {
            days.push(new Date(current));
            current.setDate(current.getDate() + 1);
        }

        return days;
    }, [currentDate]);

    // Simulate real-time expense data
    useEffect(() => {
        const interval = setInterval(() => {
            const today = new Date().toDateString();
            setExpenses(prev => ({
                ...prev,
                [today]: (prev[today] || 0) + Math.floor(Math.random() * 500)
            }));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    // Check budget rules and generate alerts
    useEffect(() => {
        const newAlerts = [];

        Object.keys(budgets).forEach(dateKey => {
            const budget = budgets[dateKey];
            const spent = expenses[dateKey] || 0;
            const utilization = (spent / budget.max) * 100;

            if (utilization >= 120) {
                newAlerts.push({
                    id: `${dateKey}-emergency`,
                    type: 'emergency',
                    date: dateKey,
                    message: `🚨 Emergency: Budget breach detected. Overspend: ₹${(spent - budget.max).toLocaleString()}`,
                    utilization
                });
            } else if (utilization >= 100) {
                newAlerts.push({
                    id: `${dateKey}-critical`,
                    type: 'critical',
                    date: dateKey,
                    message: `🔴 Critical: You've exceeded your budget by ₹${(spent - budget.max).toLocaleString()}`,
                    utilization
                });
            } else if (utilization >= 80) {
                newAlerts.push({
                    id: `${dateKey}-warning`,
                    type: 'warning',
                    date: dateKey,
                    message: `⚠️ Warning: You've used ${utilization.toFixed(0)}% of your budget`,
                    utilization
                });
            }
        });

        // Check budget rules
        budgetRules.forEach(rule => {
            // Rule checking logic here
            if (rule.type === 'daily_limit') {
                Object.keys(expenses).forEach(dateKey => {
                    const spent = expenses[dateKey] || 0;
                    if (spent > rule.threshold) {
                        newAlerts.push({
                            id: `${dateKey}-rule-${rule.id}`,
                            type: 'rule',
                            date: dateKey,
                            message: `📋 Rule triggered: ${rule.name} - Spent ₹${spent.toLocaleString()}`,
                            rule: rule.name
                        });
                    }
                });
            }
        });

        setAlerts(newAlerts);
    }, [budgets, expenses, budgetRules]);

    const getDateKey = (date) => date.toDateString();

    const getBudgetStatus = (date) => {
        const key = getDateKey(date);
        const budget = budgets[key];
        const spent = expenses[key] || 0;

        if (!budget) return 'none';

        const utilization = (spent / budget.max) * 100;

        if (utilization >= 100) return 'over';
        if (utilization >= 80) return 'warning';
        return 'good';
    };

    const handleDateMouseDown = (date) => {
        setIsDragging(true);
        setSelectedDates([date]);
    };

    const handleDateMouseEnter = (date) => {
        if (isDragging) {
            setSelectedDates(prev => {
                const start = prev[0];
                const dates = [];
                const current = new Date(Math.min(start, date));
                const end = new Date(Math.max(start, date));

                while (current <= end) {
                    dates.push(new Date(current));
                    current.setDate(current.getDate() + 1);
                }

                return dates;
            });
        }
    };

    const handleDateMouseUp = () => {
        setIsDragging(false);
        if (selectedDates.length > 0) {
            setShowBudgetModal(true);
        }
    };

    const handleDateClick = (date) => {
        setSelectedDateForDetail(date);
        setShowDateModal(true);
    };

    const saveBudget = (budgetData) => {
        const newBudgets = { ...budgets };
        selectedDates.forEach(date => {
            newBudgets[getDateKey(date)] = budgetData;
        });
        setBudgets(newBudgets);
        setSelectedDates([]);
        setShowBudgetModal(false);
    };

    const navigateMonth = (direction) => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(newDate.getMonth() + direction);
            return newDate;
        });
    };

    const isSelected = (date) => {
        return selectedDates.some(d => getDateKey(d) === getDateKey(date));
    };

    const isCurrentMonth = (date) => {
        return date.getMonth() === currentDate.getMonth();
    };

    const isToday = (date) => {
        const today = new Date();
        return getDateKey(date) === getDateKey(today);
    };

    return (
        <div className="calendar-page">
            <TopNav title="Finance Calendar" />

            <div className="calendar-container">
                {/* Header Controls */}
                <div className="calendar-header">
                    <div className="calendar-nav">
                        <button className="nav-btn" onClick={() => navigateMonth(-1)}>
                            <ChevronLeft size={20} />
                        </button>
                        <h2 className="calendar-title">
                            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </h2>
                        <button className="nav-btn" onClick={() => navigateMonth(1)}>
                            <ChevronRight size={20} />
                        </button>
                    </div>

                    <div className="view-controls">
                        <button
                            className={`view-btn ${view === 'day' ? 'active' : ''}`}
                            onClick={() => setView('day')}
                        >
                            Day
                        </button>
                        <button
                            className={`view-btn ${view === 'week' ? 'active' : ''}`}
                            onClick={() => setView('week')}
                        >
                            Week
                        </button>
                        <button
                            className={`view-btn ${view === 'month' ? 'active' : ''}`}
                            onClick={() => setView('month')}
                        >
                            Month
                        </button>
                    </div>

                    <button className="add-rule-btn" onClick={() => setShowBudgetModal(true)}>
                        <Plus size={18} />
                        Add Rule
                    </button>
                </div>

                <div className="calendar-main">
                    {/* Calendar Grid */}
                    <div className="calendar-grid-wrapper">
                        {/* Legend */}
                        <div className="calendar-legend">
                            <div className="legend-item">
                                <div className="legend-dot good"></div>
                                <span>Under Budget</span>
                            </div>
                            <div className="legend-item">
                                <div className="legend-dot warning"></div>
                                <span>Near Limit (80-95%)</span>
                            </div>
                            <div className="legend-item">
                                <div className="legend-dot over"></div>
                                <span>Over Budget</span>
                            </div>
                        </div>

                        {/* Weekday Headers */}
                        <div className="calendar-weekdays">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                <div key={day} className="weekday-header">{day}</div>
                            ))}
                        </div>

                        {/* Calendar Days */}
                        <div className="calendar-grid" onMouseUp={handleDateMouseUp}>
                            {calendarDays.map((date, index) => {
                                const status = getBudgetStatus(date);
                                const key = getDateKey(date);
                                const budget = budgets[key];
                                const spent = expenses[key] || 0;
                                const utilization = budget ? (spent / budget.max) * 100 : 0;

                                return (
                                    <div
                                        key={index}
                                        className={`calendar-day ${status} ${isSelected(date) ? 'selected' : ''} ${!isCurrentMonth(date) ? 'other-month' : ''} ${isToday(date) ? 'today' : ''}`}
                                        onMouseDown={() => handleDateMouseDown(date)}
                                        onMouseEnter={() => handleDateMouseEnter(date)}
                                        onClick={() => handleDateClick(date)}
                                    >
                                        <div className="day-number">{date.getDate()}</div>

                                        {budget && (
                                            <div className="day-budget-info">
                                                <div className="budget-bar">
                                                    <div
                                                        className={`budget-fill ${status}`}
                                                        style={{ width: `${Math.min(utilization, 100)}%` }}
                                                    ></div>
                                                </div>
                                                <div className="budget-text">
                                                    ₹{spent.toLocaleString()} / ₹{budget.max.toLocaleString()}
                                                </div>
                                            </div>
                                        )}

                                        {status !== 'none' && (
                                            <div className={`status-indicator ${status}`}>
                                                {status === 'over' && '🔴'}
                                                {status === 'warning' && '🟡'}
                                                {status === 'good' && '🟢'}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* AI Insight Panel */}
                    {showAIPanel && (
                        <AIInsightPanel
                            budgets={budgets}
                            expenses={expenses}
                            alerts={alerts}
                            onClose={() => setShowAIPanel(false)}
                        />
                    )}
                </div>

                {/* Active Alerts */}
                {alerts.length > 0 && (
                    <div className="alerts-section">
                        <h3 className="alerts-title">
                            <AlertTriangle size={20} />
                            Active Alerts ({alerts.length})
                        </h3>
                        <div className="alerts-grid">
                            {alerts.slice(0, 5).map(alert => (
                                <div key={alert.id} className={`alert-card ${alert.type}`}>
                                    <div className="alert-message">{alert.message}</div>
                                    {alert.utilization && (
                                        <div className="alert-utilization">
                                            {alert.utilization.toFixed(1)}% utilized
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Modals */}
            {showDateModal && selectedDateForDetail && (
                <DateDetailModal
                    date={selectedDateForDetail}
                    budget={budgets[getDateKey(selectedDateForDetail)]}
                    expenses={expenses[getDateKey(selectedDateForDetail)] || 0}
                    onClose={() => setShowDateModal(false)}
                    onSave={(data) => {
                        setBudgets(prev => ({
                            ...prev,
                            [getDateKey(selectedDateForDetail)]: data
                        }));
                        setShowDateModal(false);
                    }}
                />
            )}

            {showBudgetModal && (
                <BudgetRuleModal
                    selectedDates={selectedDates}
                    onClose={() => {
                        setShowBudgetModal(false);
                        setSelectedDates([]);
                    }}
                    onSave={saveBudget}
                    onSaveRule={(rule) => {
                        setBudgetRules(prev => [...prev, { ...rule, id: Date.now() }]);
                        setShowBudgetModal(false);
                    }}
                />
            )}
        </div>
    );
}
