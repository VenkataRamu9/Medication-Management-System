
import { useState, useEffect } from 'react';
import { User, Calendar as CalendarIcon, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import PatientHeader from '@/components/PatientHeader';
import InteractiveCalendar from '@/components/InteractiveCalendar';
import PhotoCapture from '@/components/PhotoCapture';
import { useMedications } from '@/hooks/useMedications';
import { useToast } from '@/hooks/use-toast';

const PatientDashboard = ({ onRoleSwitch }) => {
  const { medications, markMedicationTaken, getTodaysMedications, getStreakData } = useMedications();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const todaysMedications = getTodaysMedications();
  const streakData = getStreakData();
  const greeting = currentTime.getHours() < 12 ? 'Good Morning!' : 
                  currentTime.getHours() < 18 ? 'Good Afternoon!' : 'Good Evening!';

  const handleMarkAsTaken = (medicationId: number) => {
    markMedicationTaken(medicationId, selectedPhoto);
    setSelectedPhoto(null);
    
    toast({
      title: "Medication Taken!",
      description: selectedPhoto 
        ? "Your medication has been recorded with photo proof." 
        : "Your medication has been recorded.",
    });
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PatientHeader onRoleSwitch={onRoleSwitch} />
      
      <div className="max-w-7xl mx-auto p-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-500 to-teal-400 rounded-3xl p-8 text-white mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{greeting}</h1>
              <p className="text-blue-100 text-lg">Ready to stay on track with your medication?</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur">
              <div className="text-4xl font-bold mb-2">{streakData.dayStreak}</div>
              <div className="text-blue-100">Day Streak</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur">
              <div className="text-4xl font-bold mb-2">
                {todaysMedications.filter(med => med.taken).length > 0 ? '✓' : '○'}
              </div>
              <div className="text-blue-100">Today's Status</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur">
              <div className="text-4xl font-bold mb-2">{streakData.monthlyRate}%</div>
              <div className="text-blue-100">Monthly Rate</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Today's Medication */}
          <Card className="p-6">
            <div className="flex items-center mb-6">
              <CalendarIcon className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Today's Medication</h2>
            </div>

            {todaysMedications.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No medications scheduled for today</p>
              </div>
            ) : (
              <div className="space-y-4">
                {todaysMedications.map((medication) => (
                  <div key={medication.id} className="border rounded-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                          <span className="text-blue-600 font-bold">1</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{medication.name}</h3>
                          <p className="text-gray-600">{medication.dosage}</p>
                        </div>
                      </div>
                      <div className="text-gray-500 flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-1" />
                        {medication.time}
                      </div>
                    </div>

                    {!medication.taken && (
                      <>
                        <PhotoCapture 
                          onPhotoSelected={setSelectedPhoto}
                          selectedPhoto={selectedPhoto}
                        />

                        <Button
                          onClick={() => handleMarkAsTaken(medication.id)}
                          className="w-full bg-green-600 hover:bg-green-700 text-white mt-4"
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Mark as Taken
                        </Button>
                      </>
                    )}

                    {medication.taken && (
                      <div className="text-center py-4 bg-green-50 rounded-lg">
                        <Check className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <p className="text-green-700 font-semibold">Completed</p>
                        {medication.photoTaken && (
                          <p className="text-green-600 text-sm">Photo uploaded ✓</p>
                        )}
                        {medication.takenAt && (
                          <p className="text-gray-600 text-sm mt-1">
                            Taken at {new Date(medication.takenAt).toLocaleTimeString()}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Medication Calendar */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Medication Calendar</h2>
            <InteractiveCalendar 
              onDateSelect={handleDateSelect}
              selectedDate={selectedDate}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
