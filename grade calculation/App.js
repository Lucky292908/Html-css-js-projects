const add = () => {
  let Maths = parseFloat(document.querySelector("#maths").value);
  let English = parseFloat(document.querySelector("#english").value);
  let Hindi = parseFloat(document.querySelector("#hindi").value);
  let Physics = parseFloat(document.querySelector("#physics").value);
  let Grade = "";

  
  if (Maths > 100 || English > 100 || Hindi > 100 || Physics > 100) {
    document.querySelector("#show-data").innerHTML =
      "Please enter valid marks (maximum value should be 100).";
    return;
  }

  let marks = Maths + English + Hindi + Physics;
  let perc = (marks / 400) * 100;

  if (perc >= 80) {
    Grade = "A";
  } else if (perc >= 60) {
    Grade = "B";
  } else if (perc >= 33) {
    Grade = "C";
  } else {
    Grade = "Fail";
  }

  document.querySelector(
    "#show-data"
  ).innerHTML = `Out of 400 your total mark is ${marks} and your percentage is ${perc}%. <br> Your grade is ${Grade}`;
};
