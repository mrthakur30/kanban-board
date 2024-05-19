
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: string;
  title: string;
  labels: string[];
  date: string;
}

export interface Category {
  id: string;
  title: string;
  tasks: Task[];
}

export interface KanbanState {
  categories: Category[];
}

const initialState: KanbanState = {
  categories: [
    {
      id: '1',
      title: 'To Do',
      tasks: [
        {
          id: '1',
          title: 'Task 1',
          labels: ['Bug'],
          date: '2 Jan, 4:34 PM',
        },
        {
          id: '2',
          title: 'Task 2',
          labels: ['Feature'],
          date: '3 Jan, 10:20 AM',
        },
      ],
    },
    {
      id: '2',
      title: 'In Progress',
      tasks: [
        {
          id: '3',
          title: 'Task 3',
          labels: ['Improvement'],
          date: '4 Jan, 12:45 PM',
        },
      ],
    },
    {
      id: '3',
      title: 'Done',
      tasks: [
        {
          id: '4',
          title: 'Task 4',
          labels: ['Bug'],
          date: '5 Jan, 8:00 AM',
        },
      ],
    },
  ],
};

const kanbanSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories.push(action.payload);
    },
    deleteCategory: (state, action: PayloadAction<{ categoryId: string }>) => {
      state.categories = state.categories.filter((category) => category.id !== action.payload.categoryId);
    },
    addTask: (state, action: PayloadAction<{ categoryId: string; task: Task }>) => {
      const category = state.categories.find((cat) => cat.id === action.payload.categoryId);
      if (category) {
        category.tasks.push(action.payload.task);
      }
    },
    deleteTask: (state, action: PayloadAction<{ categoryId: string; taskId: string }>) => {
      const category = state.categories.find((cat) => cat.id === action.payload.categoryId);
      if (category) {
        category.tasks = category.tasks.filter((task) => task.id !== action.payload.taskId);
      }
    },
    moveTask: (
      state,
      action: PayloadAction<{ sourceCategoryId: string; destinationCategoryId: string; taskId: string; destinationIndex: number }>
    ) => {
      const { sourceCategoryId, destinationCategoryId, taskId, destinationIndex } = action.payload;
      const sourceCategory = state.categories.find((category) => category.id === sourceCategoryId);
      const destinationCategory = state.categories.find((category) => category.id === destinationCategoryId);
      if (!sourceCategory || !destinationCategory) {
        return;
      }
      const task = sourceCategory.tasks.find((task) => task.id === taskId);
      if (!task) {
        return;
      }
      sourceCategory.tasks = sourceCategory.tasks.filter((task) => task.id !== taskId);
      destinationCategory.tasks.splice(destinationIndex, 0, task);
    },
    editCategoryTitle: (state, action: PayloadAction<{ categoryId: string; newTitle: string }>) => {
      const category = state.categories.find((cat) => cat.id === action.payload.categoryId);
      if (category) {
        category.title = action.payload.newTitle;
      }
    },
    editTaskTitle: (state, action: PayloadAction<{ categoryId: string; taskId: string; newTitle: string }>) => {
      const category = state.categories.find((cat) => cat.id === action.payload.categoryId);
      if (category) {
        const task = category.tasks.find((task) => task.id === action.payload.taskId);
        if (task) {
          task.title = action.payload.newTitle;
        }
      }
    },
  },
});

export const { addCategory, deleteCategory, addTask, deleteTask, moveTask, editCategoryTitle, editTaskTitle } = kanbanSlice.actions;
export default kanbanSlice.reducer;
