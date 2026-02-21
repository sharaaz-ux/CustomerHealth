import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';

const CHURN_DISTRIBUTION = [
  { name: 'Retained', value: 73.5 },
  { name: 'Churned', value: 26.5 },
];

const MODEL_PERFORMANCE = [
  { name: 'LogReg', accuracy: 78, recall: 52, auc: 72 },
  { name: 'D-Tree', accuracy: 74, recall: 60, auc: 68 },
  { name: 'R-Forest', accuracy: 82, recall: 70, auc: 84 },
  { name: 'XGBoost', accuracy: 85, recall: 76, auc: 89 },
  { name: 'SVM', accuracy: 80, recall: 62, auc: 79 },
];

const FEATURE_IMPORTANCE = [
  { feature: 'Contract_Month-to-Month', importance: 0.45 },
  { feature: 'Tenure', importance: 0.25 },
  { feature: 'TotalCharges', importance: 0.15 },
  { feature: 'InternetService_Fiber', importance: 0.10 },
  { feature: 'PaymentMethod_E-Check', importance: 0.05 },
];

const COLORS = ['#10b981', '#f59e0b', '#334155', '#f97316', '#8b5cf6'];

export const VisualDashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-[2rem] border border-orange-100 shadow-sm">
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Customer Health Mix</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={CHURN_DISTRIBUTION}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={8}
                dataKey="value"
              >
                {CHURN_DISTRIBUTION.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[2rem] border border-orange-100 shadow-sm">
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Retention Tool Accuracy</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MODEL_PERFORMANCE}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} />
              <YAxis axisLine={false} tickLine={false} fontSize={12} />
              <Tooltip cursor={{fill: '#fff7ed'}} />
              <Legend />
              <Bar dataKey="accuracy" name="Overall Accuracy" fill="#f97316" radius={[6, 6, 0, 0]} />
              <Bar dataKey="recall" name="Catching Risk" fill="#334155" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[2rem] border border-orange-100 shadow-sm">
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">What Makes Customers Leave?</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={FEATURE_IMPORTANCE} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
              <XAxis type="number" hide />
              <YAxis dataKey="feature" type="category" width={150} fontSize={10} axisLine={false} tickLine={false} />
              <Tooltip cursor={{fill: '#fff7ed'}} />
              <Bar dataKey="importance" name="Impact Level" fill="#10b981" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[2rem] border border-orange-100 shadow-sm">
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Risk Detection Trend</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={[
              { x: 0, y: 0 }, { x: 0.1, y: 0.6 }, { x: 0.2, y: 0.8 }, 
              { x: 0.4, y: 0.88 }, { x: 0.7, y: 0.95 }, { x: 1, y: 1 }
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="x" hide />
              <YAxis hide />
              <Tooltip />
              <Line type="monotone" dataKey="y" stroke="#f97316" strokeWidth={4} dot={{ r: 6, fill: '#f97316', strokeWidth: 2, stroke: '#fff' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
