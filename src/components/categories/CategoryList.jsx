import React from 'react';
import { Tag, Edit2, Trash2 } from 'lucide-react';

const CategoryList = ({ categories, onCategoryEdit, onCategoryDelete }) => {
  const getRandomColor = () => {
    const colors = [
      'bg-red-100 text-red-800',
      'bg-blue-100 text-blue-800',
      'bg-green-100 text-green-800',
      'bg-yellow-100 text-yellow-800',
      'bg-purple-100 text-purple-800',
      'bg-pink-100 text-pink-800',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="space-y-2">
      {categories.map((category) => (
        <div
          key={category.id}
          className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm"
        >
          <div className="flex items-center space-x-3">
            <Tag className={`w-5 h-5 ${category.color || getRandomColor()}`} />
            <span className="text-gray-700">{category.name}</span>
            {category.taskCount > 0 && (
              <span className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                {category.taskCount} tareas
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onCategoryEdit(category)}
              className="p-1 text-gray-400 hover:text-gray-500"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onCategoryDelete(category.id)}
              className="p-1 text-gray-400 hover:text-red-500"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
      
      {categories.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No hay categorías creadas todavía
        </div>
      )}
    </div>
  );
};

export default CategoryList;  