let btn = document.getElementById("btn");

btn.addEventListener("click", function () {
  let textInput = document.getElementById("input");
  if (textInput.value === null || textInput.value === "") {
    alert("You Must Enter Your City Name");
  } else {
    getPrayerTimesForCity(textInput.value).catch((error) => {
      alert(error);
    });
    textInput.value = "";
  }
});

function getPrayerTimesForCity(city) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://api.aladhan.com/v1/timingsByCity/date?city=${city}&country=egypt`
      )
      .then((response) => {
        let times = response.data.data.timings;
        let item = document.getElementById("times");
        item.innerHTML = ` 
            <h2>Pray Time For: ${city}</h2>
            <div class="time">
                <div class="moon">
                    <div class="fajr">
                    <h3>Fajr</h3>
                    <p>${times["Fajr"]}</p>
                    </div>
                    <div class="sun">
                    <h3>Sun</h3>
                    <p>${times["Sunrise"]}</p>
                    </div>
                    <div class="dhuhr">
                    <h3>Dhuhr</h3>
                    <p>${times["Dhuhr"]}</p>
                    </div>
                </div>
                <div class="night">
                    <div class="asr">
                    <h3>Asr</h3>
                    <p>${times["Asr"]}</p>
                    </div>
                    <div class="maghrib">
                    <h3>Maghrib</h3>
                    <p>${times["Maghrib"]}</p>
                    </div>
                    <div class="isha">
                    <h3>Isha</h3>
                    <p>${times["Isha"]}</p>
                    </div>
                </div>
            </div>
                `;
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}

getPrayerTimesForCity("cairo");
