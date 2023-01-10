window.onload = getMortgageResults;
let mortgageResults;

async function getMortgageResults() {
    const request = await fetch("results/");
    const response = await request.json();
    console.log(response.data);
    mortgageResults = response.data;
    displayMortgageResults(mortgageResults);
}

function displayMortgageResults(mortgageResults) {
    const poundsFormat = new Intl.NumberFormat("en", {
        style: "currency",
        currency: "GBP",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    const percentageFormat = new Intl.NumberFormat("en", {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    mortgageResults.forEach((mortgage, i) => {
        const providerName = document.querySelector(`#row-${i}-provider-name`);
        const monthlyCost = document.querySelector(`#row-${i}-monthly-cost`);
        const initialRate = document.querySelector(`#row-${i}-initial-rate`);
        const totalApplicationFees = document.querySelector(`#row-${i}-total-application-fees`);
        const customerLTV = document.querySelector(`#row-${i}-customer-LTV`);
        const aprcRate = document.querySelector(`#row-${i}-APRC-rate`);

        providerName.innerHTML = mortgage.providerName;
        monthlyCost.innerHTML = poundsFormat.format(mortgage.monthlyCost);
        initialRate.innerHTML = percentageFormat.format(mortgage.initialRate / 100);
        totalApplicationFees.innerHTML = poundsFormat.format(mortgage.totalApplicationFeesPounds);
        customerLTV.innerHTML = percentageFormat.format(mortgage.customerLTV / 100);
        aprcRate.innerHTML = percentageFormat.format(mortgage.aprc / 100);
    })
}

//to improve:
//- add pages selection
//- progress abr when loading data
// - fix flex boxes when changing the window size 