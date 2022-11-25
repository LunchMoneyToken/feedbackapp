// Js for Changing ClassName when in tablet mode

function myFunction1(y) {
  if (y.matches) {
    // If media query matches

    let div = document.getElementById("divChange");
    div.className = `container my-4 cardStore`;

    let flexDiv = document.querySelectorAll(".card");

    flexDiv.forEach((element) => {
      element.className = `card m-2 hoverclass`;
    });

    //
  } else {
    let div = document.getElementById("divChange");
    div.className = `col-md-6 mx-auto text-center`;

    let flexDiv = document.querySelectorAll(".card");
    console.log(flexDiv);

    flexDiv.forEach((element) => {
      element.className = `col card m-2 hoverclass`;
    });
  }
}

var y = window.matchMedia("(max-width: 768px)");
myFunction1(y); // Call listener function at run time
y.addListener(myFunction1); // Attach listener function on state changes
