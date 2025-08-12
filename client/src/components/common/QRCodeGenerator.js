import React from 'react';
import QRCode from 'qrcode.react';

const QRCodeGenerator = ({ value, size = 128, role, playerName }) => {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-4">
        <QRCode 
          value={value} 
          size={size}
          level="M"
          includeMargin={true}
          className="border border-gray-200 rounded"
        />
      </div>
      
      {role && (
        <div className="text-center">
          <h3 className="font-bold text-lg text-gray-800 mb-1">
            {role}
          </h3>
          {playerName && (
            <p className="text-sm text-gray-600">
              {playerName}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-2">
            Scan QR code to view role description
          </p>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
