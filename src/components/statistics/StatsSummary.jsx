// src/components/statistics/StatsSummary.jsx
import React from 'react';

const StatsSummary = ({ title, value, icon, color = 'blue' }) => {
  const getColorClasses = () => {
    const colors = {
      blue: 'bg-blue-50 text-blue-900',
      green: 'bg-green-50 text-green-900',
      yellow: 'bg-yellow-50 text-yellow-900',
      red: 'bg-red-50 text-red-900',
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className={`${getColorClasses()} rounded-lg p-4`}>
      <div className="flex items-center">
        <div className="flex-shrink-0">{icon}</div>
        <div className="ml-3">
          <h3 className="text-sm font-medium">{title}</h3>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsSummary;