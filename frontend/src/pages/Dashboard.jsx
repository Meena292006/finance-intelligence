import { useMemo } from "react";
import useLiveData from "../hooks/useLiveData";
import MoneyRain from "../components/MoneyRain";
import TopNav from "../components/TopNav";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip as ChartTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const { stats, transactions, trend, categories } = useLiveData();

  const COLORS = ['#3d7eff', '#9d50ff', '#00d2ff', '#fbbf24', '#f43f5e'];

  return (
    <div className="dashboard-wrapper" style={{ position: 'relative' }}>
      <MoneyRain count={5} />
      <TopNav title="Product Sales Dashboard" />

      <div className="dashboard-grid">
        {/* Column 1: AI Assistant */}
        <div className="card ai-assistant-card col-ai">
          <h2 style={{ fontSize: '22px', marginBottom: '10px' }}>AI Assistant</h2>

          <div className="sphere-container">
            <div className="sphere" />
            <div style={{
              position: 'absolute',
              color: 'white',
              background: 'rgba(61, 126, 255, 0.4)',
              padding: '6px 18px',
              borderRadius: '20px',
              bottom: '10%',
              fontSize: '13px',
              fontWeight: '600',
              backdropFilter: 'blur(8px)',
              cursor: 'pointer',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              Try Now
            </div>
          </div>

          <div style={{ marginTop: 'auto' }}>
            <p style={{ color: 'var(--text-dim)', lineHeight: '1.6', fontSize: '16px' }}>
              Analyze product sales over last year. <span style={{ color: 'white' }}>Compare revenue, quality, sales and brand.</span>
            </p>
          </div>
        </div>

        {/* Column 2: Total Sale and Revenue Trend */}
        <div className="col-stats">
          {/* Total Sale */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span className="stat-label">Total sale</span>
                <div className="stat-value">₹{stats.total.toLocaleString()}</div>
              </div>
              <div className="icon-btn" style={{ width: '32px', height: '32px' }}><ArrowUpRight size={16} /></div>
            </div>

            <div className="chart-container" style={{ minHeight: '150px' }}>
              <ResponsiveContainer width="100%" height="100%" minHeight={150}>
                <BarChart data={trend}>
                  <Bar dataKey="value" fill="#3d7eff" radius={[4, 4, 0, 0]} />
                  <ChartTooltip
                    contentStyle={{ background: '#121424', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Revenue Trend */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <div>
                <h3 style={{ fontSize: '16px' }}>Revenue trend</h3>
                <span className="stat-label">Summary Statistics</span>
              </div>
              <div className="icon-btn" style={{ width: '32px', height: '32px' }}><TrendingUp size={16} /></div>
            </div>

            <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
              <div><div className="stat-label">Min</div><div style={{ fontWeight: 600, fontSize: '14px' }}>₹{trend.length ? Math.min(...trend.map(d => d.value)).toLocaleString() : 0}</div></div>
              <div><div className="stat-label">Max</div><div style={{ fontWeight: 600, fontSize: '14px' }}>₹{trend.length ? Math.max(...trend.map(d => d.value)).toLocaleString() : 0}</div></div>
              <div><div className="stat-label">Avg</div><div style={{ fontWeight: 600, fontSize: '14px' }}>₹{stats.avg.toFixed(0)}</div></div>
            </div>

            <div className="chart-container" style={{ minHeight: '150px' }}>
              <ResponsiveContainer width="100%" height="100%" minHeight={150}>
                <AreaChart data={trend}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3d7eff" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3d7eff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="value" stroke="#3d7eff" fillOpacity={1} fill="url(#colorVal)" strokeWidth={2} />
                  <ChartTooltip
                    contentStyle={{ background: '#121424', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Column 3: Category Chart and Credit Rate */}
        <div className="col-right">
          {/* Categories Pie Chart */}
          <div className="card" style={{ flex: 1, alignItems: 'center' }}>
            <h3 style={{ fontSize: '16px', alignSelf: 'flex-start', marginBottom: '10px' }}>Spend Analysis</h3>
            <div style={{ height: '160px', width: '100%', minHeight: '160px' }}>
              <ResponsiveContainer width="100%" height="100%" minHeight={160}>
                <PieChart>
                  <Pie
                    data={categories}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip contentStyle={{ background: '#121424', border: '1px solid rgba(255,255,255,0.1)' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Credit Rate Gauge */}
          <div className="card" style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <span className="stat-label">Credit rate</span>
            <div style={{ position: 'relative', marginTop: '15px' }}>
              <div style={{
                width: '120px',
                height: '60px',
                borderTopLeftRadius: '120px',
                borderTopRightRadius: '120px',
                border: '8px solid rgba(255,255,255,0.05)',
                borderBottom: 'none',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, width: '100%', height: '100%',
                  borderTopLeftRadius: '120px', borderTopRightRadius: '120px',
                  border: '8px solid var(--primary)',
                  borderBottom: 'none',
                  transform: 'rotate(-20deg)',
                  transformOrigin: 'bottom center',
                  boxShadow: '0 0 15px rgba(61, 126, 255, 0.3)'
                }} />
              </div>
              <div style={{
                position: 'absolute',
                bottom: '-5px',
                left: '50%',
                transform: 'translateX(-50%)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '24px', fontWeight: 700 }}>803</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Feed */}
      <div className="card" style={{ marginTop: '20px' }}>
        <h3 style={{ marginBottom: '15px', fontSize: '18px' }}>Recent Transactions</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px' }}>
          {transactions.map((txn, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.02)',
              padding: '12px 16px',
              borderRadius: '14px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              border: '1px solid var(--border)'
            }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '14px' }}>{txn.merchant}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>{txn.category}</div>
              </div>
              <div style={{ fontWeight: 700, fontSize: '14px', color: txn.amount > 1000 ? '#f43f5e' : '#10b981' }}>
                ₹{txn.amount.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
