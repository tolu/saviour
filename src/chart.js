import Chart from 'chart.js';
import saviour from './saviour';

const plan = saviour.getPlan('spareplan');

export default (selector) => {
  const ctx = document.querySelector(selector).getContext('2d');
  // return barChart(ctx, plan);
  return donutChart(ctx, plan);
};

function donutChart(ctx, plan){
  const left = plan.goal - plan.getSumSoFar();
  const data = [left, ...plan.getDepositsDistinct('amount')];
  const labels = ['Kvar', ...plan.getDepositsDistinct('note')];
  return new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{
        label: 'Kvar till målet',
        data,
        backgroundColor: bgColors(data.length, 0.5),
        hoverBackgroundColor: borderColors(data.length, 0.8)
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: { beginAtZero: true}
        }]
      }
    }
  });
}

function barChart(ctx){
  const total = plan.goal;
  const today = plan.getSumSoFar();

  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Mål', 'Idag'],
      datasets: [{
        label: 'Kvar till målet',
        data: [total, today],
        backgroundColor: bgColors(2),
        borderColor: borderColors(2),
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: { beginAtZero: true }
        }]
      }
    }
  });
}

function bgColors (max, opacity = 0.2){
  return [
    `rgba(255, 99, 132, ${opacity})`,
    `rgba(54, 162, 235, ${opacity})`,
    `rgba(255, 206, 86, ${opacity})`,
    `rgba(75, 192, 192, ${opacity})`,
    `rgba(153, 102, 255, ${opacity})`,
    `rgba(255, 159, 64, ${opacity})`
  ].slice(0, max);
}
function borderColors (max, opacity = 1){
  return [
    `rgba(255,99,132, ${opacity})`,
    `rgba(54, 162, 235, ${opacity})`,
    `rgba(255, 206, 86, ${opacity})`,
    `rgba(75, 192, 192, ${opacity})`,
    `rgba(153, 102, 255, ${opacity})`,
    `rgba(255, 159, 64, ${opacity})`
  ].slice(0, max);
}
