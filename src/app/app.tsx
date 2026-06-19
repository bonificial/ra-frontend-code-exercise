import { AddEditPeoplePage } from '@/pages/add-edit-people';
import { PeoplePage } from '@/pages/people/page';
import { ToastProvider } from '@/components/Toast';
import { ReactElement } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

export const App = (): ReactElement => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <div className="min-h-screen bg-[var(--colors-bgBase)] font-[family-name:var(--font-primary)]">
          <Routes>
            <Route index element={<PeoplePage />} />
            <Route path="/people/new" element={<AddEditPeoplePage />} />
            <Route path="/people/edit/:id" element={<AddEditPeoplePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </ToastProvider>
    </BrowserRouter>
  );
};
