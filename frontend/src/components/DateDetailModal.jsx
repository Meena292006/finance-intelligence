import { useState, useEffect } from 'react';
import { X, TrendingDown, TrendingUp, Edit2, Save, Tag } from 'lucide-react';

export default function DateDetailModal({ date, budget, expenses, onClose, onSave }) {
    const [isEditing, setIsEditing] = useState(!budget);
    const [budgetData, setBudgetData] = useState(budget || {
        min: 0,
        max: 5000,
        priority: 'medium'
    });
    const [note, setNote] = useState('');
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState('');

    // Simulated transaction data for this date
    const [transactions, setTransactions] = useState([
        { id: 1, merchant: 'Starbucks', category: 'Food', amount: 450, time: '09:30 AM' },
        { id: 2, merchant: 'Uber', category: 'Travel', amount: 280, time: '02:15 PM' },
        { id: 3, merchant: 'Amazon', category: 'Shopping', amount: 1200, time: '06:45 PM' },
    ]);

    const categoryBreakdown = [
        { name: 'Food', amount: 450, color: '#3d7eff' },
        { name: 'Travel', amount: 280, color: '#9d50ff' },
        { name: 'Shopping', amount: 1200, color: '#00d2ff' },
    ];

    const totalSpent = expenses || transactions.reduce((sum, t) => sum + t.amount, 0);
    const remaining = budgetData.max - totalSpent;
    const utilization = (totalSpent / budgetData.max) * 100;
    const healthScore = Math.max(0, 100 - utilization);

    const handleSave = () => {
        onSave({ ...budgetData, note, tags });
    };

    const addTag = () => {
        if (newTag.trim()) {
            setTags([...tags, newTag.trim()]);
            setNewTag('');
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content date-detail-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <div>
                        <h2>{date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</h2>
                        <p className="modal-subtitle">Complete financial overview</p>
                    </div>
                    <button className="close-btn" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className="modal-body">
                    {/* Budget Health Score */}
                    <div className="health-score-card">
                        <div className="score-circle" style={{
                            background: `conic-gradient(
                ${healthScore > 70 ? '#10b981' : healthScore > 40 ? '#fbbf24' : '#f43f5e'} ${healthScore * 3.6}deg,
                rgba(255,255,255,0.1) 0deg
              )`
                        }}>
                            <div className="score-inner">
                                <div className="score-value">{healthScore.toFixed(0)}</div>
                                <div className="score-label">Health</div>
                            </div>
                        </div>
                        <div className="score-details">
                            <h3>Budget Health Score</h3>
                            <div className="score-stats">
                                <div className="stat">
                                    <span className="stat-label">Planned</span>
                                    <span className="stat-value">₹{budgetData.max.toLocaleString()}</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-label">Spent</span>
                                    <span className="stat-value" style={{ color: utilization > 100 ? '#f43f5e' : '#10b981' }}>
                                        ₹{totalSpent.toLocaleString()}
                                    </span>
                                </div>
                                <div className="stat">
                                    <span className="stat-label">Remaining</span>
                                    <span className="stat-value" style={{ color: remaining < 0 ? '#f43f5e' : '#3d7eff' }}>
                                        ₹{remaining.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Budget Settings */}
                    <div className="budget-settings-card">
                        <div className="card-header">
                            <h3>Budget Configuration</h3>
                            {!isEditing ? (
                                <button className="edit-btn" onClick={() => setIsEditing(true)}>
                                    <Edit2 size={16} />
                                    Edit
                                </button>
                            ) : (
                                <button className="save-btn" onClick={() => { setIsEditing(false); handleSave(); }}>
                                    <Save size={16} />
                                    Save
                                </button>
                            )}
                        </div>

                        <div className="budget-inputs">
                            <div className="input-group">
                                <label>Minimum Budget</label>
                                <input
                                    type="number"
                                    value={budgetData.min}
                                    onChange={(e) => setBudgetData({ ...budgetData, min: Number(e.target.value) })}
                                    disabled={!isEditing}
                                    className="budget-input"
                                />
                            </div>
                            <div className="input-group">
                                <label>Maximum Budget</label>
                                <input
                                    type="number"
                                    value={budgetData.max}
                                    onChange={(e) => setBudgetData({ ...budgetData, max: Number(e.target.value) })}
                                    disabled={!isEditing}
                                    className="budget-input"
                                />
                            </div>
                            <div className="input-group">
                                <label>Priority Level</label>
                                <select
                                    value={budgetData.priority}
                                    onChange={(e) => setBudgetData({ ...budgetData, priority: e.target.value })}
                                    disabled={!isEditing}
                                    className="budget-select"
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="critical">Critical</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Category Breakdown */}
                    <div className="category-breakdown-card">
                        <h3>Category Split</h3>
                        <div className="category-list">
                            {categoryBreakdown.map((cat, idx) => (
                                <div key={idx} className="category-item">
                                    <div className="category-info">
                                        <div className="category-dot" style={{ background: cat.color }}></div>
                                        <span className="category-name">{cat.name}</span>
                                    </div>
                                    <div className="category-amount">₹{cat.amount.toLocaleString()}</div>
                                    <div className="category-bar">
                                        <div
                                            className="category-fill"
                                            style={{
                                                width: `${(cat.amount / totalSpent) * 100}%`,
                                                background: cat.color
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Transactions List */}
                    <div className="transactions-card">
                        <h3>Transactions ({transactions.length})</h3>
                        <div className="transactions-list">
                            {transactions.map(txn => (
                                <div key={txn.id} className="transaction-item">
                                    <div className="transaction-icon">
                                        {txn.category === 'Food' && '🍔'}
                                        {txn.category === 'Travel' && '🚗'}
                                        {txn.category === 'Shopping' && '🛍️'}
                                    </div>
                                    <div className="transaction-details">
                                        <div className="transaction-merchant">{txn.merchant}</div>
                                        <div className="transaction-meta">
                                            <span className="transaction-category">{txn.category}</span>
                                            <span className="transaction-time">{txn.time}</span>
                                        </div>
                                    </div>
                                    <div className="transaction-amount">₹{txn.amount.toLocaleString()}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Notes & Tags */}
                    <div className="notes-tags-card">
                        <div className="notes-section">
                            <h3>Notes</h3>
                            <textarea
                                className="notes-input"
                                placeholder="Add notes (e.g., 'Festival expense', 'Emergency')"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                rows={3}
                            />
                        </div>

                        <div className="tags-section">
                            <h3>Justification Tags</h3>
                            <div className="tags-container">
                                {tags.map((tag, idx) => (
                                    <div key={idx} className="tag">
                                        <Tag size={14} />
                                        {tag}
                                        <button onClick={() => setTags(tags.filter((_, i) => i !== idx))}>×</button>
                                    </div>
                                ))}
                            </div>
                            <div className="tag-input-group">
                                <input
                                    type="text"
                                    placeholder="Add tag..."
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                                    className="tag-input"
                                />
                                <button onClick={addTag} className="add-tag-btn">Add</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="cancel-btn" onClick={onClose}>Cancel</button>
                    <button className="save-btn primary" onClick={handleSave}>Save Changes</button>
                </div>
            </div>
        </div>
    );
}
