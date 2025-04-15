// 1.
// 1.1
var x = 1;
{
  var x = 2; // Ghi đè lên x ở ngoài block
  console.log("x ben trong block scope:", x); // 2
}
console.log("x ben ngoai block scope:", x); // 2

let y = 1;
{
  let y = 2;
  console.log("y trong block:", y); // 2
}
console.log("y ngoai block:", y); // 1

const z = 1;
{
  const z = 2;
  console.log("z trong block:", z); // 2
}
console.log("z ngoai block:", z); // 1

// 1.2
const person = {
  name: "Tuan",
  age: 21,
};

// Không thể gán lại object mới
try {
  person = { name: "Dep Trai", age: 22 }; // Sẽ gây ra TypeError
} catch (error) {
  console.log("Loi khi gan lai object:", error.message);
}

// Nhưng có thể thay đổi thuộc tính của object
person.name = "Dep Trai";
person.age = 22;
console.log("person sau khi thay doi:", person);

// 2
// 2.1
/*
function greet(name) {
  return 'Hello ' + name;
}

function square(n) {
  return n * n;
}
*/
const greet = (name) => "Hello " + name;
const square = (n) => n * n;

// 2.2
const numbers = [1, 2, 3, 4, 5];
const squaredNumbers = numbers.map((n) => n * n);
console.log(squaredNumbers); // [ 1, 4, 9, 16, 25 ]

// 3
// 3.1
const oldArray = [1, 2, 3];
const newArray = [...oldArray, 4];
console.log(newArray); // [ 1, 2, 3, 4 ]

// 3.2
const sumAll = (...numbers) => {
  let sum = 0;
  numbers.forEach((num) => (sum += num));
  console.log(sum);
};
sumAll(1, 2, 3, 4, 5); // 15

// 4
// 4.1
const user = { lastName: 'Tuan', age: 21, city: 'Lang Son' };
const { lastName, age, city } = user;
console.log(lastName); // Tuan
console.log(age); // 21
console.log(city); // Lang Son

// 4.2
const colors = ['red', 'green', 'blue'];
const [ firstColor, ...colorsRest ] = colors;
console.log(firstColor); // red 
console.log(colorsRest); // [ 'green', 'blue' ]

// 6
// 6.1
const arr = [1, 2, 3, 4];
const doubled = arr.map(num => num * 2);
console.log(doubled); // [ 2, 4, 6, 8 ]

// 6.2
const numbers2 = [1, 2, 3, 4, 5, 6];
const evenNumbers = numbers2.filter(num => num % 2 === 0);
console.log(evenNumbers); // [ 2, 4, 6 ]

// 6.3
const nums = [10, 20, 30];
const sum = nums.reduce((accumulator, current) => accumulator + current, 0);
console.log(sum); // 60

// 7
let a = 100;
let b = a; // gán giá trị của a cho b (sao chép)

b = 200; // thay đổi giá trị b

console.log(a); // 100 (KHÔNG bị ảnh hưởng)
console.log(b); // 200


let obj1 = { name: "Alice" };
let obj2 = obj1; // gán tham chiếu của obj1 cho obj2

obj2.name = "Bob"; // thay đổi thuộc tính qua obj2

console.log(obj1.name); // "Bob" (BỊ ảnh hưởng)
console.log(obj2.name); // "Bob"
