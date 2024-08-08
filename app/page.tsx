'use client';

import DataPage from '@/components/DataPage';
import EntryPage from '@/components/EntryPage';
import { useState } from 'react';


const Home = () => {
  const [isComplete, setIsComplete] = useState(false);


  return (
    <div>
      {!isComplete ? <EntryPage setIsComplete={setIsComplete} /> : <DataPage />}
    </div>
  )
}

export default Home;
