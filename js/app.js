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
      const carElement = `
          <div class="row">
              <div class="col-12 col-lg-4 mb-3">
                  <img class="car img-fluid" src="${car.image}"  alt="" />
              </div>
              <div class="col-12 col-lg-8">
                  <h4 class="position-absolute" >${car.model}</h4>
                  <div class="d-flex justify-content-end  >
                      <h5 class="stars">
                          ${car.year} | $USD${car.price_usd} |
                          <i class="bi bi-star-fill text-warning"></i>
                          <i class="bi bi-star-fill text-warning"></i>
                          <i class="bi bi-star-fill text-warning"></i>
                          <i class="bi bi-star-fill text-warning"></i>
                          <i class="bi bi-star text-warning"></i>
                      </h5>
                  </div>
                  <p class="py-2">${car.description}</p>
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
      prueba.insertAdjacentHTML("beforeend", carElement);
    }
    console.log("hola");
  })
  .catch((error) => {
    console.error("Error al obtener los datos: " + error);
  });
