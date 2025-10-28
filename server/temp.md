🔴 Bad Code:

function sum() { return a+b }

⚠️ Problem:
- Implicitly relies on global variables a and b, which makes the function unpredictable and hard to test.
- It lacks input parameters, which severely limits its reusability and makes its behavior context-dependent.
- It doesn't handle the case where a or b might be undefined or not a number, leading to potential runtime errors.

🪲 Issues:
    a. The function depends on external variables, making it impure.
    b. No input validation leads to potential unexpected behavior.
    c. Missing error handling for non-numeric inputs.

✅ Recommended Fix:

function sum(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    return 'Invalid input: Both arguments must be numbers.';
  }
  return a + b;
}

💡 Why This Is Better:
    i. Explicitly accepts parameters, enhancing reusability and predictability.
    ii. Includes input validation to ensure correct usage and prevent errors.
    iii. Returns an error message for invalid inputs, providing useful feedback.
