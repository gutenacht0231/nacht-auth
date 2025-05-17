console.log("Gute Nacht was here!");

const accounts = [];
let navbar = document.getElementById("navbar"),
navbar_title = document.getElementById("navbar-title"),
navbar_option1 = document.getElementById("navbar-option1"),
navbar_option4 = document.getElementById("navbar-option4");

function toggleNavbar() {
    let minimizeButton = document.getElementById("navbar-minimize");
    if (navbar.style.width === "50px") {
      navbar.style.width = "300px";
      navbar_title.style.display = "block";
      navbar_option1.style.display = "block";

        navbar_option4.style.display = "block";
      minimizeButton.innerHTML = "&times;";
    } else {
      navbar.style.width = "50px";
        navbar_title.style.display = "none";
        navbar_option1.style.display = "none";
        navbar_option4.style.display = "none";
      minimizeButton.innerHTML = "&hellip;";
    }
}

function showScreen(screenId) {
    let screens = document.getElementsByClassName("screen");
    for (let i = 0; i < screens.length; i++) {
      screens[i].classList.remove("active");
    }
    document.getElementById(screenId).classList.add("active");
}

function copySession(session) {
    navigator.clipboard.writeText(session);
    alert("Session copied to clipboard!");
}

function VisitGithub(){
    window.open("https://github.com/gutenacht0231/nacht-auth", "_blank");
}

fetch("http://localhost:1000/api")
  .then(response => response.json())
  .then(data => {
    for (const item of data) {
      accounts.push(item);
    }
    
    accounts.sort((a, b) => b[1] - a[1]);
  
    for (let i = 0; i < accounts.length; i++) {
      let account = accounts[i];
      if (account[1] >= 1000) {
        account[1] = `${(account[1] / 1000).toFixed(2)}b`;
      } else if (account[1] <= 1 || account[1] != 0) {
        account[1] = `${account[1]}m`;
      }
      else {
        account[1] = "0";
      }
    }

    let list = document.getElementById("list");
    
    for (let i = 0; i < accounts.length; i++) {
      let account = accounts[i];
      list.innerHTML += `<div class="sessions"><h3>${account[0]}</h3><p class="networth">🪙 Networth: ${account[1]}</p><button onclick="copySession('${account[2]}')">Copy Session</button></div>`;
    }
  });