import { writeFile } from "fs/promises";


/** simulate delay in "fetch" 5 seconds */
async function fetchExchangeRatesToFile(dte, fileName) {
    await new Promise(resolve => setTimeout(resolve, 5000));

    const rates = {
        base: "EUR",
        date: new Date().toISOString().split("T")[0],
        rates: {
            USD: 1.12,
            GBP: 0.86,
            SEK: 11.45,
            JPY: 162.5,
            CHF: 0.98
        }
    };

    await writeFile(fileName, JSON.stringify(rates, null, 2), "utf-8");
}

//simulate fetching 3 seconds!!
async function fetchSalesEvents(dte) {
    await new Promise(resolve => setTimeout(resolve, 3000));

    const sales = [
        { name: "Laptop Bag", price: 49.90, customerId: 3, currency: "USD" },
        { name: "Wireless Mouse", price: 29.50, customerId: 13, currency: "GBP"  },
        { name: "USB-C Charger", price: 19.95, customerId: 2, currency: "SEK"  },
        { name: "Noise-Canceling Headphones", price: 149.00, customerId: 45, currency: "JPY"  },
        { name: "Laptop Stand", price: 39.99, customerId: 12, currency: "USD"  }
    ];
    return sales;
}

function createInvoices(sales, rates) {
    return sales.map(sale => {
        const rate = rates.rates[sale.currency];

        if (!rate) {
            throw new Error(`Missing exchange rate for currency: ${sale.currency}`);
        }

        const unitPriceCustomerCurrency = Number((sale.price * rate).toFixed(2));
        
        return {
            invoiceId: crypto.randomUUID(),       
            customerNumber: sale.customerId,
            productName: sale.name,
            currency: sale.currency,
            unitPriceEUR: sale.price,
            rate: rate,
            unitPriceCustomerCurrency: unitPriceCustomerCurrency
        };
    });
}

function validateAndMapSalesEventsToSalesCanonical(sales, yesterday){
    //is not yet implemented!!
    //now return sales as it was, not right!
    return sales;
}

function readAndValidateAndMapSpotRatesToCanonical(ratesFileName, yesterday){
    //is not yet implemented!!
    //now return spotrates as it was, not right!
    const rates = {
        base: "EUR",
        date: new Date().toISOString().split("T")[0],
        rates: {
            USD: 1.12,
            GBP: 0.86,
            SEK: 11.45,
            JPY: 162.5,
            CHF: 0.98
        }
    }
    return rates;
}

function publishInvoices(invoices){
    console.log(`publishing ${invoices.length} invoices.`)
    console.log(invoices)
}


try {
    const ratesFileName = "rates.json"
    const yesterday="2023-01-12";
    const startTime = (new Date().getTime())
    const spotRatesPromise = fetchExchangeRatesToFile(yesterday, ratesFileName);
    //await(spotRatesPromise) 
    //(5 + 3 = 8 seconds, two jobs running in series)
    const salesEvents = await fetchSalesEvents(yesterday)
    const salesEventsCanonical = validateAndMapSalesEventsToSalesCanonical(salesEvents, yesterday)
    await(spotRatesPromise) 
    //(~5 seconds, two jobs running parallel)
    const spotRatesCanonical = readAndValidateAndMapSpotRatesToCanonical(ratesFileName, yesterday)
    const invoices = createInvoices(salesEventsCanonical, spotRatesCanonical)
    publishInvoices(invoices)
    const endTime=(new Date().getTime())
    console.log(`Time consumed! ${(endTime-startTime)}`)
}
catch (e) {
    console.log("Error when creating invoices. "+e.message)
}

