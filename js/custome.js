let worldCountry = document.getElementById("world-country-data");
let viewData = document.getElementById("tableCountrydata");

const getCategories = async () => {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const allData = await response.json();
    allData.forEach(data => {
        worldCountry.innerHTML += `
                <div class="col-6">
                    <div class="country-data border border-3 rounded-3 shadow p-3 h-100"  data-bs-target="#allView"  data-bs-toggle="modal"  style="cursor: pointer;"  onclick="return countryAlldata('${data.ccn3}')">
                        <h1 class="text-center text-success text-capitalize">${data.name.common}</h1>
                    </div>
                </div>`;
    });
};

const countryAlldata = async (code) => {
    const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
    const data = await res.json();

    const currencyNames = data[0].currencies ? Object.values(data[0].currencies).map(currency => currency.name).join(', ') : 'No currencies available';
    const currencysymbol = data[0].currencies ? Object.values(data[0].currencies).map(currency => currency.symbol).join(', ') : 'No currencies available';
    const coatOfArmsImg = data[0].coatOfArms && data[0].coatOfArms.png ? `<img src="${data[0].coatOfArms.png}" width="200px"/>` : "Coat of Arms not available";

    viewData.innerHTML = `<tr>
                            <td>${data[0].name.common}</td>
                            <td>${data[0].capital}</td>
                            <td>${Object.values(data[0].languages)}</td>
                            <td>${currencyNames}</td>
                            <td>${currencysymbol}</td>
                            <td><img src="${data[0].flags.svg}" width="200px" class="rounded-3" /></td>
                            <td>${coatOfArmsImg}</td>
                        </tr>
        `;
};

getCategories();