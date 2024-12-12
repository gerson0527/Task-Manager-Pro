import { useState, useEffect } from 'react';
import TaskList from '../components/tasks/TaskList';
import TaskForm from '../components/tasks/TaskForm';
import Statistics from '../components/statistics/Statistics';
import { generateUniqueId } from '../utils/taskUtils';
import { useNotifications } from '../components/notifications/NotificationContext';

const Home = () => {
  const { showSuccess, showError } = useNotifications();
  
  // Estado para las tareas
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Estado para las categorías desde localStorage
  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem('task-manager-categories');
    return savedCategories ? JSON.parse(savedCategories) : [];
  });

  // Guardar en localStorage cuando las tareas cambien
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Efecto para actualizar las categorías cuando cambien en el localStorage
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'task-manager-categories') {
        const updatedCategories = e.newValue ? JSON.parse(e.newValue) : [];
        setCategories(updatedCategories);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Verificar el estado de las tareas periódicamente
  useEffect(() => {
    const checkOverdueTasks = () => {
      const now = new Date();
      now.setHours(0, 0, 0, 0);

      setTasks(currentTasks => 
        currentTasks.map(task => {
          if (!task.dueDate) return task;
          
          const dueDate = new Date(task.dueDate);
          dueDate.setHours(0, 0, 0, 0);

          if (task.status !== 'completed' && dueDate < now) {
            return { ...task, status: 'overdue' };
          }
          if (task.status === 'overdue' && dueDate >= now) {
            return { ...task, status: 'pending' };
          }
          return task;
        })
      );
    };

    checkOverdueTasks();
    const interval = setInterval(checkOverdueTasks, 3600000);
    return () => clearInterval(interval);
  }, []);

  const handleCreateTask = (taskData) => {
    try {
      const newTask = {
        ...taskData,
        id: generateUniqueId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'pending'
      };

      setTasks(currentTasks => [...currentTasks, newTask]);
      showSuccess('Tarea creada exitosamente');

      // Actualizar el contador de tareas en la categoría
      const updatedCategories = categories.map(cat => 
        cat.id === taskData.category 
          ? { ...cat, taskCount: (cat.taskCount || 0) + 1 }
          : cat
      );
      localStorage.setItem('task-manager-categories', JSON.stringify(updatedCategories));
      setCategories(updatedCategories);

    } catch (error) {
      showError('Error al crear la tarea');
    }
  };

  const handleDeleteTask = (taskId) => {
    try {
      const taskToDelete = tasks.find(task => task.id === taskId);
      setTasks(currentTasks => currentTasks.filter(task => task.id !== taskId));
      
      // Actualizar el contador de tareas en la categoría
      if (taskToDelete) {
        const updatedCategories = categories.map(cat => 
          cat.id === taskToDelete.category 
            ? { ...cat, taskCount: Math.max((cat.taskCount || 0) - 1, 0) }
            : cat
        );
        localStorage.setItem('task-manager-categories', JSON.stringify(updatedCategories));
        setCategories(updatedCategories);
      }

      showSuccess('Tarea eliminada exitosamente');
    } catch (error) {
      showError('Error al eliminar la tarea');
    }
  };

  const handleStatusChange = (taskId, newStatus) => {
    try {
      setTasks(currentTasks =>
        currentTasks.map(task =>
          task.id === taskId
            ? { 
                ...task, 
                status: newStatus,
                updatedAt: new Date().toISOString(),
                completedAt: newStatus === 'completed' ? new Date().toISOString() : null
              }
            : task
        )
      );
      showSuccess(`Tarea marcada como ${newStatus}`);
    } catch (error) {
      showError('Error al cambiar el estado de la tarea');
    }
  };
  const handleTaskUpdate = (taskId, updates) => {
    try {
      setTasks(currentTasks =>
        currentTasks.map(task =>
          task.id === taskId
            ? { 
                ...task, 
                ...updates,
                updatedAt: new Date().toISOString(),
                completedAt: updates.status === 'completed' ? new Date().toISOString() : null
              }
            : task
        )
      );
      showSuccess('Tarea actualizada exitosamente');
    } catch (error) {
      showError('Error al actualizar la tarea');
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTasks(items);
  };

  return (
    <div className="h-full p-6 space-y-3">
      {/* Sección superior */}
      <div className="grid grid-cols-12 gap-6">
        {/* Columna izquierda: Estadísticas y Categorías */}
        <div className="col-span-4 space-y-6">
          {/* Estadísticas */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <Statistics tasks={tasks} />
          </div>

          {/* Categorías */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Categorías</h2>
            <div className="space-y-2">
              {categories.map(category => (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${category.color.split(' ')[0]}`} />
                    <span>{category.name}</span>
                  </div>
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
                    {tasks.filter(task => task.category === category.id).length}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Columna derecha: Formulario */}
        <div className="col-span-8">
          <div className="bg-white rounded-lg shadow-sm">
            <TaskForm
              onSubmit={handleCreateTask}
              categories={categories}
            />
          </div>
        </div>
      </div>

      {/* Sección inferior: Lista de Tareas */}
      <div className="space-y-4 h-screen">
        <TaskList
          tasks={tasks}
          onTaskDelete={handleDeleteTask}
          onStatusChange={handleStatusChange}
          onDragEnd={handleDragEnd}
           onTaskUpdate={handleTaskUpdate}
        />
      </div>
    </div>
  );
};

export default Home;