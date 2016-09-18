
class Plan {
  constructor({title, description, goal, users, labels}) {
    this.title = title;
    this.description = description;
    this.goal = goal;
    this.users = users;
    this.labels = labels;
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
  getDepositsDistinct(prop, distinctBy = 'note'){
    const distinct = [];
    this.deposits.forEach((dep) => {
      const hit = distinct.filter(byPropValue(distinctBy, dep[distinctBy]))[0];
      if(hit){
        hit.amount += dep.amount;
      } else {
        distinct.push({
          amount: dep.amount,
          user: dep.user,
          note: dep.note
        });
      }
    });
    return this.getDeposits(prop, distinct);
  }
}

class Deposit {
  constructor({amount, user, note}) {
    this.amount = amount;
    this.user = user;
    this.note = note;
  }
}

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

export const planFromData = (data) => {

  const plan = new Plan({
    title: data.title,
    description: data.subtitle,
    goal: data.goal,
    users: data.people,
    labels: data.labels
  });

  plan.deposit(
    data.transactions.map((t) => {
      return new Deposit({
        amount: t.amount,
        user: data.people[t.user],
        note: data.labels[t.lable]
      });
    })
  );

  return plan;
}
