
import { useState } from 'react';
import { Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import InteractiveCalendar from '@/components/InteractiveCalendar';
import { useToast } from '@/hooks/use-toast';

const CalendarViewTab = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { toast } = useToast();

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    
    toast({
      title: "Date Selected",
      description: `Viewing details for ${date.toLocaleDateString()}`,
    });
  };

  const getDetailsForDate = (date: Date | null) => {
    if (!date) {
      return {
        title: "Today",
        description: "Monitor Eleanor Thompson's medication status for today.",
        dateStr: "June 20, 2025"
      };
    }
    
    const dateStr = date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    return {
      title: "Selected Date",
      description: `Medication details for ${dateStr}`,
      dateStr: date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    };
  };

  const details = getDetailsForDate(selectedDate);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Calendar */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Medication Calendar Overview</h2>
        <InteractiveCalendar 
          onDateSelect={handleDateSelect}
          selectedDate={selectedDate}
        />
      </Card>

      {/* Details */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Details for {details.dateStr}</h2>
        
        <div className="border rounded-xl p-4">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{details.title}</h3>
              <p className="text-blue-600">{details.description}</p>
            </div>
          </div>
          
          {selectedDate && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Additional Information:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Click on calendar dates to view specific day details</li>
                <li>• Green dates indicate medication was taken</li>
                <li>• Red dates indicate missed medications</li>
                <li>• Blue indicates today's date</li>
              </ul>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CalendarViewTab;
