const weatherform = document.querySelector(".weatherform");
const cityinput = document.querySelector(".cityinput");
const card = document.querySelector(".card");

const apikey = "a6426f5662ef925fac8eef1b55d0bd44";
weatherform.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityinput.value;
  if (city) {
    try {
      const weatherdata = await getweatherdata(city);
      displayinfo(weatherdata);
    } catch (error) {
      console.error(error);
      errordisplay(error);
    }
  } else {
    errordisplay(" Please enter a valid city ");
  }
});
async function getweatherdata(city) {
  const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
  const response = await fetch(apiurl);
  if (!response.ok) {
    throw new Error("could not fetch data");
  }
  return await response.json();
}
function displayinfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;
  card.textContent = "";
  card.style.display = "flex";
  const citydisplay = document.createElement("h1");
  const tempdisplay = document.createElement("p");
  const humiditydisplay = document.createElement("p");
  const desdisplay = document.createElement("p");
  citydisplay.textContent = city;
  tempdisplay.textContent = `${(temp - 273.15).toFixed(1)}C`;
  humiditydisplay.textContent = `Humidity:${humidity}%`;
  desdisplay.textContent = description;

  humiditydisplay.classList.add("humiditydisplay");
  tempdisplay.classList.add("tempdisplay");
  citydisplay.classList.add("citydisplay");
  desdisplay.classList.add("desdisplay");
  card.appendChild(citydisplay);
  card.appendChild(tempdisplay);
  card.appendChild(humiditydisplay);
  card.appendChild(desdisplay);
}

function errordisplay(msg) {
  const errordisplay = document.createElement("p");
  errordisplay.textContent = msg;
  errordisplay.classList.add("errordisplay");
  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errordisplay);
}
