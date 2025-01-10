document.addEventListener('DOMContentLoaded', () => {
    const billInput = document.getElementById('bill');
    const peopleInput = document.getElementById('people');
    const customTipInput = document.getElementById('custom-tip');
    const tipButtons = document.querySelectorAll('.tip-btn');
    const resetButton = document.getElementById('reset');
    const tipAmountElement = document.getElementById('tip-amount');
    const totalPerPersonElement = document.getElementById('total-per-person');

    let selectedTipPercentage = 0;

    // Update calculations whenever any input changes
    const updateCalculations = () => {
        const billAmount = parseFloat(billInput.value) || 0;
        const numberOfPeople = parseInt(peopleInput.value) || 1;
        const tipPercentage = selectedTipPercentage;

        const tipAmount = (billAmount * (tipPercentage / 100)) / numberOfPeople;
        const totalPerPerson = (billAmount / numberOfPeople) + tipAmount;

        tipAmountElement.textContent = `$${tipAmount.toFixed(2)}`;
        totalPerPersonElement.textContent = `$${totalPerPerson.toFixed(2)}`;
    };

    // Handle tip button clicks
    tipButtons.forEach(button => {
        button.addEventListener('click', () => {
            tipButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            selectedTipPercentage = parseFloat(button.dataset.tip);
            customTipInput.value = '';
            updateCalculations();
        });
    });

    // Handle custom tip input
    customTipInput.addEventListener('input', () => {
        tipButtons.forEach(btn => btn.classList.remove('active'));
        selectedTipPercentage = parseFloat(customTipInput.value) || 0;
        updateCalculations();
    });

    // Handle bill and people input
    billInput.addEventListener('input', updateCalculations);
    peopleInput.addEventListener('input', updateCalculations);

    // Handle reset button
    resetButton.addEventListener('click', () => {
        billInput.value = '';
        peopleInput.value = '1';
        customTipInput.value = '';
        selectedTipPercentage = 0;
        tipButtons.forEach(btn => btn.classList.remove('active'));
        updateCalculations();
    });

    // Initial calculation
    updateCalculations();
});
