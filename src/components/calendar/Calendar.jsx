import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Función para generar los días del mes
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Primer día del mes
    const firstDayOfMonth = new Date(year, month, 1);
    // Último día del mes
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    // Obtener el día de la semana del primer día (0 = Domingo, 6 = Sábado)
    const firstDayWeekday = firstDayOfMonth.getDay();
    
    const days = [];
    
    // Agregar días del mes anterior para completar la primera semana
    for (let i = firstDayWeekday - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({
        date: prevDate,
        isCurrentMonth: false,
        tasks: []
      });
    }
    
    // Agregar días del mes actual
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      const date = new Date(year, month, day);
      days.push({
        date,
        isCurrentMonth: true,
        tasks: tasks?.filter(task => {
          const taskDate = new Date(task.dueDate);
          return taskDate.getDate() === day &&
                 taskDate.getMonth() === month &&
                 taskDate.getFullYear() === year;
        }) || []
      });
    }
    
    // Agregar días del siguiente mes para completar la última semana
    const remainingDays = 42 - days.length; // 6 semanas x 7 días = 42
    for (let i = 1; i <= remainingDays; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({
        date: nextDate,
        isCurrentMonth: false,
        tasks: []
      });
    }
    
    setCalendarDays(days);
  };

  useEffect(() => {
    generateCalendarDays();
  }, [currentDate, tasks]);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Calendario</h1>
        <div className="flex items-center space-x-4">
          <button 
            onClick={prevMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-lg font-medium">
            {currentDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}
          </span>
          <button 
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        {/* Días de la semana */}
        <div className="grid grid-cols-7 gap-4 mb-4">
          {weekDays.map(day => (
            <div 
              key={day} 
              className="text-center font-semibold text-gray-600"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Grid del calendario */}
        <div className="grid grid-cols-7 gap-4">
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`min-h-24 p-2 border rounded-lg ${
                day.isCurrentMonth 
                  ? 'bg-white' 
                  : 'bg-gray-50'
              } ${
                day.date.toDateString() === new Date().toDateString()
                  ? 'ring-2 ring-blue-500'
                  : ''
              }`}
            >
              <div className="font-medium text-sm text-gray-900">
                {day.date.getDate()}
              </div>
              <div className="mt-1 space-y-1">
                {day.tasks.map((task, taskIndex) => (
                  <div
                    key={task.id || taskIndex}
                    className={`text-xs p-1 rounded truncate ${
                      task.priority === 'high' 
                        ? 'bg-red-100 text-red-800'
                        : task.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                    title={task.title}
                  >
                    {task.title}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;