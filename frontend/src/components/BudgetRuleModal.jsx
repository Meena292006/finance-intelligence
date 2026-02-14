import { useState } from 'react';
import { X, AlertCircle, Lock } from 'lucide-react';

export default function BudgetRuleModal({ selectedDates, onClose, onSave, onSaveRule }) {
    const [mode, setMode] = useState('budget'); // 'budget' or 'rule'
    const [budgetData, setBudgetData] = useState({
        min: 0,
        max: 5000,
        priority: 'medium'
    });

    const [ruleData, setRuleData] = useState({
        name: '',
        type: 'daily_limit',
        category: 'all',
        threshold: 500,
        action: 'warn',
        condition: 'greater_than'
    });

    const handleSaveBudget = () => {
        onSave(budgetData);
    };

    const handleSaveRule = () => {
        onSaveRule(ruleData);
    };

    const dateRangeText = selectedDates.length > 0
        ? selectedDates.length === 1
            ? selectedDates[0].toLocaleDateString()
            : `${selectedDates[0].toLocaleDateString()} - ${selectedDates[selectedDates.length - 1].toLocaleDateString()}`
        : 'No dates selected';

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content budget-rule-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <div>
                        <h2>{mode === 'budget' ? 'Set Budget' : 'Create Budget Rule'}</h2>
                        <p className="modal-subtitle">
                            {mode === 'budget' ? dateRangeText : 'Define intelligent spending rules'}
                        </p>
                    </div>
                    <button className="close-btn" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                {/* Mode Toggle */}
                <div className="mode-toggle">
                    <button
                        className={`mode-btn ${mode === 'budget' ? 'active' : ''}`}
                        onClick={() => setMode('budget')}
                    >
                        Set Budget
                    </button>
                    <button
                        className={`mode-btn ${mode === 'rule' ? 'active' : ''}`}
                        onClick={() => setMode('rule')}
                    >
                        Create Rule
                    </button>
                </div>

                <div className="modal-body">
                    {mode === 'budget' ? (
                        // Budget Mode
                        <div className="budget-form">
                            <div className="form-group">
                                <label>Minimum Budget (₹)</label>
                                <input
                                    type="number"
                                    value={budgetData.min}
                                    onChange={(e) => setBudgetData({ ...budgetData, min: Number(e.target.value) })}
                                    className="form-input"
                                    placeholder="0"
                                />
                                <span className="form-hint">Minimum spending threshold</span>
                            </div>

                            <div className="form-group">
                                <label>Maximum Budget (₹)</label>
                                <input
                                    type="number"
                                    value={budgetData.max}
                                    onChange={(e) => setBudgetData({ ...budgetData, max: Number(e.target.value) })}
                                    className="form-input"
                                    placeholder="5000"
                                />
                                <span className="form-hint">Alert will trigger when exceeded</span>
                            </div>

                            <div className="form-group">
                                <label>Priority Level</label>
                                <select
                                    value={budgetData.priority}
                                    onChange={(e) => setBudgetData({ ...budgetData, priority: e.target.value })}
                                    className="form-select"
                                >
                                    <option value="low">Low - Flexible spending</option>
                                    <option value="medium">Medium - Moderate control</option>
                                    <option value="critical">Critical - Strict limit</option>
                                </select>
                            </div>

                            <div className="budget-preview">
                                <h4>Budget Preview</h4>
                                <div className="preview-stats">
                                    <div className="preview-stat">
                                        <span className="preview-label">Range</span>
                                        <span className="preview-value">₹{budgetData.min.toLocaleString()} - ₹{budgetData.max.toLocaleString()}</span>
                                    </div>
                                    <div className="preview-stat">
                                        <span className="preview-label">Priority</span>
                                        <span className={`preview-badge ${budgetData.priority}`}>
                                            {budgetData.priority.toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="preview-stat">
                                        <span className="preview-label">Dates</span>
                                        <span className="preview-value">{selectedDates.length} day(s)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // Rule Mode
                        <div className="rule-form">
                            <div className="form-group">
                                <label>Rule Name</label>
                                <input
                                    type="text"
                                    value={ruleData.name}
                                    onChange={(e) => setRuleData({ ...ruleData, name: e.target.value })}
                                    className="form-input"
                                    placeholder="e.g., Weekend Food Limit"
                                />
                            </div>

                            <div className="form-group">
                                <label>Rule Type</label>
                                <select
                                    value={ruleData.type}
                                    onChange={(e) => setRuleData({ ...ruleData, type: e.target.value })}
                                    className="form-select"
                                >
                                    <option value="daily_limit">Daily Spending Limit</option>
                                    <option value="category_limit">Category Limit</option>
                                    <option value="weekend_control">Weekend vs Weekday</option>
                                    <option value="time_based">Time-based Alert</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Category</label>
                                <select
                                    value={ruleData.category}
                                    onChange={(e) => setRuleData({ ...ruleData, category: e.target.value })}
                                    className="form-select"
                                >
                                    <option value="all">All Categories</option>
                                    <option value="food">Food & Dining</option>
                                    <option value="travel">Travel & Transport</option>
                                    <option value="shopping">Shopping</option>
                                    <option value="entertainment">Entertainment</option>
                                    <option value="subscriptions">Subscriptions</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Condition</label>
                                <div className="condition-builder">
                                    <select
                                        value={ruleData.condition}
                                        onChange={(e) => setRuleData({ ...ruleData, condition: e.target.value })}
                                        className="form-select"
                                    >
                                        <option value="greater_than">Greater than</option>
                                        <option value="less_than">Less than</option>
                                        <option value="equals">Equals</option>
                                    </select>
                                    <input
                                        type="number"
                                        value={ruleData.threshold}
                                        onChange={(e) => setRuleData({ ...ruleData, threshold: Number(e.target.value) })}
                                        className="form-input"
                                        placeholder="500"
                                    />
                                    <span className="currency-label">₹</span>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Action</label>
                                <select
                                    value={ruleData.action}
                                    onChange={(e) => setRuleData({ ...ruleData, action: e.target.value })}
                                    className="form-select"
                                >
                                    <option value="warn">Warn me</option>
                                    <option value="notify">Send notification</option>
                                    <option value="lock">Lock spending (Future)</option>
                                </select>
                            </div>

                            <div className="rule-preview">
                                <AlertCircle size={20} />
                                <div className="rule-preview-text">
                                    <strong>Rule Summary:</strong>
                                    <p>
                                        If <strong>{ruleData.category === 'all' ? 'total' : ruleData.category}</strong> spending is{' '}
                                        <strong>{ruleData.condition.replace('_', ' ')}</strong> ₹{ruleData.threshold.toLocaleString()},
                                        then <strong>{ruleData.action}</strong>.
                                    </p>
                                </div>
                            </div>

                            <div className="rule-examples">
                                <h4>Example Rules</h4>
                                <div className="example-item" onClick={() => setRuleData({
                                    name: 'Food Delivery Limit',
                                    type: 'category_limit',
                                    category: 'food',
                                    threshold: 500,
                                    action: 'warn',
                                    condition: 'greater_than'
                                })}>
                                    "If food {'>'}  ₹500/day → warn me"
                                </div>
                                <div className="example-item" onClick={() => setRuleData({
                                    name: 'Weekend Control',
                                    type: 'weekend_control',
                                    category: 'all',
                                    threshold: 1000,
                                    action: 'notify',
                                    condition: 'greater_than'
                                })}>
                                    "If weekend expenses {'>'} weekday average → notify"
                                </div>
                                <div className="example-item" onClick={() => setRuleData({
                                    name: 'Entertainment Lock',
                                    type: 'category_limit',
                                    category: 'entertainment',
                                    threshold: 2000,
                                    action: 'lock',
                                    condition: 'greater_than'
                                })}>
                                    "Lock entertainment spending after ₹2000"
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="modal-footer">
                    <button className="cancel-btn" onClick={onClose}>Cancel</button>
                    <button
                        className="save-btn primary"
                        onClick={mode === 'budget' ? handleSaveBudget : handleSaveRule}
                    >
                        {mode === 'budget' ? 'Set Budget' : 'Create Rule'}
                    </button>
                </div>
            </div>
        </div>
    );
}
