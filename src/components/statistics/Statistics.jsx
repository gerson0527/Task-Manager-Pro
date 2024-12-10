// src/components/statistics/Statistics.jsx
import React from 'react';
import { BarChart2, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

const Statistics = ({ tasks }) => {
  const stats = {
    total: tasks.length,
    completed: tasks.filter(task => task.status === 'completed').length,
    pending: tasks.filter(task => task.status === 'pending').length,
    overdue: tasks.filter(task => 
      task.status !== 'completed' && new Date(task.dueDate) < new Date()
    ).length
  };

  const completionRate = stats.total > 0 
    ? Math.round((stats.completed / stats.total) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Estadística</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Total de Tareas */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <BarChart2 className="w-5 h-5 text-blue-600" />
            <span className="text-2xl font-bold text-blue-600">{stats.total}</span>
          </div>
          <p className="mt-1 text-sm text-blue-600">Total de Tareas</p>
        </div>

        {/* Completadas */}
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-2xl font-bold text-green-600">{stats.completed}</span>
          </div>
          <p className="mt-1 text-sm text-green-600">Completadas</p>
        </div>

        {/* Pendientes */}
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <Clock className="w-5 h-5 text-yellow-600" />
            <span className="text-2xl font-bold text-yellow-600">{stats.pending}</span>
          </div>
          <p className="mt-1 text-sm text-yellow-600">Pendientes</p>
        </div>

        {/* Vencidas */}
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="text-2xl font-bold text-red-600">{stats.overdue}</span>
          </div>
          <p className="mt-1 text-sm text-red-600">Vencidas</p>
        </div>
      </div>

      {/* Tasa de FinalizaciÃ³n */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Tasa de Finalización</span>
          <span className="text-sm text-gray-500">{completionRate}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Statistics;