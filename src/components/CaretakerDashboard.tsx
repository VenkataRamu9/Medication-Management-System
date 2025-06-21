
import { useState } from 'react';
import { Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import CaretakerHeader from '@/components/CaretakerHeader';
import CaretakerTabs from '@/components/CaretakerTabs';
import OverviewTab from '@/components/OverviewTab';
import RecentActivityTab from '@/components/RecentActivityTab';
import CalendarViewTab from '@/components/CalendarViewTab';
import NotificationsTab from '@/components/NotificationsTab';
import { useMedications } from '@/hooks/useMedications';

const CaretakerDashboard = ({ onRoleSwitch }) => {
  const [activeTab, setActiveTab] = useState('Overview');
  const { getStreakData, getRecentActivity } = useMedications();
  
  const streakData = getStreakData();
  const recentActivity = getRecentActivity();

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <OverviewTab streakData={streakData} />;
      case 'Recent Activity':
        return <RecentActivityTab activities={recentActivity} />;
      case 'Calendar View':
        return <CalendarViewTab />;
      case 'Notifications':
        return <NotificationsTab />;
      default:
        return <OverviewTab streakData={streakData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CaretakerHeader onRoleSwitch={onRoleSwitch} />
      
      <div className="max-w-7xl mx-auto p-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl p-8 text-white mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Caretaker Dashboard</h1>
              <p className="text-green-100 text-lg">Monitoring Eleanor Thompson's medication adherence</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur">
              <div className="text-4xl font-bold mb-2">{streakData.adherenceRate}%</div>
              <div className="text-green-100">Adherence Rate</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur">
              <div className="text-4xl font-bold mb-2">{streakData.currentStreak}</div>
              <div className="text-green-100">Current Streak</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur">
              <div className="text-4xl font-bold mb-2">{streakData.missedThisMonth}</div>
              <div className="text-green-100">Missed This Month</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur">
              <div className="text-4xl font-bold mb-2">{streakData.takenThisWeek}</div>
              <div className="text-green-100">Taken This Week</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <CaretakerTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Tab Content */}
        <div className="mt-8">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default CaretakerDashboard;
