
// Utility functions for exporting application data
export const exportMedicationData = () => {
  const medications = JSON.parse(localStorage.getItem('medications') || '[]');
  const userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
  
  const exportData = {
    medications,
    userData,
    exportDate: new Date().toISOString(),
    version: '1.0.0'
  };
  
  const dataStr = JSON.stringify(exportData, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `medicare-data-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const importMedicationData = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.medications) {
          localStorage.setItem('medications', JSON.stringify(data.medications));
        }
        if (data.userData) {
          localStorage.setItem('currentUser', JSON.stringify(data.userData));
        }
        resolve(data);
      } catch (error) {
        reject(error);
      }
    };
    reader.readAsText(file);
  });
};
