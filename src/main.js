
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.calculate-form');
  const calculateInputs = form.querySelectorAll('.calculate-input, select');
  const submitBtn = form.querySelector('.calculate-button');


  const resultEl = document.createElement('div');
  resultEl.classList.add('calculate-result');
  resultEl.style.marginTop = '20px';
  form.parentElement.appendChild(resultEl);


  function validateForm() {
    let isValid = true;
    calculateInputs.forEach((input) => {
      if (
        input.type === 'number' &&
        (input.value.trim() === '' || isNaN(input.value) || Number(input.value) <= 0)
      ) {
        isValid = false;
      }
      if (input.tagName === 'SELECT' && !input.value) {
        isValid = false;
      }
    });

    submitBtn.disabled = !isValid;
  }


  calculateInputs.forEach((input) => {
    input.addEventListener('input', validateForm);
    input.addEventListener('change', validateForm);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const height = parseFloat(form.querySelector('#height').value);
    const weight = parseFloat(form.querySelector('#weight').value);
    const age = parseFloat(form.querySelector('#age').value);

    if (height > 140 && weight > 30 && age>14) {
      const heightInMeters = height / 100;
      const bmi = weight / (heightInMeters * heightInMeters);
      const bmiRounded = Math.round(bmi * 10) / 10;

      resultEl.textContent = `Your BMI is ${bmiRounded}`;
    } else {
      resultEl.textContent = 'Please enter valid height and weight.';
    }
  });


  validateForm();
});
