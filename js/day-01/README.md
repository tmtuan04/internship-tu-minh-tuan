# Giải thích Day1 

## 1. let, const, var
**Bài 1.1**:  Viết 1 đoạn code minh hoạ sự khác biệt giữa var, let, const khi khai báo trong block scope.
1. Ví dụ với `var`: Phạm vi function scope (có thể được truy cập từ bên ngoài block và bị ghi đè như ví dụ bên dưới)
```
var x = 1; {
    var x = 2; // Ghi đè lên x ở ngoài block
    console.log("x ben trong block scope:", x); // 2
}
console.log("x ben ngoai block scope:", x); // 2
```
2. Ví dụ với `let`: Phạm vi block scope, độc lập với biến cùng tên bên ngoài, khác với `var`
```
let y = 1; {
    let y = 2;
    console.log("y trong block:", y); // 2
}
console.log("y ngoai block:", y); // 1
```
3. Ví dụ với `const`: Phạm vi block scope, tương tự như `let`
```
const z = 1; {
    const z = 2;
    console.log("z trong block:", z); // 2
}
console.log("z ngoai block:", z); // 1
```
**Bài 1.2**: Thử thay đổi giá trị của biến khai báo bằng const. Điều gì xảy ra?
>*`const` không cho phép gán lại giá trị, nhưng cho phép thay đổi nội dung của object/array*
```
const a = 5;
a = 10; // TypeError: Assignment to constant variable.

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
```

## 2. Arrow Function
**Bài 2.1**: Viết lại các hàm sau bằng arrow function:
```
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
```

**Bài 2.2**: Viết arrow function để nhận 1 mảng số, trả về mảng chứa bình phương của mỗi số.
```
const numbers = [1, 2, 3, 4, 5];
const squaredNumbers = numbers.map((n) => n * n);
console.log(squaredNumbers); // [ 1, 4, 9, 16, 25 ]
```

## 3. Spread & Rest
**Bài 3.1**: Dùng spread để copy mảng, thêm phần tử mới.
```
const oldArray = [1, 2, 3];
const newArray = [...oldArray]; // Copy array
console.log(newArray); // [ 1, 2, 3 ]
newArray.push(4);
console.log(newArray); // [ 1, 2, 3, 4 ]
```

**Bài 3.2**: Viết hàm sumAll(...numbers) dùng rest để tính tổng n số bất kỳ.
```
const sumAll = (...numbers) => {
  let sum = 0;
  numbers.forEach((num) => (sum += num));
  console.log(sum);
};
sumAll(1, 2, 3, 4, 5); // 15
```

## 4. Destructuring
**Bài 4.1**: Dùng destructuring để tách các phần tử từ object sau:
```
const user = { lastName: 'Tuan', age: 21, city: 'Lang Son' };
const { lastName, age, city } = user;
console.log(lastName); // Tuan
console.log(age); // 21
console.log(city); // Lang Son
```

**Bài 4.2**: Dùng destructuring để tách phần tử đầu và phần còn lại từ mảng
```
const colors = ['red', 'green', 'blue'];
const [ firstColor, ...colorsRest ] = colors;
console.log(firstColor); // red 
console.log(colorsRest); // [ 'green', 'blue' ]
```

## 5. Export / Import
**Bài 5.1**: Tạo file math.js export 2 hàm add(a, b) và multiply(a, b).

```
// math.js
export const add = (a, b) => a + b;
export const multiply = (a, b) => a * b;

// main.js
import { add } from './math.js';
import { multiply } from './math.js';

const a = 5;
const b = 10;
const sum = add(a, b);
console.log(sum); // 15
const product = multiply(a, b);
console.log(product); // 50
```

## 6. Array Functions (map, filter, reduce, ...)
**Bài 6.1**: Dùng map() để nhân đôi từng phần tử trong mảng [1, 2, 3, 4].
```
const arr = [1, 2, 3, 4];
const doubled = arr.map(num => num * 2);
console.log(doubled); // [ 2, 4, 6, 8 ]
```
**Bài 6.2**: Dùng filter() để lọc ra các số chẵn từ [1, 2, 3, 4, 5, 6].
```
const numbers2 = [1, 2, 3, 4, 5, 6];
const evenNumbers = numbers2.filter(num => num % 2 === 0);
console.log(evenNumbers); // [ 2, 4, 6 ]
```

**Bài 6.3**: Dùng reduce() để tính tổng các số trong mảng [10, 20, 30].
```
const nums = [10, 20, 30];
const sum = nums.reduce((accumulator, current) => accumulator + current, 0);
console.log(sum); // 60
```

## 7.Primitive vs Reference
**Bài 7.1**: Viết ví dụ để chứng minh number là kiểu primitive, còn object là kiểu tham chiếu.
```
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
```

## Quản lý danh sách sản phẩm

```
// productUtils.js: Chứa các hàm xử lý
// Thêm sản phẩm mới
export const addProduct = (products, product) => [...products, product];

// Xóa sản phẩm theo id
export const removeProductById = (products, id) =>
  products.filter(({ id: productId }) => productId !== id);

// Tính tổng giá
export const getTotalPrice = (products) =>
  products.reduce((total, { price }) => total + price, 0);

// Lấy danh sách tên sản phẩm
export const getProductNames = (products) => products.map(({ name }) => name);

// Tìm sản phẩm theo từ khóa trong tên
export const findProduct = (products, keyword) =>
  products.filter(({ name }) =>
    name.toLowerCase().includes(keyword.toLowerCase())
  );

// Lọc sản phẩm có giá cao hơn minPrice
export const getExpensiveProducts = (products, minPrice) =>
  products.filter(({ price }) => price > minPrice);
```

```
// main.js: Gọi và test các hàm
import {
    addProduct,
    removeProductById,
    getTotalPrice,
    getProductNames,
    findProduct,
    getExpensiveProducts
  } from './productUtils.js';
  
  let products = [
    { id: 1, name: 'iPhone', price: 1000 },
    { id: 2, name: 'iPad', price: 800 },
    { id: 3, name: 'Macbook', price: 2000 }
  ];
  
  // Thêm sản phẩm mới
  const newProduct = { id: 4, name: 'Apple Watch', price: 500 };
  products = addProduct(products, newProduct);
  console.log('After adding:', products);
  
  // Xóa sản phẩm theo id
  products = removeProductById(products, 2);
  console.log('After removing id = 2:', products);
  
  // Tổng giá sản phẩm
  console.log('Total price:', getTotalPrice(products));
  
  // Danh sách tên sản phẩm
  console.log('Product names:', getProductNames(products));
  
  // Tìm sản phẩm chứa từ 'mac'
  console.log('Find "mac":', findProduct(products, 'mac'));
  
  // Lọc sản phẩm có giá > 900
  console.log('Expensive products (>900):', getExpensiveProducts(products, 900));
```