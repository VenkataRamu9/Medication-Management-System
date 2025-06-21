
# MediCare Companion - Medication Management System

## Project Overview

MediCare Companion is a comprehensive medication management application designed for both patients and caretakers. The app features role-based dashboards, medication tracking, calendar visualization, and notification systems to ensure medication adherence.

## Features

### For Patients:
- **Daily Medication Tracking**: Mark medications as taken with optional photo proof
- **Medication Calendar**: Visual calendar showing adherence history
- **Streak Tracking**: Monitor consecutive days of medication adherence
- **Large, Easy-to-Use Interface**: Senior-friendly design with clear buttons and text

### For Caretakers:
- **Comprehensive Dashboard**: Monitor patient's medication adherence
- **Recent Activity Tracking**: View detailed medication history
- **Notification Settings**: Configure email alerts and reminders
- **Adherence Reports**: Track overall medication compliance rates

### Core Functionality:
- **Role-Based Authentication**: Separate login for patients and caretakers
- **Real-Time Data**: Live updates of medication status
- **Photo Documentation**: Optional photo proof for medication taking
- **Progress Tracking**: Visual indicators of adherence rates and streaks

## Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **UI Components**: Shadcn/UI
- **State Management**: React Hooks, Local Storage
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Routing**: React Router DOM

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd medicare-companion
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080` to view the application

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Usage

### Getting Started
1. **Choose Your Role**: Select either "Patient" or "Caretaker" on the welcome screen
2. **Create Account**: Sign up with your email and password
3. **Access Dashboard**: Use the role-specific dashboard to manage medications

### Patient Features
- **Mark Medications**: Click "Mark as Taken" for daily medications
- **Add Photo Proof**: Optional photo documentation for each dose
- **View Calendar**: Check your medication history on the visual calendar
- **Track Progress**: Monitor your streak and adherence rates

### Caretaker Features
- **Monitor Patient**: View real-time medication status
- **Set Notifications**: Configure email alerts for missed medications
- **View Reports**: Access detailed adherence reports and activity logs
- **Switch Views**: Toggle between different dashboard tabs

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Shadcn UI components
│   ├── WelcomeScreen.tsx
│   ├── AuthForm.tsx
│   ├── PatientDashboard.tsx
│   ├── CaretakerDashboard.tsx
│   └── ...
├── hooks/              # Custom React hooks
│   └── useMedications.js
├── pages/              # Page components
│   ├──Index.tsx
│   └── NotFound.tsx
├── lib/                # Utility functions
│   └── utils.ts
└── index.css          # Global styles
```

## Data Management

Currently, the application uses **Local Storage** for data persistence. This means:
- Data is stored in the browser's local storage
- Data persists between sessions
- Each browser/device has its own data set
- For production use, consider implementing a backend database

## Future Enhancements

### Phase 2 Features:
- **Backend Integration**: SQLite/PostgreSQL database
- **Real-time Sync**: Multi-device synchronization
- **Push Notifications**: Mobile app notifications
- **Advanced Analytics**: Detailed medication insights

### Phase 3 Features:
- **File Upload**: Cloud storage for medication photos
- **Multi-patient Support**: Caretakers managing multiple patients
- **Integration**: Pharmacy and healthcare provider connections
- **Mobile App**: Native iOS/Android applications

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Testing

The application includes form validation, error handling, and loading states:

- **Form Validation**: Email format, password requirements, required fields
- **Error Handling**: User-friendly error messages for all interactions
- **Loading States**: Visual feedback during authentication and data operations
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Security Considerations

- **Input Sanitization**: All user inputs are validated
- **Authentication**: Basic email/password authentication
- **Data Storage**: Secure local storage implementation
- **Error Handling**: No sensitive information exposed in error messages

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

This project is developed as part of a technical assessment and is not intended for commercial use.

## Support

For technical support or questions about the application, please refer to the documentation or contact the development team.

---

**MediCare Companion** - Your trusted partner in medication management.
