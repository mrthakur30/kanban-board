"use client";
import Board from '@/components/Board';
import CategoryModel from '@/components/CategoryModel';
import { logout } from '@/lib/slices/authSlice';
import { RootState } from '@/lib/store';
import { ArrowDownUp, CirclePlus, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {  useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Dashboard = () => {
  const router = useRouter();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const categories = useSelector((state: RootState) => state.kanban.categories);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const dispatch = useDispatch();
  
  const filteredCategories = useMemo(() => {
    let filtered = categories.map(category => ({ ...category, tasks: [...category.tasks] }));

    if (searchQuery) {
      filtered = filtered.map(category => ({
        ...category,
        tasks: category.tasks.filter(
          task =>
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.labels.some(label => label.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      }));
    }

    if (sortOrder) {
      filtered = filtered.map(category => ({
        ...category,
        tasks: category.tasks.sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        })
      }));
    }

    return filtered;
  }, [searchQuery, sortOrder, categories]);


  if (!isAuthenticated) {
    router.push('/signup');
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = () => {
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const logoutHandler = () => {
    dispatch(logout());
    router.push('/signup');
  }

  return (
    <main className='min-h-screen'>
      <div className='flex justify-between items-center px-6 py-2'>
        <h1 className='text-2xl font-semibold'>Dashboard</h1>
        <button 
        onClick={()=>logoutHandler()}
        className='text-red-500 rounded-md font-semibold border border-gray-200 px-2 py-1.5 shadow-sm'>
          Logout
        </button>
      </div>

      <div className='flex md:flex-row w-1/2 flex-col gap-3 px-6'>
        <span className='flex gap-2 px-2 py-1 items-center rounded-md border border-gray-200 shadow-sm'>
          <Search color='#9CA38F' size={22} />
          <input
            className='focus:outline-none'
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search tasks by name and label"
          />
        </span>

        <button
          className='flex items-center gap-2 rounded-md text-zinc-900 font-semibold border border-gray-200 px-2 py-1.5 shadow-sm'
          onClick={handleSortChange}
        >
          <ArrowDownUp size={20} />
          <span>Sort by Date</span>
        </button>

        <button
          className='flex items-center gap-2 rounded-md text-zinc-900 font-semibold border border-gray-200 px-2 py-1.5 shadow-sm'
          onClick={() => setIsCategoryOpen(true)}
        >
          <CirclePlus size={20} />
          <span>Add Category</span>
        </button>

      </div>

      <div>
        <Board categories={filteredCategories} />
      </div>
      <CategoryModel isOpen={isCategoryOpen} setIsOpen={setIsCategoryOpen} />
    </main>
  );
}

export default Dashboard;
