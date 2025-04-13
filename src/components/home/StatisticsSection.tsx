'use client';

import { Card, CardBody } from '@heroui/react';
import { useStats } from '@/hooks/useStats';

export const StatisticsSection = () => {
  const { stats, isLoading, error } = useStats();

  if (error) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
            <div className="h-8 bg-gray-200 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12">
      <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
        <CardBody className="text-center p-6">
          <div>
            <div className="text-4xl font-bold text-primary-600 mb-2">
              {stats.sheltersCount}
            </div>
            <div className="text-gray-800 font-medium">Schronisk</div>
          </div>
        </CardBody>
      </Card>
      <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
        <CardBody className="text-center p-6">
          <div>
            <div className="text-4xl font-bold text-primary-600 mb-2">
              {stats.availableDogsCount}
            </div>
            <div className="text-gray-800 font-medium">Psów do adopcji</div>
          </div>
        </CardBody>
      </Card>
      <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
        <CardBody className="text-center p-6">
          <div>
            <div className="text-4xl font-bold text-primary-600 mb-2">
              {stats.adoptedDogsCount}
            </div>
            <div className="text-gray-800 font-medium">
              Szczęśliwych adopcji
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
