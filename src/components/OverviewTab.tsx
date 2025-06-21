
import { Calendar, Mail, Bell, Eye } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

const OverviewTab = ({ streakData }) => {
  const { toast } = useToast();

  const todaysStatus = {
    medication: 'Daily Medication Set',
    time: '8:00 AM',
    status: 'Pending'
  };

  const handleSendReminder = () => {
    toast({
      title: "Reminder Sent",
      description: "Email reminder has been sent to Eleanor Thompson.",
    });
  };

  const handleConfigureNotifications = () => {
    toast({
      title: "Notifications",
      description: "Notification settings have been updated.",
    });
  };

  const handleViewCalendar = () => {
    toast({
      title: "Calendar View",
      description: "Switching to full calendar view...",
    });
  };

  const quickActions = [
    { icon: Mail, label: 'Send Reminder Email', action: handleSendReminder },
    { icon: Bell, label: 'Configure Notifications', action: handleConfigureNotifications },
    { icon: Eye, label: 'View Full Calendar', action: handleViewCalendar }
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Today's Status */}
      <Card className="p-6">
        <div className="flex items-center mb-6">
          <Calendar className="w-6 h-6 text-blue-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Today's Status</h2>
        </div>

        <div className="border rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">{todaysStatus.medication}</h3>
              <p className="text-gray-600">{todaysStatus.time}</p>
            </div>
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
              {todaysStatus.status}
            </span>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="space-y-4">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full justify-start h-auto p-4 hover:bg-gray-50 transition-colors"
              onClick={action.action}
            >
              <action.icon className="w-5 h-5 mr-3" />
              {action.label}
            </Button>
          ))}
        </div>
      </Card>

      {/* Monthly Adherence Progress */}
      <Card className="p-6 lg:col-span-2">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Monthly Adherence Progress</h2>
        
        <div className="mb-4 flex justify-between items-center">
          <span className="text-lg font-medium">Overall Progress</span>
          <span className="text-lg font-bold">{streakData.adherenceRate}%</span>
        </div>
        
        <Progress value={streakData.adherenceRate} className="mb-6 h-3" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600 mb-1">22 days</div>
            <div className="text-gray-600">Taken</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600 mb-1">3 days</div>
            <div className="text-gray-600">Missed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600 mb-1">5 days</div>
            <div className="text-gray-600">Remaining</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OverviewTab;
