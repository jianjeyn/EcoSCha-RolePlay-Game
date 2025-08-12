import React, { useState, useEffect } from 'react';
import Button from '../common/Button';

const RoleCard = ({ role, onSelectRole, isSelected, disabled }) => {
  return (
    <div
      className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
        isSelected
          ? 'border-blue-500 bg-blue-50 shadow-lg'
          : disabled
          ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
      }`}
      onClick={() => !disabled && onSelectRole?.(role)}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">{role.name}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          role.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
          role.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {role.difficulty}
        </span>
      </div>
      
      <div className="mb-4">
        <div className="text-4xl mb-2">{role.icon}</div>
        <p className="text-gray-600 text-sm">{role.description}</p>
      </div>
      
      <div className="space-y-3">
        <div>
          <h4 className="font-semibold text-gray-700 mb-2">Objectives:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {role.objectives.slice(0, 2).map((objective, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-blue-500">•</span>
                <span>{objective}</span>
              </li>
            ))}
            {role.objectives.length > 2 && (
              <li className="text-gray-400 italic">
                +{role.objectives.length - 2} more objectives...
              </li>
            )}
          </ul>
        </div>
        
        {role.specialAbility && (
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Special Ability:</h4>
            <div className="text-sm text-gray-600">
              <p className="font-medium text-purple-600">{role.specialAbility.name}</p>
              <p className="text-xs">{role.specialAbility.description}</p>
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Starting Resources:</span>
          <span className="font-medium">{role.startingResources || 'Standard'}</span>
        </div>
      </div>
      
      {disabled && (
        <div className="mt-4 text-center text-sm text-red-600 font-medium">
          Already selected by another player
        </div>
      )}
    </div>
  );
};

const RoleSelection = ({ availableRoles, selectedRoles, onRoleSelect, currentUserId, timeRemaining }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [showDetails, setShowDetails] = useState(null);

  useEffect(() => {
    // Auto-select if user has already selected a role
    const userSelection = selectedRoles.find(selection => selection.userId === currentUserId);
    if (userSelection) {
      setSelectedRole(userSelection.role);
    }
  }, [selectedRoles, currentUserId]);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleConfirmSelection = () => {
    if (selectedRole) {
      onRoleSelect?.(selectedRole);
    }
  };

  const isRoleDisabled = (role) => {
    return selectedRoles.some(selection => 
      selection.role.id === role.id && selection.userId !== currentUserId
    );
  };

  const userHasSelected = selectedRoles.some(selection => selection.userId === currentUserId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Role</h1>
          <p className="text-xl text-gray-600 mb-6">
            Select a role that matches your playstyle and help save the environment!
          </p>
          
          {timeRemaining && (
            <div className="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg font-semibold">
              ⏰ Time remaining: {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
            </div>
          )}
        </div>

        {/* Selection Status */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Selection Progress ({selectedRoles.length}/{availableRoles.length} players ready)
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedRoles.map((selection, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl">{selection.role.icon}</div>
                <div>
                  <div className="font-medium text-gray-900">{selection.playerName}</div>
                  <div className="text-sm text-gray-600">{selection.role.name}</div>
                </div>
                {selection.userId === currentUserId && (
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">You</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Role Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {availableRoles.map((role) => (
            <RoleCard
              key={role.id}
              role={role}
              onSelectRole={handleRoleSelect}
              isSelected={selectedRole?.id === role.id}
              disabled={isRoleDisabled(role)}
            />
          ))}
        </div>

        {/* Detailed Role Information Modal */}
        {showDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-96 overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{showDetails.name}</h2>
                <button
                  onClick={() => setShowDetails(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Full Description:</h3>
                  <p className="text-gray-600">{showDetails.fullDescription || showDetails.description}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">All Objectives:</h3>
                  <ul className="text-gray-600 space-y-1">
                    {showDetails.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-blue-500">•</span>
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {showDetails.specialAbility && (
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Special Ability:</h3>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-medium text-purple-800">{showDetails.specialAbility.name}</h4>
                      <p className="text-purple-600 mt-1">{showDetails.specialAbility.description}</p>
                      {showDetails.specialAbility.cooldown && (
                        <p className="text-sm text-purple-500 mt-2">
                          Cooldown: {showDetails.specialAbility.cooldown} turns
                        </p>
                      )}
                    </div>
                  </div>
                )}
                
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Strategy Tips:</h3>
                  <ul className="text-gray-600 text-sm space-y-1">
                    {showDetails.tips?.map((tip, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-green-500">💡</span>
                        <span>{tip}</span>
                      </li>
                    )) || [
                      <li key="default" className="flex items-start space-x-2">
                        <span className="text-green-500">💡</span>
                        <span>Focus on your role's unique objectives to maximize your impact!</span>
                      </li>
                    ]}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          {selectedRole && (
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Selected Role</h3>
              <div className="flex items-center justify-center space-x-3 mb-4">
                <span className="text-3xl">{selectedRole.icon}</span>
                <div>
                  <div className="font-medium text-gray-900">{selectedRole.name}</div>
                  <div className="text-sm text-gray-600">{selectedRole.difficulty} difficulty</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Button
                  onClick={() => setShowDetails(selectedRole)}
                  variant="secondary"
                  size="sm"
                >
                  View Full Details
                </Button>
                
                {!userHasSelected && (
                  <Button
                    onClick={handleConfirmSelection}
                    variant="primary"
                    className="w-full"
                  >
                    Confirm Selection
                  </Button>
                )}
                
                {userHasSelected && (
                  <div className="text-green-600 font-medium">
                    ✅ Role confirmed! Waiting for other players...
                  </div>
                )}
              </div>
            </div>
          )}
          
          {!selectedRole && (
            <div className="text-gray-600">
              Select a role above to continue
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
