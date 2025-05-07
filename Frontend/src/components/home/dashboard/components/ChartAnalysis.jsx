import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { Button } from '@/components/ui/button';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export function ChartAnalysis({ fieldName, data, type = 'categorical' }) {
 
  const [chartType, setChartType] = useState('bar'); // 'bar' or 'pie'
  if (!data || Object.keys(data).length === 0) return null;

  const processData = () => {
    console.log('Processing data:', { type, data });
    
    if (type === 'numeric') {
      // For numeric data, convert ranges to chart data
      return Object.entries(data)
        .map(([range, count]) => ({
          name: range,
          value: count,
          percentage: (count / Object.values(data).reduce((a, b) => a + b, 0)) * 100
        }))
        .sort((a, b) => {
          // Sort by range start number
          const [aStart] = a.name.split('-').map(Number);
          const [bStart] = b.name.split('-').map(Number);
          return aStart - bStart;
        });
    }

    // For categorical data
    const total = Object.values(data).reduce((a, b) => a + b, 0);
    const chartData = Object.entries(data).map(([name, count]) => ({
      name: String(name),
      value: count,
      percentage: (count / total) * 100
    }));

    // Sort by value in descending order
    return chartData.sort((a, b) => b.value - a.value);
  };

  // const chartData = [
  //   {
  //     name: "option2",
  //     value: 15,
  //     percentage: 88.24
  //   },
  //   {
  //     name: "option1",
  //     value: 2,
  //     percentage: 11.76
  //   }
  // ];
  const chartData = processData();
  console.log(chartData,'qqqqqqqqq')

  const renderChart = () => {
    console.log('Chart data:', chartData);
    if (!chartData || chartData.length === 0) return null;

    if (type === 'numeric') {
      // Histogram for numerical data
      return (
        <div className="bg-white p-4 rounded-lg shadow h-64">
             <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 11, fill: '#6b7280' }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                    interval={0}
                  />
                  <YAxis 
                    tick={{ fontSize: 11, fill: '#6b7280' }}
                  />
                  <Tooltip 
                    cursor={{ fill: '#f3f4f6' }}
                    contentStyle={{ 
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.375rem',
                      padding: '8px 12px',
                      boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)'
                    }}
                    itemStyle={{ color: '#374151', fontSize: '12px' }}
                    labelStyle={{ color: '#374151', fontWeight: 500, marginBottom: '4px', fontSize: '12px' }}
                    formatter={(value, name) => [`${value} responses`, name]}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="#3b82f6" 
                    radius={[4, 4, 0, 0]}
                    maxBarSize={50}
                  />
                </BarChart>
                </ResponsiveContainer>
                </div>
      );
    }


    // For categorical data, show either pie or bar chart based on selection
    return (
      <div className="space-y-4">
        <div className="flex justify-end space-x-2">
          <Button
            variant={chartType === 'bar' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setChartType('bar')}
          >
            Bar Chart
          </Button>
          <Button
            variant={chartType === 'pie' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setChartType('pie')}
          >
            Pie Chart
          </Button>
        </div>
        <div className="bg-white p-4 rounded-lg shadow h-64">
             <ResponsiveContainer width="100%" height="100%">
              {chartType === 'bar' ? (
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 11, fill: '#6b7280' }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                    interval={0}
                  />
                  <YAxis 
                    tick={{ fontSize: 11, fill: '#6b7280' }}
                  />
                  <Tooltip 
                    cursor={{ fill: '#f3f4f6' }}
                    contentStyle={{ 
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.375rem',
                      padding: '8px 12px',
                      boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)'
                    }}
                    itemStyle={{ color: '#374151', fontSize: '12px' }}
                    labelStyle={{ color: '#374151', fontWeight: 500, marginBottom: '4px', fontSize: '12px' }}
                    formatter={(value, name) => [`${value} responses`, name]}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="#3b82f6" 
                    radius={[4, 4, 0, 0]}
                    maxBarSize={50}
                  />
                </BarChart>
              ) : (
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    innerRadius={35}
                    label={({ value, percent }) => (
                      <text
                        x={0}
                        y={0}
                        textAnchor="middle"
                        fill="#374151"
                        fontSize={11}
                        dy={5}
                      >
                        {`${(percent * 100).toFixed(0)}%`}
                      </text>
                    )}
                    labelLine={false}
                  >
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.375rem',
                      padding: '8px 12px',
                      boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)'
                    }}
                    itemStyle={{ color: '#374151', fontSize: '10px' }}
                    labelStyle={{ color: '#374151', fontWeight: 500, marginBottom: '4px', fontSize: '12px' }}
                    formatter={(value, name) => [
                      `${value} responses (${(value / Object.values(data).reduce((a, b) => a + b, 0) * 100).toFixed(0)}%)`,
                      name
                    ]}
                  />
                  <Legend 
                    wrapperStyle={{
                      fontSize: '11px',
                      color: '#6b7280'
                    }}
                  />
                </PieChart>
              )}
            </ResponsiveContainer>

        </div>
      </div>
    );
  };

  return (
    <div className="w-full mt-4">
      {renderChart()}
    </div>
  );
}
