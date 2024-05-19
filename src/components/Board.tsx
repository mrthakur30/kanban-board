import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Column from './Column';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Category, moveTask } from '@/lib/slices/kanbanSlice';

interface BoardProps{
  categories: Category[];
}

const Board: React.FC<BoardProps> = ({categories}) => {
  const dispatch = useDispatch();
  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }
    
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    dispatch(
      moveTask({
        sourceCategoryId: source.droppableId,
        destinationCategoryId: destination.droppableId,
        taskId: draggableId,
        destinationIndex: destination.index,
      })
    );
  };


  return (
    <div className=' py-12  px-6 md:flex-row flex flex-col gap-8 overflow-x-scroll hide-scrollbar'  >
      <DragDropContext onDragEnd={onDragEnd} >
        {categories.map((category: Category, index: number) => (
          <Column category={category} key={index} />
        ))}
      </DragDropContext>
    </div>
  );
};

export default Board;
