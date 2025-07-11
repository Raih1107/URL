import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// Custom label renderer for inside labels
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, device }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
    >
      {`${device}: ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function DeviceStats({ stats }) {
  const deviceCount = stats.reduce((acc, item) => {
    acc[item.device] = (acc[item.device] || 0) + 1;
    return acc;
  }, {});

  const result = Object.keys(deviceCount).map((device) => ({
    device,
    count: deviceCount[device],
  }));

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={result}
            dataKey="count"
            nameKey="device"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            labelLine={false}
            label={renderCustomLabel}
          >
            {result.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
