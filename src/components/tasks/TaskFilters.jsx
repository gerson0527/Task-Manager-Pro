// src/components/tasks/TaskFilters.jsx
import React from 'react';
import { Filter, Search, Calendar, SortAsc } from 'lucide-react';

const TaskFilters = ({ onFilterChange, currentFilter }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({
      ...currentFilter,
      [name]: value
    });
  };

  const {
    search = '',
    status = 'all',
    priority = 'all',
    category = 'all',
    dateFilter = 'all',
    sortBy = 'dueDate',
    sortOrder = 'asc'
  } = currentFilter || {};

  return (
    <div className="bg-white rounded-lg shadow-task p-4 mb-6">
      <div className="flex items-center mb-4">
        <Filter className="w-5 h-5 text-gray-500 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900">Filtros</h2>
      </div>

      {/* Búsqueda */}
      <div className="mb-4">
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            name="search"
            placeholder="Buscar tareas..."
            value={currentFilter?.search || ''}
            onChange={handleFilterChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Filtro de Estado */}
        <select
          name="status"
          value={currentFilter?.status || 'all'}
          onChange={handleFilterChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="all">Todos los estados</option>
          <option value="pending">Pendiente</option>
          <option value="in-progress">En progreso</option>
          <option value="completed">Completada</option>
          <option value="overdue">Vencida</option>
        </select>

        {/* Filtro de Prioridad */}
        <select
          name="priority"
          value={currentFilter?.priority || 'all'}
          onChange={handleFilterChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="all">Todas las prioridades</option>
          <option value="high">Alta</option>
          <option value="medium">Media</option>
          <option value="low">Baja</option>
        </select>

        {/* Filtro de Categoría */}
        <select
          name="category"
          value={currentFilter?.category || 'all'}
          onChange={handleFilterChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="all">Todas las categorías</option>
          <option value="work">Trabajo</option>
          <option value="personal">Personal</option>
          <option value="shopping">Compras</option>
          <option value="health">Salud</option>
          <option value="others">Otros</option>
        </select>

        {/* Filtro de Fecha */}
        <select
          name="dateFilter"
          value={currentFilter?.dateFilter || 'all'}
          onChange={handleFilterChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="all">Todas las fechas</option>
          <option value="today">Hoy</option>
          <option value="week">Esta semana</option>
          <option value="month">Este mes</option>
          <option value="overdue">Vencidas</option>
        </select>
      </div>

      {/* Opciones de ordenamiento */}
      <div className="mt-4 flex items-center gap-4">
        <div className="flex items-center">
          <SortAsc className="w-5 h-5 text-gray-500 mr-2" />
          <select
            name="sortBy"
            value={currentFilter?.sortBy || 'dueDate'} 
            onChange={handleFilterChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="dueDate">Fecha de vencimiento</option>
            <option value="priority">Prioridad</option>
            <option value="title">Título</option>
            <option value="status">Estado</option>
            <option value="createdAt">Fecha de creación</option>
          </select>
        </div>

        <select
          name="sortOrder"
          value={currentFilter?.sortOrder || 'asc'}
          onChange={handleFilterChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>

        {/* Botón para limpiar filtros */}
        <button
          onClick={() => onFilterChange({
            status: 'all',
            priority: 'all',
            category: 'all',
            dateFilter: 'all',
            search: '',
            sortBy: 'dueDate',
            sortOrder: 'asc'
          })}
          className="ml-auto px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  );
};

export default TaskFilters;