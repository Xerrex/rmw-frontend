import React from 'react';
import { MainLayout } from '../components/Layout';
import { CreateRideForm } from './create-ride/components/CreateRideForm';

export const CreateRidePage: React.FC = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="mb-2 text-4xl font-bold text-slate-900 dark:text-slate-100">
            Create a New Ride
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Share your commute and earn money by offering rides.
          </p>
        </div>

        <CreateRideForm />
      </div>
    </MainLayout>
  );
};
