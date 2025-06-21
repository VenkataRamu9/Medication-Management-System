
import { Mail, Bell, Clock, Save } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

const NotificationsTab = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    emailAddress: 'caretaker@example.com',
    missedMedAlerts: true,
    alertWindow: '2 hours',
    dailyReminderTime: '20:00'
  });

  const handleSave = () => {
    // Save notification settings
    console.log('Saving notification settings:', settings);
  };

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <div className="flex items-center mb-6">
          <Bell className="w-6 h-6 text-blue-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Notification Preferences</h2>
        </div>

        <div className="space-y-8">
          {/* Email Notifications */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Email Notifications</h3>
                <p className="text-gray-600">Receive medication alerts via email</p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => 
                  setSettings(prev => ({ ...prev, emailNotifications: checked }))
                }
              />
            </div>

            {settings.emailNotifications && (
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.emailAddress}
                  onChange={(e) => 
                    setSettings(prev => ({ ...prev, emailAddress: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
            )}
          </div>

          {/* Missed Medication Alerts */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Missed Medication Alerts</h3>
                <p className="text-gray-600">Get notified when medication is not taken on time</p>
              </div>
              <Switch
                checked={settings.missedMedAlerts}
                onCheckedChange={(checked) => 
                  setSettings(prev => ({ ...prev, missedMedAlerts: checked }))
                }
              />
            </div>

            {settings.missedMedAlerts && (
              <div className="space-y-4">
                <div>
                  <Label>Alert me if medication isn't taken within</Label>
                  <Select
                    value={settings.alertWindow}
                    onValueChange={(value) => 
                      setSettings(prev => ({ ...prev, alertWindow: value }))
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1 hour">1 hour</SelectItem>
                      <SelectItem value="2 hours">2 hours</SelectItem>
                      <SelectItem value="4 hours">4 hours</SelectItem>
                      <SelectItem value="6 hours">6 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="reminderTime">Daily reminder time</Label>
                  <div className="flex items-center mt-1">
                    <Input
                      id="reminderTime"
                      type="time"
                      value={settings.dailyReminderTime}
                      onChange={(e) => 
                        setSettings(prev => ({ ...prev, dailyReminderTime: e.target.value }))
                      }
                      className="mr-2"
                    />
                    <Clock className="w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Time to check if today's medication was taken
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Email Preview */}
      <Card className="p-6">
        <div className="flex items-center mb-6">
          <Mail className="w-6 h-6 text-green-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Email Preview</h2>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <div className="mb-4">
            <strong>Subject: Medication Alert - Eleanor Thompson</strong>
          </div>
          <div className="space-y-3 text-gray-700">
            <p>Hello,</p>
            <p>This is a reminder that Eleanor Thompson has not taken her medication today.</p>
            <p>Please check with her to ensure she takes her prescribed medication.</p>
            <p>Current adherence rate: 85% (5-day streak)</p>
          </div>
        </div>

        <Button
          onClick={handleSave}
          className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Notification Settings
        </Button>
      </Card>
    </div>
  );
};

export default NotificationsTab;
