
const CaretakerTabs = ({ activeTab, onTabChange }) => {
  const tabs = ['Overview', 'Recent Activity', 'Calendar View', 'Notifications'];

  return (
    <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm border">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`flex-1 py-3 px-4 text-sm font-medium rounded-md transition-colors ${
            activeTab === tab
              ? 'bg-gray-900 text-white'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default CaretakerTabs;
