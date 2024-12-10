import { useState, useEffect } from 'react';
import TaskList from '../components/tasks/TaskList';
import TaskForm from '../components/tasks/TaskForm';
import { generateUniqueId } from '../utils/taskUtils';
import { useNotifications } from '../components/notifications/NotificationContext';

const Tasks = () => {
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

  // Estado para la tarea en edición
  const [editingTask, setEditingTask] = useState(null);

  // Cargar categorías del localStorage
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

  // Guardar tareas en localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Verificar tareas vencidas
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

  // Manejar actualización de tareas
  const handleTaskUpdate = (taskData) => {
    try {
      if (typeof taskData === 'string') {
        // Si es un ID, preparar para edición
        const taskToEdit = tasks.find(task => task.id === taskData);
        setEditingTask(taskToEdit);
      } else {
        // Actualizar tarea existente
        setTasks(currentTasks => 
          currentTasks.map(task => 
            task.id === taskData.id 
              ? { 
                  ...task, 
                  ...taskData, 
                  updatedAt: new Date().toISOString() 
                } 
              : task
          )
        );
        setEditingTask(null);
        showSuccess('Tarea actualizada exitosamente');
      }
    } catch (error) {
      showError('Error al actualizar la tarea');
      console.error('Error actualizando tarea:', error);
    }
  };

  // Crear nueva tarea
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

      // Actualizar contador de tareas en la categoría
      const updatedCategories = categories.map(cat => 
        cat.id === taskData.category 
          ? { ...cat, taskCount: (cat.taskCount || 0) + 1 }
          : cat
      );
      localStorage.setItem('task-manager-categories', JSON.stringify(updatedCategories));
      setCategories(updatedCategories);

      showSuccess('Tarea creada exitosamente');
    } catch (error) {
      showError('Error al crear la tarea');
      console.error('Error creando tarea:', error);
    }
  };

  // Manejar eliminación de tarea
  const handleDeleteTask = (taskId) => {
    try {
      const taskToDelete = tasks.find(task => task.id === taskId);
      
      setTasks(currentTasks => currentTasks.filter(task => task.id !== taskId));
      
      // Actualizar contador de tareas en la categoría
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
      console.error('Error eliminando tarea:', error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Todas las Tareas</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <TaskForm 
          onSubmit={editingTask ? handleTaskUpdate : handleCreateTask}
          categories={categories}
          initialTask={editingTask}
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <TaskList 
          visible={true}
          tasks={tasks}
          onTaskUpdate={handleTaskUpdate}
          onTaskDelete={handleDeleteTask}
        />
      </div>
    </div>
  );
};

export default Tasks;