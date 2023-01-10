const port = 8080;
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("src"));

const options = {
  method: 'GET',
  url: 'https://uk-mortgage-search.p.rapidapi.com/',
  params: {
    page: '1',
    paginationLimit: '10'
  },
  headers: {
    'X-RapidAPI-Key': 'f54abc4d2fmshd969db99c8e1435p12fcd9jsna9e84fd8eb83',
    'X-RapidAPI-Host': 'uk-mortgage-search.p.rapidapi.com'
  }
};

app.post("/", (req, res) => {
    const {
        mortgageAmount,
        repaymentPeriod,
        propertyValue,
        sortType,
        location,
        filterByPaymentType,
        filterByRateType,
        filterByInitialPeriod
    } = req.body;
    
    options.params.mortgageAmount = mortgageAmount;
    options.params.repaymentPeriod = repaymentPeriod;
    options.params.propertyValue = propertyValue;
    options.params.sortType = sortType;
    options.params.location = location;
    options.params.filterByPaymentType = filterByPaymentType;
    options.params.filterByRateType = filterByRateType;
    options.params.filterByInitialPeriod = filterByInitialPeriod;
})

app.get("/results", (req, res) => {
    console.log("start app.get");
	axios.request(options)
	.then(response => {
		const mortgagesResults = response.data;
		res.json(mortgagesResults);
		console.log(mortgagesResults);
	})
	.catch(error =>	console.error(error))
    console.log("finished app.get");
})

app.listen(port, () => console.log(`server running on port ${port}`));