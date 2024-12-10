// src/components/tasks/TaskForm.jsx
import { useState,useEffect } from 'react';
import { Calendar, Flag, Tag } from 'lucide-react';

const TaskForm = ({ onSubmit, categories, initialTask = null }) => {
  const [task, setTask] = useState(initialTask || {
    title: '',
    description: '',
    startDate: '',
    dueDate: '',
    priority: 'medium',
    category: '',
    status: 'pending'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(task);
    if (!initialTask) {
      setTask({
        title: '',
        description: '',
        startDate: '',
        dueDate: '',
        priority: 'medium',
        category: '',
        status: 'pending'
      });
    }
  };

  useEffect(() => {
    if (initialTask) {
      setTask(initialTask);
    }
  }, [initialTask]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-task p-6 mb-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Título de la tarea
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            placeholder="Ingresa el título de la tarea"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
            placeholder="Ingresa la descripción de la tarea"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent h-24"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Fecha de inicio */}
          <div className="space-y-1">
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
              Fecha de inicio
            </label>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <input
                id="startDate"
                type="date"
                name="startDate"
                value={task.startDate}
                onChange={handleChange}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Fecha de fin */}
          <div className="space-y-1">
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
              Fecha de fin
            </label>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <input
                id="dueDate"
                type="date"
                name="dueDate"
                value={task.dueDate}
                onChange={handleChange}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Prioridad */}
          <div className="space-y-1">
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
              Prioridad
            </label>
            <div className="flex items-center space-x-2">
              <Flag className="w-5 h-5 text-gray-500" />
              <select
                id="priority"
                name="priority"
                value={task.priority}
                onChange={handleChange}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="low">Baja</option>
                <option value="medium">Media</option>
                <option value="high">Alta</option>
              </select>
            </div>
          </div>

          {/* Categoría */}
          <div className="space-y-1">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Categoría
            </label>
            <div className="flex items-center space-x-2">
              <Tag className="w-5 h-5 text-gray-500" />
              <select
                id="category"
                name="category"
                value={task.category}
                onChange={handleChange}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Seleccionar categoría</option>
                {categories  && categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            {initialTask ? 'Actualizar Tarea' : 'Crear Tarea'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default TaskForm;