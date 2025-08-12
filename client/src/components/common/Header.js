import React from 'react';

const Header = ({ user, onLogout }) => {
  return (
    <header className="bg-primary-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">
              Eco<span className="text-secondary-400">SCha</span>
            </h1>
            <span className="ml-2 text-sm opacity-75">Card Game</span>
          </div>
          
          {user && (
            <div className="flex items-center space-x-4">
              <span className="text-sm">Welcome, {user.name}</span>
              <button
                onClick={onLogout}
                className="text-sm bg-primary-700 hover:bg-primary-800 px-3 py-1 rounded-md transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
