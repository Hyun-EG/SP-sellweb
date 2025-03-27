'use client';

import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const AdminChart = () => {
  interface Temp {
    title: string;
    sellingCount: number;
  }

  const [temps, setTemps] = useState<Temp[]>([]);
  const chartRef = useRef<Chart | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
    if (!canvasRef.current) {
      return;
    }

    const context = canvasRef.current.getContext('2d');
    if (!context) {
      return;
    }

    const labels = temps.map((temp) => temp.title);

    // DB에 데이터 어떻게 저장할건지 (템플릿 의뢰하기 누르면 카운트 올라가고, DB도 카운트)
    const data = temps.map((temp) => temp.sellingCount);

    if (chartRef.current) {
      chartRef.current.data.labels = labels;
      chartRef.current.data.datasets[0].data = data;
      chartRef.current.update();
    } else {
      chartRef.current = new Chart(context, {
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

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [temps]);

  return (
    <div className="max-w-[330px] sm:max-w-[330px] md:max-w-[700px]">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default AdminChart;
