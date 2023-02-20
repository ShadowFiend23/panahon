// var request = new XMLHttpRequest();
// request.open('GET', 'https://ipapi.co/json/ ', true);

// request.onload = function() {
//   if (request.status >= 200 && request.status < 400) {
//     Success!
//     var data = JSON.parse(request.responseText);
//     console.log(data);
//   } else {
//     We reached our target server, but it returned an error

//   }
// };

// request.onerror = function() {
//   There was a connection error of some sort
// };

// request.send();

// const url = "https://api.spacexdata.com/v4";

// const result = fetch(`${url}/launches/latest`, { method: "get" })
//   .then((response) => response.json()) // pass the data as promise to next then block
//   .then((data) => {
//     const rocketId = data.rocket;

//     console.log(rocketId, "\n");

//     return fetch(`${url}/rockets/${rocketId}`); // make a 2nd request and return a promise
//   })
//   .then((response) => response.json())
//   .catch((err) => {
//     console.error("Request failed", err);
//   });

// // I'm using the result const to show that you can continue to extend the chain from the returned promise
// result.then((r) => {
//   console.log(r.first_stage); // 2nd request result first_stage property
// });
window.onload = () => {
  const searchBox = document.getElementById("searchBox");
  const closeBtn = document.getElementById("close");
  const autoComplete = document.getElementById("autoComplete");

  searchBox.addEventListener("keyup", function () {
    if (this.value.trim() === "") {
      closeBtn.style.display = "none";
      autoComplete.style.display = "none";
    } else {
      closeBtn.style.display = "inline-block";
      autoComplete.style.display = "block";
    }
  });

  searchBox.addEventListener('focus',function(){
    this.classList.add('active');
  })

  searchBox.addEventListener('blur',function(){
    if(this.value.trim() === '')
        this.classList.remove('active');
  })

  closeBtn.addEventListener("click", function () {
    this.style.display = "none";
    searchBox.focus();
    searchBox.value = "";
  });

  document.addEventListener("click", function (e) {
    const cities = e.target.closest(".cities"); // Or any other selector.
    if (cities) {
      autoComplete.style.display = "none";
      var nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
      ).set;
      nativeInputValueSetter.call(searchBox, cities.innerHTML);
      const coordinates = cities.dataset.coordinates.split(" ");
      searchBox.dataset.latitude = coordinates[0];
      searchBox.dataset.longitude = coordinates[1];

      var ev2 = new Event("input", { bubbles: true });
      searchBox.dispatchEvent(ev2);
    }
  });
};
