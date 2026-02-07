// BMI Categories and ranges
const BMI_CATEGORIES = [
  { max: 18.4, category: 'Underweight', class: 'underweight', note: 'Consider speaking with a healthcare provider about nutrition.' },
  { max: 24.9, category: 'Normal', class: 'normal', note: 'You have a healthy body weight for your height.' },
  { max: 29.9, category: 'Overweight', class: 'overweight', note: 'Consider healthier eating and regular physical activity.' },
  { max: Infinity, category: 'Obese', class: 'obese', note: 'Speak with a healthcare provider for guidance.' }
];

// DOM Elements
const form = document.getElementById('bmi-form');
const resultDiv = document.getElementById('result');
const bmiValueEl = document.getElementById('bmi-value');
const bmiCategoryEl = document.getElementById('bmi-category');
const resultNoteEl = document.getElementById('result-note');

const metricInputs = document.querySelectorAll('.metric-inputs');
const imperialInputs = document.querySelectorAll('.imperial-inputs');
const toggleBtns = document.querySelectorAll('.toggle-btn');

// Unit toggle
toggleBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    toggleBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const unit = btn.dataset.unit;
    if (unit === 'metric') {
      metricInputs.forEach(el => el.classList.remove('hidden'));
      imperialInputs.forEach(el => el.classList.add('hidden'));
    } else {
      metricInputs.forEach(el => el.classList.add('hidden'));
      imperialInputs.forEach(el => el.classList.remove('hidden'));
    }
    resultDiv.classList.add('hidden');
  });
});

// Calculate BMI
function calculateBMI() {
  const unit = document.querySelector('.toggle-btn.active').dataset.unit;
  let weight, height;

  if (unit === 'metric') {
    weight = parseFloat(document.getElementById('weight').value);
    height = parseFloat(document.getElementById('height-cm').value) / 100; // convert cm to m
  } else {
    weight = parseFloat(document.getElementById('weight-lbs').value);
    const feet = parseFloat(document.getElementById('height-ft').value);
    const inches = parseFloat(document.getElementById('height-in').value) || 0;
    height = (feet * 12 + inches) * 0.0254; // convert inches to meters
    weight = weight * 0.453592; // convert lbs to kg
  }

  if (!weight || !height || weight <= 0 || height <= 0) {
    alert('Please enter valid weight and height values.');
    return null;
  }

  const bmi = weight / (height * height);
  return bmi;
}

// Get category for BMI value
function getCategory(bmi) {
  return BMI_CATEGORIES.find(cat => bmi <= cat.max);
}

// Display result
function showResult(bmi) {
  const category = getCategory(bmi);
  
  bmiValueEl.textContent = bmi.toFixed(1);
  bmiCategoryEl.textContent = category.category;
  resultNoteEl.textContent = category.note;

  resultDiv.className = `result ${category.class}`;
  resultDiv.classList.remove('hidden');
}

// Form submit handler
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const bmi = calculateBMI();
  if (bmi !== null) {
    showResult(bmi);
  }
});
