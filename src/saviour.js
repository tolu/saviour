
class Saviour {
  constructor() {
    this.plans = [];
  }
  addPlan(plan){
    this.plans.push(plan);
  }
  getPlan(name){
    return this.plans.filter((p) => {
      return p.title.toLowerCase().indexOf(name.toLowerCase()) > -1;
    })[0];
  }
}

class Plan {
  constructor({title, description, goal, users}) {
    this.title = title;
    this.description = description;
    this.goal = goal;
    this.users = users;
    this.deposits = [];
  }
  deposit(transactions){
    if( !(transactions instanceof Array) ) {
      transactions = [transactions];
    }
    this.deposits.push(...transactions);
  }
  getSumSoFar(){
    return this.deposits.reduce((res, dep) => {
      return res + dep.amount;
    }, 0);
  }
  getDeposits(prop, list){
    return (list || this.deposits).map((dep) => {
      return dep[prop];
    });
  }
  getDepositsDistinct(prop){
    const distinct = [];
    this.deposits.forEach((dep) => {
      const hit = distinct.filter(byPropValue('note', dep.note))[0];
      if(hit){
        hit.amount += dep.amount;
      } else {
        distinct.push({
          amount: dep.amount,
          note: dep.note
        });
      }
    });
    return this.getDeposits(prop, distinct);
  }
}

class Deposit {
  constructor({amount, user, note, date}) {
    this.amount = amount;
    this.user = user;
    this.note = note;
    this.date = date;
  }
}


const instance = new Saviour();
const sparePlan = new Plan({
  title: 'Spareplan',
  description: 'Egenkapital till lägenhetsköp innan Q3 2017',
  goal: 750000,
  users: ['Tobias', 'Marte']
});
sparePlan.deposit([
  new Deposit({
    amount: 95000,
    user: 'Tobias',
    note: 'Sparkonto'
  }),
  new Deposit({
    amount: 38000,
    user: 'Marte',
    note: 'Sparkonto'
  }),
  new Deposit({
    amount: 27000,
    user: 'Tobias',
    note: 'Lgh Deposit'
  }),
  new Deposit({
    amount: 25000,
    user: 'Tobias',
    note: 'BSU-konto'
  }),
  new Deposit({
    amount: 25000,
    user: 'Marte',
    note: 'BSU-konto'
  }),
  new Deposit({
    amount: 150000,
    user: 'Tobias',
    note: 'Mor å Far'
  }),
  new Deposit({
    amount: 25000,
    user: 'Tobias',
    note: 'Spara September'
  }),
  new Deposit({
    amount: 8000,
    user: 'Marte',
    note: 'Spara September'
  }),
]);
instance.addPlan(sparePlan);

export default instance;

function asStringsByProperty(property){
  return function(a, b) {
    const nameA = a[property].toUpperCase(); // ignore upper and lowercase
    const nameB = b[property].toUpperCase(); // ignore upper and lowercase

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  };
}

function byPropValue(prop, value){
  return function(item){
    return item[prop] === value;
  };
}
