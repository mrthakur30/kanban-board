import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Task as TaskType, deleteTask, editTaskTitle } from '@/lib/slices/kanbanSlice';
import { Dot, Trash2 } from 'lucide-react';
import { Draggable } from '@hello-pangea/dnd';

interface TaskProps {
  task: TaskType;
  index: number;
  categoryId: string;
}

const Task: React.FC<TaskProps> = ({ task, index, categoryId }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleDelete = () => {
    dispatch(deleteTask({ categoryId, taskId: task.id }));
  };

  const handleEdit = () => {
    if (isEditing) {
      dispatch(editTaskTitle({ categoryId, taskId: task.id, newTitle }));
    }
    setIsEditing(!isEditing);
  };

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div
          className='border flex flex-col select-none w-96 gap-3 border-gray-300 rounded-md shadow-sm p-2'
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className='flex text-gray-500 gap-1.5 justify-between items-center'>
            <div className='flex items-center gap-1.5'>
              <p className='font-semibold'>{task.id}</p>
              <Dot color='#9CA38F' />
              <p>{task.date}</p>
            </div>
            <Trash2 className='cursor-pointer' onClick={handleDelete} />
          </div>
          <div className='flex items-center gap-2'>
            {isEditing ? (
              <input
                type='text'
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onBlur={handleEdit}
                className='border focus:outline-none border-gray-300 rounded p-1 w-full'
                autoFocus
              />
            ) : (
              <h1
                className='font-semibold cursor-pointer'
                onClick={() => setIsEditing(true)}
              >
                {task.title}
              </h1>
            )}
          </div>
          <div className='flex gap-1'>
            {task.labels.map((label, index) => (
              <span
                key={index}
                className='text-sm font-semibold text-center rounded-3xl py-1 px-3 text-white bg-orange-600'
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
