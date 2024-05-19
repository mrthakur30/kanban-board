import React, { useState } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import Task from './Task';
import { Category, deleteCategory, editCategoryTitle } from '@/lib/slices/kanbanSlice';
import { Dot, Ellipsis, Plus, Trash2 } from 'lucide-react';
import TaskModel from './TaskModel';
import { useDispatch } from 'react-redux';

interface ColumnProps {
  category: Category;
}

const Column: React.FC<ColumnProps> = ({ category }) => {
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(category.title);
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();

  const handleEditTitle = () => {
    setIsEditingTitle(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
    dispatch(editCategoryTitle({ categoryId: category.id, newTitle }));
  };

  const handleEllipsisHover = () => {
    setIsHovered(true);
  };

  const handleCategoryDelete = () => {
    dispatch(deleteCategory({ categoryId: category.id }));
  }

  const handleEllipsisLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className=''>
      <div className='flex mb-3 w-96 justify-between'>
        <div className='flex items-center gap-2'>
          {isEditingTitle ? (
            <input
              type="text"
              value={newTitle}
              onChange={handleTitleChange}
              onBlur={handleTitleBlur}
              className="border rounded px-2 py-1 focus:outline-none"
            />
          ) : (
            <span className='font-semibold flex text-lg' onClick={handleEditTitle}>
              <Dot color='#9CA38F' size={30} />
              {category.title}
            </span>
          )}
          <p className='text-gray-400'>{category.tasks.length}</p>
        </div>

        <div className='flex gap-2 items-center relative' onMouseEnter={handleEllipsisHover} onMouseLeave={handleEllipsisLeave}>
          <Ellipsis color='#9CA38F' />
          {isHovered && (
            <button onClick={()=> handleCategoryDelete()} className="absolute right-8 bg-white rounded-md top-0 mt-1">
              <Trash2 color="red"  size={25} />
            </button>
          )}
          <button onClick={()=>setIsTaskOpen(true)}>
            <Plus color='#9CA38F' />
          </button>
        </div>
      </div>

      <Droppable droppableId={category.id.toString()}>
        {(provided) => (
          <div
            className='flex  flex-col min-h-36 gap-2'
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {category.tasks.map((task, index) => (
              <Task categoryId={category.id} task={task} key={task.id} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <TaskModel isOpen={isTaskOpen} setIsOpen={setIsTaskOpen} categoryId={category.id}/>
    </div>
  );
};

export default Column;
