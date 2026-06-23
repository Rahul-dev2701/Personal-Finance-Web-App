import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

function BarGraph({weeklyData}){
    return(
    <ResponsiveContainer width="100%" height={280}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" stroke="#8b92a0" fontSize={12} />
              <YAxis stroke="#8b92a0" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1f28',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '8px',
                  color: '#e8ecf0',
                }}
              />
              <Bar dataKey="income" fill="#00d4aa" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
    );
}

export default BarGraph;