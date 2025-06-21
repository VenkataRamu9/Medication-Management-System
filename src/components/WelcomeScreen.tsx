
import { User, Users, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const WelcomeScreen = ({ onRoleSelect }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to MediCare Companion</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your trusted partner in medication management. Choose your role to get started with personalized features.
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Patient Card */}
          <Card className="p-8 hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-blue-600 mb-4">I'm a Patient</h2>
              <p className="text-gray-600 mb-6">
                Track your medication schedule and maintain your health records
              </p>
              
              <div className="space-y-3 mb-8 text-left">
                <div className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Mark medications as taken
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Upload proof photos (optional)
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  View your medication calendar
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Large, easy-to-use interface
                </div>
              </div>

              <Button 
                onClick={() => onRoleSelect('patient')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
              >
                Continue as Patient
              </Button>
            </div>
          </Card>

          {/* Caretaker Card */}
          <Card className="p-8 hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-green-600 mb-4">I'm a Caretaker</h2>
              <p className="text-gray-600 mb-6">
                Monitor and support your loved one's medication adherence
              </p>
              
              <div className="space-y-3 mb-8 text-left">
                <div className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Monitor medication compliance
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Set up notification preferences
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  View detailed reports
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Receive email alerts
                </div>
              </div>

              <Button 
                onClick={() => onRoleSelect('caretaker')}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
              >
                Continue as Caretaker
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
