import { useState, useEffect } from 'react';
import { Sparkles, TrendingDown, TrendingUp, AlertTriangle, X, Brain } from 'lucide-react';

export default function AIInsightPanel({ budgets, expenses, alerts, onClose }) {
    const [insights, setInsights] = useState([]);
    const [predictions, setPredictions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate AI analysis
        setTimeout(() => {
            generateInsights();
            generatePredictions();
            setLoading(false);
        }, 1000);
    }, [budgets, expenses]);

    const generateInsights = () => {
        const newInsights = [];

        // Analyze spending patterns
        const totalBudgeted = Object.values(budgets).reduce((sum, b) => sum + (b?.max || 0), 0);
        const totalSpent = Object.values(expenses).reduce((sum, e) => sum + e, 0);
        const avgDailySpend = totalSpent / Object.keys(expenses).length || 0;

        if (avgDailySpend > 1000) {
            newInsights.push({
                id: 1,
                type: 'warning',
                icon: AlertTriangle,
                title: 'High Daily Average',
                message: `Your average daily spending is ₹${avgDailySpend.toFixed(0)}. Consider reducing non-essential expenses.`,
                impact: 'high'
            });
        }

        // Weekend analysis
        const weekendSpending = calculateWeekendSpending();
        const weekdaySpending = calculateWeekdaySpending();

        if (weekendSpending > weekdaySpending * 1.5) {
            newInsights.push({
                id: 2,
                type: 'info',
                icon: TrendingUp,
                title: 'Weekend Spending Pattern',
                message: `Weekend expenses are ${((weekendSpending / weekdaySpending - 1) * 100).toFixed(0)}% higher than weekdays.`,
                impact: 'medium'
            });
        }

        // Budget utilization
        const overBudgetDays = Object.keys(budgets).filter(key => {
            const budget = budgets[key];
            const spent = expenses[key] || 0;
            return spent > budget.max;
        }).length;

        if (overBudgetDays > 0) {
            newInsights.push({
                id: 3,
                type: 'critical',
                icon: AlertTriangle,
                title: 'Budget Breaches',
                message: `You've exceeded budget on ${overBudgetDays} day(s) this month.`,
                impact: 'high'
            });
        }

        // Positive insights
        const underBudgetDays = Object.keys(budgets).filter(key => {
            const budget = budgets[key];
            const spent = expenses[key] || 0;
            return spent < budget.max * 0.8;
        }).length;

        if (underBudgetDays > 5) {
            newInsights.push({
                id: 4,
                type: 'success',
                icon: TrendingDown,
                title: 'Great Control!',
                message: `You stayed under budget on ${underBudgetDays} days. Keep it up!`,
                impact: 'positive'
            });
        }

        setInsights(newInsights);
    };

    const generatePredictions = () => {
        const newPredictions = [];

        // Calculate spending velocity
        const recentDays = Object.keys(expenses).slice(-7);
        const recentSpending = recentDays.reduce((sum, key) => sum + (expenses[key] || 0), 0);
        const dailyRate = recentSpending / recentDays.length;

        // Predict month-end
        const today = new Date();
        const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
        const daysRemaining = daysInMonth - today.getDate();
        const projectedTotal = recentSpending + (dailyRate * daysRemaining);

        const monthlyBudget = Object.values(budgets).reduce((sum, b) => sum + (b?.max || 0), 0);

        if (projectedTotal > monthlyBudget) {
            const overspend = projectedTotal - monthlyBudget;
            const breachDay = Math.floor(monthlyBudget / dailyRate);

            newPredictions.push({
                id: 1,
                type: 'warning',
                title: 'Overspending Alert',
                message: `If you continue at this pace, you'll exceed your monthly budget by the ${breachDay}th.`,
                suggestion: 'Reduce daily spending by ₹' + Math.ceil(overspend / daysRemaining).toLocaleString(),
                projectedOverspend: overspend
            });
        }

        // Category-specific predictions
        newPredictions.push({
            id: 2,
            type: 'tip',
            title: 'Smart Suggestion',
            message: 'Reducing food delivery for 3 days keeps you safe.',
            suggestion: 'Try cooking at home this weekend',
            potentialSavings: 1500
        });

        // Behavioral insights
        newPredictions.push({
            id: 3,
            type: 'insight',
            title: 'Spending Pattern Detected',
            message: 'You tend to overspend on Fridays and Saturdays.',
            suggestion: 'Set a weekend budget limit of ₹2000',
            confidence: 87
        });

        setPredictions(newPredictions);
    };

    const calculateWeekendSpending = () => {
        return Object.keys(expenses).reduce((sum, key) => {
            const date = new Date(key);
            const day = date.getDay();
            return (day === 0 || day === 6) ? sum + expenses[key] : sum;
        }, 0);
    };

    const calculateWeekdaySpending = () => {
        return Object.keys(expenses).reduce((sum, key) => {
            const date = new Date(key);
            const day = date.getDay();
            return (day > 0 && day < 6) ? sum + expenses[key] : sum;
        }, 0);
    };

    return (
        <div className="ai-insight-panel">
            <div className="panel-header">
                <div className="panel-title">
                    <Brain className="panel-icon" size={24} />
                    <div>
                        <h3>AI Financial Guardian</h3>
                        <p>Real-time intelligence & predictions</p>
                    </div>
                </div>
                <button className="close-panel-btn" onClick={onClose}>
                    <X size={20} />
                </button>
            </div>

            {loading ? (
                <div className="panel-loading">
                    <div className="loading-spinner"></div>
                    <p>Analyzing your spending patterns...</p>
                </div>
            ) : (
                <div className="panel-content">
                    {/* Predictions Section */}
                    <div className="panel-section">
                        <h4 className="section-title">
                            <Sparkles size={18} />
                            Predictive Insights
                        </h4>
                        <div className="predictions-list">
                            {predictions.map(pred => (
                                <div key={pred.id} className={`prediction-card ${pred.type}`}>
                                    <div className="prediction-header">
                                        <span className="prediction-title">{pred.title}</span>
                                        {pred.confidence && (
                                            <span className="confidence-badge">{pred.confidence}% confident</span>
                                        )}
                                    </div>
                                    <p className="prediction-message">{pred.message}</p>
                                    {pred.suggestion && (
                                        <div className="prediction-suggestion">
                                            <strong>💡 Suggestion:</strong> {pred.suggestion}
                                        </div>
                                    )}
                                    {pred.projectedOverspend && (
                                        <div className="prediction-stat">
                                            Projected overspend: <strong>₹{pred.projectedOverspend.toLocaleString()}</strong>
                                        </div>
                                    )}
                                    {pred.potentialSavings && (
                                        <div className="prediction-stat success">
                                            Potential savings: <strong>₹{pred.potentialSavings.toLocaleString()}</strong>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Insights Section */}
                    <div className="panel-section">
                        <h4 className="section-title">
                            <TrendingUp size={18} />
                            Behavioral Insights
                        </h4>
                        <div className="insights-list">
                            {insights.map(insight => (
                                <div key={insight.id} className={`insight-card ${insight.type}`}>
                                    <div className="insight-icon">
                                        <insight.icon size={20} />
                                    </div>
                                    <div className="insight-content">
                                        <h5>{insight.title}</h5>
                                        <p>{insight.message}</p>
                                    </div>
                                    <div className={`impact-badge ${insight.impact}`}>
                                        {insight.impact}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="panel-section">
                        <h4 className="section-title">Quick Analysis</h4>
                        <div className="quick-stats">
                            <div className="quick-stat">
                                <span className="stat-label">Active Alerts</span>
                                <span className="stat-value">{alerts.length}</span>
                            </div>
                            <div className="quick-stat">
                                <span className="stat-label">Budgeted Days</span>
                                <span className="stat-value">{Object.keys(budgets).length}</span>
                            </div>
                            <div className="quick-stat">
                                <span className="stat-label">Avg Daily Spend</span>
                                <span className="stat-value">
                                    ₹{(Object.values(expenses).reduce((a, b) => a + b, 0) / Object.keys(expenses).length || 0).toFixed(0)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
