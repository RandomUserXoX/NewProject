import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/navigation/navbar';
import { HomePage } from './pages/home';
import { StudyPage } from './pages/study';
import { GlobalTimer } from './components/study/GlobalTimer';
import { useEffect } from 'react';
import { useUploadStore } from './store/uploadStore';
import { usePrimeMapStore } from './store/primeMapStore';

export default function App() {
  const { clearActiveDocument } = useUploadStore();
  const { cleanup } = usePrimeMapStore();

  // Clear states on app mount
  useEffect(() => {
    clearActiveDocument();
    cleanup();
  }, [clearActiveDocument, cleanup]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <GlobalTimer />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/study" element={<StudyPage />} />
        </Routes>
      </div>
    </Router>
  );
}