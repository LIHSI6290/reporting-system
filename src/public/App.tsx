import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { IssueForm } from './components/IssueForm';
import { IssueList } from './components/IssueList';
import { IssueDetail } from './components/IssueDetail';
import { useIssueStore } from './store/issueStore';

export default function App() {
  const { issues, fetchIssues } = useIssueStore();

  React.useEffect(() => {
    fetchIssues();
  }, [fetchIssues]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <div className="py-10">
          <header>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold leading-tight text-gray-900">
                公司內部異常回報系統
              </h1>
            </div>
          </header>
          <main>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="px-4 py-8 sm:px-0">
                <Routes>
                  <Route path="/" element={<IssueList issues={issues} />} />
                  <Route path="/new" element={<IssueForm />} />
                  <Route path="/issues/:id" element={<IssueDetail />} />
                </Routes>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}