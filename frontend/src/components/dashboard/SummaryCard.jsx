import React from 'react';

const SummaryCard = ({ icon, text, number, color }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 flex items-center space-x-4">
      <div className={`text-4xl ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-lg font-semibold text-gray-700">{text}</p>
        <p className="text-2xl font-bold text-gray-900">{number}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
