// src/hooks/useStatistics.js
import { useMemo } from 'react';

export const useStatistics = (tasks) => {
  const stats = useMemo(() => {
    const now = new Date();
    const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    return {
      total: tasks.length,
      completed: tasks.filter(task => task.status === 'completed').length,
      pending: tasks.filter(task => task.status === 'pending').length,
      overdue: tasks.filter(task => 
        task.status !== 'completed' && new Date(task.dueDate) < now
      ).length,
      thisWeek: tasks.filter(task => 
        new Date(task.createdAt) > lastWeek
      ).length,
      completionRate: tasks.length > 0 
        ? Math.round((tasks.filter(task => task.status === 'completed').length / tasks.length) * 100)
        : 0,
      byPriority: {
        high: tasks.filter(task => task.priority === 'high').length,
        medium: tasks.filter(task => task.priority === 'medium').length,
        low: tasks.filter(task => task.priority === 'low').length,
      },
      byCategory: tasks.reduce((acc, task) => {
        acc[task.category] = (acc[task.category] || 0) + 1;
        return acc;
      }, {})
    };
  }, [tasks]);

  return stats;
};