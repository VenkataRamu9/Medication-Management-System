
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MedicationCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 5, 20)); // June 2025
  
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const days = [];
  
  // Previous month days
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const prevMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), -i);
    days.push({
      date: prevMonthDate.getDate(),
      isCurrentMonth: false,
      status: null
    });
  }
  
  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    let status = null;
    if (day <= 19 && day !== 8) {
      status = day === 20 ? 'today' : 'taken';
    } else if (day === 8) {
      status = 'missed';
    }
    
    days.push({
      date: day,
      isCurrentMonth: true,
      status: status
    });
  }
  
  // Next month days to fill the grid
  const remainingDays = 42 - days.length;
  for (let day = 1; day <= remainingDays; day++) {
    days.push({
      date: day,
      isCurrentMonth: false,
      status: null
    });
  }

  const navigateMonth = (direction) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  const getDayClass = (day) => {
    if (!day.isCurrentMonth) return 'text-gray-300';
    
    let baseClass = 'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ';
    
    switch (day.status) {
      case 'taken':
        return baseClass + 'bg-green-500 text-white';
      case 'missed':
        return baseClass + 'bg-red-500 text-white';
      case 'today':
        return baseClass + 'bg-blue-600 text-white';
      default:
        return baseClass + 'hover:bg-gray-100';
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigateMonth(-1)}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <h3 className="text-lg font-semibold">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigateMonth(1)}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 p-2">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-4">
        {days.map((day, index) => (
          <div key={index} className="flex justify-center">
            <div className={getDayClass(day)}>
              {day.date}
            </div>
          </div>
        ))}
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
          <span>Medication taken</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
          <span>Missed medication</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-600 rounded-full mr-3"></div>
          <span>Today</span>
        </div>
      </div>
    </div>
  );
};

export default MedicationCalendar;
