import Chart from 'chart.js';

export default (selector, plan, type) => {
  const ctx = document.querySelector(selector).getContext('2d');
  switch (type) {
    case 'bar':
      return barChart(ctx, plan);
    case 'donut':
      return donutChart(ctx, plan);
    case 'pie':
      return pieChart(ctx, plan);
    default:
      throw new Error('no such type...', type);
  }
};

function donutChart(ctx, plan){
  const left = plan.goal - plan.getSumSoFar();
  const data = [left, ...plan.getDepositsDistinct('amount')];
  const labels = ['Kvar', ...plan.getDepositsDistinct('note')];
  console.info(data, labels);
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
    }
  });
}

function pieChart(ctx, plan){
  const left = plan.goal - plan.getSumSoFar();
  const userData = [...plan.getDepositsDistinct('amount', 'user')];
  const total = userData.reduce((a,b)=>a+b, 0);
  const data = userData.map( d => Math.round(d/total*100) );
  const labels = ['Tobias', 'Marte'];
  console.info(data, labels);
  return new Chart(ctx, {
    type: 'pie',
    data: {
      labels,
      datasets: [{
        label: 'Fördelning',
        data,
        backgroundColor: bgColors(data.length, 0.5),
        hoverBackgroundColor: borderColors(data.length, 0.8)
      }]
    }
  });
}

function barChart(ctx, plan){
  const data = [plan.goal, plan.getSumSoFar()];

  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Mål', 'Idag'],
      datasets: [{
        label: 'Kvar till målet',
        data,
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
