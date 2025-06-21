
import { Button } from '@/components/ui/button';
import { Heart, Users } from 'lucide-react';

const PatientHeader = ({ onRoleSwitch }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-blue-500 rounded-xl flex items-center justify-center mr-3">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">MediCare Companion</h1>
            <p className="text-sm text-gray-600">Patient View</p>
          </div>
        </div>

        <Button
          onClick={() => onRoleSwitch('caretaker')}
          variant="outline"
          className="flex items-center"
        >
          <Users className="w-4 h-4 mr-2" />
          Switch to Caretaker
        </Button>
      </div>
    </header>
  );
};

export default PatientHeader;
