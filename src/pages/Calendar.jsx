// src/pages/Calendar.jsx
import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import CalendarComponent from '../components/calendar/Calendar'; // Asumiendo que guardaste el componente de calendario aquí

const Calendar = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <CalendarComponent tasks={tasks} />
      </div>
    </div>
  );
};

export default Calendar;