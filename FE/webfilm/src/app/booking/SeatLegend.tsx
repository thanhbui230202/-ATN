import React from 'react';

export default function SeatLegend() {
  return (
    <div className="flex justify-center items-center space-x-4 mt-4">
      <div className="flex items-center">
        <div className="w-6 h-6 bg-white border border-gray-300 mr-2"></div>
        <span>Chưa đặt</span>
      </div>
      <div className="flex items-center">
        <div className="w-6 h-6 bg-blue-500 mr-2"></div>
        <span>Đang chọn</span>
      </div>
      <div className="flex items-center">
        <div className="w-6 h-6 bg-gray-500 mr-2"></div>
        <span>Đã đặt</span>
      </div>
    </div>
  );
}

