
import { Check, AlertTriangle, Camera } from 'lucide-react';
import { Card } from '@/components/ui/card';

const RecentActivityTab = ({ activities }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return <Check className="w-5 h-5 text-green-600" />;
      case 'Missed':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default:
        return <Check className="w-5 h-5 text-green-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-50 border-green-200';
      case 'Missed':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-green-50 border-green-200';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700';
      case 'Missed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-green-100 text-green-700';
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Medication Activity</h2>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={index}
            className={`border rounded-xl p-4 ${getStatusColor(activity.status)}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-4">
                  {getStatusIcon(activity.status)}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{activity.date}</h3>
                  <p className="text-gray-600">{activity.time}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {activity.hasPhoto && (
                  <div className="flex items-center text-gray-600">
                    <Camera className="w-4 h-4 mr-1" />
                    <span className="text-sm">Photo</span>
                  </div>
                )}
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(activity.status)}`}>
                  {activity.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentActivityTab;
