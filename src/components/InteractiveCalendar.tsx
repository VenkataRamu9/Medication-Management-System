
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface CalendarDay {
  date: number;
  isCurrentMonth: boolean;
  status: 'taken' | 'missed' | 'today' | null;
  fullDate: Date;
}

interface InteractiveCalendarProps {
  onDateSelect?: (date: Date) => void;
  selectedDate?: Date;
}

const InteractiveCalendar = ({ onDateSelect, selectedDate }: InteractiveCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 5, 20)); // June 2025
  const { toast } = useToast();
  
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const days: CalendarDay[] = [];
  
  // Previous month days
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const prevMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), -i);
    days.push({
      date: prevMonthDate.getDate(),
      isCurrentMonth: false,
      status: null,
      fullDate: prevMonthDate
    });
  }
  
  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    let status: 'taken' | 'missed' | 'today' | null = null;
    const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    
    if (day <= 19 && day !== 8) {
      status = day === 20 ? 'today' : 'taken';
    } else if (day === 8) {
      status = 'missed';
    }
    
    days.push({
      date: day,
      isCurrentMonth: true,
      status: status,
      fullDate: dayDate
    });
  }
  
  // Next month days
  const remainingDays = 42 - days.length;
  for (let day = 1; day <= remainingDays; day++) {
    const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, day);
    days.push({
      date: day,
      isCurrentMonth: false,
      status: null,
      fullDate: nextMonthDate
    });
  }

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  const handleDateClick = (day: CalendarDay) => {
    if (!day.isCurrentMonth) return;
    
    onDateSelect?.(day.fullDate);
    
    const dateStr = day.fullDate.toLocaleDateString();
    if (day.status === 'taken') {
      toast({
        title: "Medication Taken",
        description: `Medication was successfully taken on ${dateStr}`,
      });
    } else if (day.status === 'missed') {
      toast({
        title: "Medication Missed",
        description: `Medication was missed on ${dateStr}`,
        variant: "destructive",
      });
    } else if (day.status === 'today') {
      toast({
        title: "Today's Medication",
        description: "Don't forget to take your medication today!",
      });
    }
  };

  const getDayClass = (day: CalendarDay) => {
    if (!day.isCurrentMonth) return 'text-gray-300 cursor-default';
    
    let baseClass = 'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium cursor-pointer transition-colors ';
    
    const isSelected = selectedDate && 
      day.fullDate.toDateString() === selectedDate.toDateString();
    
    if (isSelected) {
      baseClass += 'ring-2 ring-blue-500 ring-offset-2 ';
    }
    
    switch (day.status) {
      case 'taken':
        return baseClass + 'bg-green-500 text-white hover:bg-green-600';
      case 'missed':
        return baseClass + 'bg-red-500 text-white hover:bg-red-600';
      case 'today':
        return baseClass + 'bg-blue-600 text-white hover:bg-blue-700';
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
            <div 
              className={getDayClass(day)}
              onClick={() => handleDateClick(day)}
            >
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

export default InteractiveCalendar;
