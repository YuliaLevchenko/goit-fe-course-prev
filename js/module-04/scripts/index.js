'use strict';

// товары (цена за единицу)

const products = {
  bread: 10,
  milk: 15,
  apples: 20,
  chicken: 50,
  cheese: 40,
};

// заказ товаров (количество)
const order = {
  bread: 2,
  milk: 2,
  apples: 1,
  cheese: 1,
};

// cashier
const cashier = {
  name: 'Mango',
  customerMoney: 0,
  totalPrice: 0,
  change: 0,
  error: null,
  greet(name) {
    return console.log(`Добрый день, вас обслуживает ${this.name}`);
  },

  getCustomerMoney(value) {
    return (this.customerMoney = value);
  },

  countTotalPrice(products, order) {
    const allProducts = Object.keys(order);
    let totalPrice = 0;
    for (const key of allProducts) {
      totalPrice += order[key] * products[key];
    }
    return (this.totalPrice = totalPrice);
  },

  countChange() {
    if (this.customerMoney >= this.totalPrice) {
      this.change = this.customerMoney - this.totalPrice;
    } else {
      this.error = 'Вам не хватает денег на покупки';
    }
  },

  onSuccess() {
    return console.log(`Спасибо за покупку, ваша сдача ${this.change}!`);
  },

  onError() {
    return console.log(this.error);
  },

  reset() {
    this.customerMoney = customerMoney;
    this.totalPrice = totalPrice;
    this.change = change;
    this.error = error;
  },
};

const { customerMoney = 0, totalPrice = 0, change = 0, error = null } = cashier;

// Проверяем исходные значения полей
console.log(cashier.name); // Mango
console.log(cashier.customerMoney); // 0
console.log(cashier.totalPrice); // 0
console.log(cashier.change); // 0
console.log(cashier.error); // null

cashier.greet(); // Добрый день, вас обслуживает Mango

// Вызываем метод countTotalPrice для подсчета общей суммы
// передавая products - список всех продуктов и order - список покупок клиента
cashier.countTotalPrice(products, order);

// Проверям что посчитали
console.log(cashier.totalPrice); // 110

// Вызываем getCustomerMoney для запроса денег клиента
cashier.getCustomerMoney(300);

//проверка денег клиента
console.log(cashier.customerMoney); // 300

// Вызываем countChange для подсчета сдачи
cashier.countChange();

// Проверяем что нам вернул countChange
console.log(cashier.change); // 190

// Проверяем результат подсчета денег
if (cashier.error === null) {
  // При успешном обслуживании вызываем метод onSuccess
  cashier.onSuccess(); // Спасибо за покупку, ваша сдача 190
} else {
  // При неудачном обслуживании вызываем метод onError
  cashier.onError(); // Очень жаль, вам не хватает денег на покупки
}

// Вызываем reset при любом исходе обслуживания
cashier.reset();

// Проверяем значения после reset
console.log(cashier.customerMoney); // 0
console.log(cashier.totalPrice); // 0
console.log(cashier.change); // 0
console.log(cashier.error); // null
