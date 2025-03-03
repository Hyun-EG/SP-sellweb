'use client';

import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const AdminChart = () => {
  interface Temp {
    title: string;
    sellingCount: number;
  }

  const [temps, setTemps] = useState<Temp[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/get-temp');
        const data = await res.json();
        if (data.success) {
          setTemps(data.data);
        } else {
          console.error('데이터 불러오기 실패');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const ctx = document.getElementById(
      'templateSellingRate'
    ) as HTMLCanvasElement;
    let chartInstance: Chart | null = null;

    if (ctx && temps.length > 0) {
      const context = ctx.getContext('2d');
      if (context) {
        const labels = temps.map((temp) => temp.title);

        // DB에 데이터 어떻게 저장할건지 (템플릿 의뢰하기 누르면 카운트 올라가고, DB도 카운트)
        const data = temps.map((temp) => temp.sellingCount);

        chartInstance = new Chart(context, {
          type: 'doughnut',
          data: {
            labels,
            datasets: [
              {
                label: '판매량',
                data,
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
        });
      }
    }

    // 컴포넌트 언마운트 시 차트 캔버스 제거
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [temps]);

  return (
    <>
      <div className="max-w-[330px] sm:max-w-[330px] md:max-w-[700px]">
        <canvas id="templateSellingRate"></canvas>
      </div>
    </>
  );
};

export default AdminChart;
