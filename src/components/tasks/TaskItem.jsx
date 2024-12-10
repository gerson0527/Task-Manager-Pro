// src/components/tasks/TaskItem.jsx
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Calendar, Flag, Tag, CheckSquare, Edit2, Trash2 } from 'lucide-react';

const TaskItem = ({ task, index, onUpdate, onDelete ,visible }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all p-4 border border-gray-200"
        >
          {/* Cabecera con título y acciones */}
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-semibold text-lg text-gray-900">{task.title}</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => onUpdate({ ...task, status: task.status === 'completed' ? 'pending' : 'completed' })}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-green-500"
              >
                <CheckSquare className="w-4 h-4" />
              </button>
              {visible && (
                <button
                  onClick={() => onUpdate(task.id)}
                  className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-green-500"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => onDelete(task.id)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Descripción */}
          {task.description && (
            <p className="text-sm text-gray-600 mb-3">{task.description}</p>
          )}

          {/* Metadatos */}
          <div className="flex flex-wrap gap-3">
            {/* Fecha */}
            {task.dueDate && (
              <span className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}

            {/* Prioridad */}
            <span className={`flex items-center text-sm ${
              task.priority === 'high' ? 'text-red-500' :
              task.priority === 'medium' ? 'text-yellow-500' : 'text-green-500'
            }`}>
              <Flag className="w-4 h-4 mr-1" />
              {task.priority}
            </span>

            {/* Categoría */}
            {task.category && (
              <span className="flex items-center text-sm text-gray-500">
                <Tag className="w-4 h-4 mr-1" />
                {task.category}
              </span>
            )}

            {/* Estado */}
            <span className={`px-2 py-0.5 text-xs rounded-full ${
              task.status === 'completed' ? 'bg-green-100 text-green-800' :
              task.status === 'overdue' ? 'bg-red-100 text-red-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {task.status}
            </span>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskItem;