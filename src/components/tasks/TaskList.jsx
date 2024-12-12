import { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TaskItem from './TaskItem';
import TaskFilters from './TaskFilters';

const TaskList = ({ tasks, onTaskUpdate, onTaskDelete, visible }) => {
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [currentFilter, setCurrentFilter] = useState({
    status: 'all',
    priority: 'all',
    category: 'all'
  });

  useEffect(() => {
    let filtered = tasks;

    if (currentFilter.status !== 'all') {
      filtered = filtered.filter(task => task.status === currentFilter.status);
    }
    if (currentFilter.priority !== 'all') {
      filtered = filtered.filter(task => task.priority === currentFilter.priority);
    }
    if (currentFilter.category !== 'all') {
      filtered = filtered.filter(task => task.category === currentFilter.category);
    }

    setFilteredTasks(filtered);
  }, [tasks, currentFilter]);

  return (
    <div className="space-y-4">
      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <TaskFilters onFilterChange={setCurrentFilter} currentFilter={currentFilter} />
      </div>

      {/* Lista de tareas */}
      <DragDropContext onDragEnd={(result) => {}}>
        <Droppable droppableId="taskList">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {filteredTasks && filteredTasks.length > 0 ? (
                filteredTasks.map((task, index) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    index={index}
                    visible={visible}
                    onUpdate={onTaskUpdate}
                    onDelete={onTaskDelete}
                  />
                ))
              ) : (
                <div className="col-span-2 text-center py-8 bg-white rounded-lg shadow-sm">
                  <p className="text-gray-500">No hay tareas que coincidan con los filtros seleccionados</p>
                </div>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TaskList;