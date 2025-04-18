'use client';

import { useStats } from '@/hooks/useStats';
import { Card, CardBody } from '@heroui/react';

export const StatisticsSection = () => {
  const { stats, isLoading, error } = useStats();

  if (error) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-4 bg-[#D1DBC8] rounded-lg w-1/4 mb-2" />
            <div className="h-8 bg-[#D1DBC8] rounded-lg w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
      <Card className="bg-white border border-[#D1DBC8] shadow-md hover:shadow-lg transition-all duration-300 rounded-3xl overflow-hidden">
        <CardBody className="text-center p-8">
          <div className="flex flex-col items-center justify-center">
            <div className="text-5xl font-bold text-[#4A6741] mb-3">
              {stats.sheltersCount}
            </div>
            <div className="text-[#2C4A27] font-medium text-lg">Schronisk</div>
          </div>
        </CardBody>
      </Card>

      <Card className="bg-white border border-[#D1DBC8] shadow-md hover:shadow-lg transition-all duration-300 rounded-3xl overflow-hidden">
        <CardBody className="text-center p-8">
          <div className="flex flex-col items-center justify-center">
            <div className="text-5xl font-bold text-[#4A6741] mb-3">
              {stats.availableDogsCount}
            </div>
            <div className="text-[#2C4A27] font-medium text-lg">
              Psów do adopcji
            </div>
          </div>
        </CardBody>
      </Card>

      <Card className="bg-white border border-[#D1DBC8] shadow-md hover:shadow-lg transition-all duration-300 rounded-3xl overflow-hidden">
        <CardBody className="text-center p-8">
          <div className="flex flex-col items-center justify-center">
            <div className="text-5xl font-bold text-[#4A6741] mb-3">
              {stats.adoptedDogsCount}
            </div>
            <div className="text-[#2C4A27] font-medium text-lg">
              Szczęśliwych adopcji
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
