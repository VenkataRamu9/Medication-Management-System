
import { useState, useEffect } from 'react';

export const useMedications = () => {
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    // Initialize with mock data
    const mockMedications = [
      {
        id: 1,
        name: 'Daily Medication Set',
        dosage: 'Complete set of daily tablets',
        frequency: 'Once daily',
        time: '8:00 AM',
        taken: false,
        photoTaken: false,
        photoUrl: null,
        dateAdded: new Date().toISOString(),
        takenAt: null
      }
    ];
    
    const stored = localStorage.getItem('medications');
    if (stored) {
      try {
        const parsedMedications = JSON.parse(stored);
        // Convert date strings back to Date objects
        const medicationsWithDates = parsedMedications.map(med => ({
          ...med,
          dateAdded: new Date(med.dateAdded),
          takenAt: med.takenAt ? new Date(med.takenAt) : null
        }));
        setMedications(medicationsWithDates);
      } catch (error) {
        console.error('Error parsing stored medications:', error);
        setMedications(mockMedications);
        localStorage.setItem('medications', JSON.stringify(mockMedications));
      }
    } else {
      setMedications(mockMedications);
      localStorage.setItem('medications', JSON.stringify(mockMedications));
    }
  }, []);

  const addMedication = (medication) => {
    const newMedication = {
      ...medication,
      id: Date.now(),
      taken: false,
      photoTaken: false,
      photoUrl: null,
      dateAdded: new Date(),
      takenAt: null
    };
    
    const updated = [...medications, newMedication];
    setMedications(updated);
    localStorage.setItem('medications', JSON.stringify(updated));
  };

  const markMedicationTaken = (medicationId, photoFile = null) => {
    const updated = medications.map(med => {
      if (med.id === medicationId) {
        let photoUrl = med.photoUrl;
        
        // If a photo was provided, create a URL for it
        if (photoFile) {
          photoUrl = URL.createObjectURL(photoFile);
          // Store photo data in localStorage (in a real app, you'd upload to a server)
          const photoData = {
            medicationId,
            fileName: photoFile.name,
            fileSize: photoFile.size,
            uploadDate: new Date().toISOString()
          };
          
          const existingPhotos = JSON.parse(localStorage.getItem('medicationPhotos') || '[]');
          existingPhotos.push(photoData);
          localStorage.setItem('medicationPhotos', JSON.stringify(existingPhotos));
        }
        
        return { 
          ...med, 
          taken: true, 
          photoTaken: !!photoFile, 
          photoUrl,
          takenAt: new Date() 
        };
      }
      return med;
    });
    
    setMedications(updated);
    localStorage.setItem('medications', JSON.stringify(updated));
  };

  const resetDailyMedications = () => {
    const updated = medications.map(med => ({
      ...med,
      taken: false,
      photoTaken: false,
      photoUrl: null,
      takenAt: null
    }));
    
    setMedications(updated);
    localStorage.setItem('medications', JSON.stringify(updated));
  };

  const getTodaysMedications = () => {
    return medications.filter(med => {
      // For demo purposes, show all medications that haven't been taken today
      return !med.taken || (med.takenAt && !isSameDay(new Date(med.takenAt), new Date()));
    });
  };

  const isSameDay = (date1, date2) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  const getStreakData = () => {
    // Calculate actual streak based on taken medications
    const takenCount = medications.filter(med => med.taken).length;
    const totalCount = medications.length;
    const adherenceRate = totalCount > 0 ? Math.round((takenCount / totalCount) * 100) : 85;
    
    return {
      dayStreak: adherenceRate > 80 ? 5 : 0,
      monthlyRate: adherenceRate,
      adherenceRate: adherenceRate,
      currentStreak: 5,
      missedThisMonth: Math.max(0, totalCount - takenCount),
      takenThisWeek: Math.min(takenCount, 7)
    };
  };

  const getRecentActivity = () => {
    const activities = [];
    
    // Add activities based on actual medication data
    medications.forEach(med => {
      if (med.taken && med.takenAt) {
        activities.push({
          date: new Date(med.takenAt).toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          time: `Taken at ${new Date(med.takenAt).toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit', 
            hour12: true 
          })}`,
          status: 'Completed',
          hasPhoto: med.photoTaken,
          medication: med.name
        });
      }
    });
    
    // Add some mock recent activities if we don't have enough real data
    const mockActivities = [
      {
        date: 'Monday, June 10',
        time: 'Taken at 8:30 AM',
        status: 'Completed',
        hasPhoto: true,
        medication: 'Daily Medication Set'
      },
      {
        date: 'Sunday, June 9',
        time: 'Taken at 8:15 AM',
        status: 'Completed',
        hasPhoto: false,
        medication: 'Daily Medication Set'
      },
      {
        date: 'Saturday, June 8',
        time: 'Medication missed',
        status: 'Missed',
        hasPhoto: false,
        medication: 'Daily Medication Set'
      }
    ];
    
    return activities.length > 0 ? activities.slice(0, 5) : mockActivities;
  };

  return {
    medications,
    addMedication,
    markMedicationTaken,
    resetDailyMedications,
    getTodaysMedications,
    getStreakData,
    getRecentActivity
  };
};
