import { Task, addTask } from '@/lib/slices/kanbanSlice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

interface TaskModelProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  categoryId: string;
}

const TaskModel: React.FC<TaskModelProps> = ({ isOpen, setIsOpen,categoryId }) => {
  const [title, setTitle] = useState('');
  const [labels, setLabels] = useState<string[]>([]);
  const dispatch = useDispatch();

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    return date.toLocaleString('en-US', options);
  };

  const handleCreate = () => {

    if (title.trim()) {
      const newTask: Task = {
        id: Date.now().toString().slice(-2),
        title,
        date: formatDate(new Date()), 
        labels,
      };

      dispatch(addTask({categoryId,task :newTask}));
      setTitle(''); 
      setLabels([]);
      setIsOpen(false); 
    }
  };

  const handleCancel = () => {
    setTitle(''); 
    setLabels([]);
    setIsOpen(false); 
  };

  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="p-6 bg-white rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Create New Task</h2>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Labels (comma separated)"
          value={labels.join(', ')}
          onChange={(e) => setLabels(e.target.value.split(',').map(label => label.trim()))}
          className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex justify-between">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModel;
