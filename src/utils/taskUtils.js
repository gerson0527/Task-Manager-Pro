// src/utils/taskUtils.js
export const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };
  
  export const getTaskStatus = (task) => {
    const now = new Date();
    const dueDate = new Date(task.dueDate);
  
    if (task.status === 'completed') {
      return 'completed';
    }
  
    if (dueDate < now && task.status !== 'completed') {
      return 'overdue';
    }
  
    if (task.status === 'in-progress') {
      return 'in-progress';
    }
  
    return 'pending';
  };
  
  export const getPriorityLevel = (priority) => {
    const levels = {
      low: 1,
      medium: 2,
      high: 3
    };
    return levels[priority] || 0;
  };
  
  export const sortTasks = (tasks, sortBy = 'dueDate', sortOrder = 'asc') => {
    return [...tasks].sort((a, b) => {
      switch (sortBy) {
        case 'dueDate':
          return sortOrder === 'asc'
            ? new Date(a.dueDate) - new Date(b.dueDate)
            : new Date(b.dueDate) - new Date(a.dueDate);
        
        case 'priority':
          return sortOrder === 'asc'
            ? getPriorityLevel(a.priority) - getPriorityLevel(b.priority)
            : getPriorityLevel(b.priority) - getPriorityLevel(a.priority);
        
        case 'title':
          return sortOrder === 'asc'
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
        
        default:
          return 0;
      }
    });
  };