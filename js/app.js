// Mi código JavaScript:

const seleccionAnio = document.querySelector("#seleccionAnio");
const anioActual = new Date().getFullYear();
const test = document.querySelector("#test");
const marca = document.querySelector("#seleccionMarca");

for (let year = anioActual; year >= 1900; year--) {
  const option = document.createElement("option");
  option.value = year;
  option.text = year;
  seleccionAnio.appendChild(option);
}

fetch("https://ha-front-api-proyecto-final.vercel.app/brands")
  .then(function (res) {
    return res.json();
  })
  .then(function (marcas) {
    for (let marca of marcas) {
      const option = document.createElement("option");
      option.value = marca;
      option.text = marca;
      seleccionMarca.appendChild(option);
    }
  });

fetch("https://ha-front-api-proyecto-final.vercel.app/models?brand=Audi")
  .then(function (res) {
    return res.json();
  })
  .then(function (modelos) {
    for (let modelo of modelos) {
      const option = document.createElement("option");
      option.value = modelo;
      option.text = modelo;
      seleccionModelo.appendChild(option);
    }
  });

fetch("https://ha-front-api-proyecto-final.vercel.app/cars")
  .then(function (res) {
    return res.json();
  })
  .then(function (cars) {
    for (let car of cars) {
      const carElement = buildCarDivs(car);
      prueba.insertAdjacentHTML("beforeend", carElement);
    }
    console.log("hola");
  })
  .catch((error) => {
    console.error("Error al obtener los datos: " + error);
  });

const searchButton = document.querySelector("#searchButton");

searchButton.addEventListener("click", filterCars);

function filterCars() {
  event.preventDefault();

  const carContainer = document.querySelector("#prueba");
  carContainer.innerHTML = "";

  let carDiv = "";

  const year = document.querySelector("#seleccionAnio");
  const marca = document.querySelector("#seleccionMarca");
  const modelo = document.querySelector("#seleccionModelo");
  const status = document.querySelector("#selectStatus");

  const yearValue = year.value;
  const marcaValue = marca.value;
  const modeloValue = modelo.value;
  const statusValue = status.value;

  console.log(yearValue);
  console.log(marcaValue);
  console.log(modeloValue);
  console.log(statusValue);

  url = "https://ha-front-api-proyecto-final.vercel.app/cars";

  fetch(url)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (data) {
      data.forEach((element) => {
        if (
          (yearValue === "1" || element.year == yearValue) &&
          (marcaValue === "1" || element.brand == marcaValue) &&
          (modeloValue === "1" || element.model == modeloValue) &&
          (statusValue === "1" || element.status == statusValue)
        ) {
          carDiv = buildCarDivs(element);
          prueba.insertAdjacentHTML("beforeend", carDiv);
        }
      });
      if (carDiv == "") {
        alert(
          "No se ha encontrado ningún vehiculo para los filtros seleccionados"
        );
      }
    });
}
function drawstars(rating) {
  let stars = "";
  for (let i = 0; i < 5; i++) {
    if (rating > i) {
      stars += <i class="bi bi-star-fill text-warning"></i>;
    } else {
      stars += <i class="bi bi-star text-warning"></i>;
    }
  }
  return stars;
}

function buildCarDivs(element) {
  const carDiv = `
    <div class="row">
        <div class="col-12 col-lg-4 mb-3">
            <img class="car img-fluid" src="${element.image}"  alt="" />
        </div>
        <div class="col-12 col-lg-8">
            <h4 class="position-absolute" >${element.model}</h4>
            <div class="d-flex justify-content-end  >
                <h5 class="stars">
                    ${element.year} | $USD${element.price_usd} ${drawstars(
    car.rating
  )}|
                </h5>
            </div>
            <p class="py-2">${element.description}</p>
            <button type="submit" class="btn btn-success" id="comprar">
                <i class="bi bi-cart3"></i>
                Comprar
            </button>
            <button type="submit" class="btn btn-light">
                <i class="bi bi-plus-square"></i> Más información
            </button>
            <button type="submit" class="btn btn-light">
                <i class="bi bi-box-arrow-up-right"></i> Compartir
            </button>
        </div>
      </div>
      <hr />
      `;

  return carDiv;
}
