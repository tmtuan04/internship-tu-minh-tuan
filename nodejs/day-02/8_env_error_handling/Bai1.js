// Bai1.js
function divide(a, b) {
  try {
    if (b === 0) {
      throw new Error("Khong the chia cho 0");
    }
    console.log(`Ket qua: ${a / b}`);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

divide(4, 2);
divide(5, 0);