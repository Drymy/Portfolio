//FONCTION POUR PAGES DYNAMIQUES

(function () {
    var partialsCache = {}
    let timeOutId;
    function fetchFile(path, callback){
      var request = new XMLHttpRequest();
      request.onload = function () {
        callback(request.responseText);
      };
      request.open("GET", path);
      request.send(null);
    }
  
    function getContent(fragmentId, callback){
      if(partialsCache[fragmentId]) {
        callback(partialsCache[fragmentId]);
  
      } else {
        fetchFile(fragmentId + ".html", function (content) {
          partialsCache[fragmentId] = content;
          callback(content);
        });
      }
    }
  
    function navigate(){
      var contentDiv = document.getElementById("main"),
          fragmentId = location.hash.substr(1);

      getContent(fragmentId, function (content) {
        if (timeOutId) {
          clearTimeout(timeOutId);
          timeOutId = null;
        }
        timeOutId = setTimeout(function() {   //setTimeout delay l'injection du contenu pour permettre à l'animation de se faire, vital
        contentDiv.innerHTML = content;
        }, 600);
        setTimeout(function() { 
          sidebarNavigation()}, 1000);
      });

    }
    if(!location.hash) {

      location.hash = "#home";
    }
  
    navigate();
    
    window.addEventListener("hashchange", navigate)

  }());


// ANIMATION NAVBAR DU HAUT AU CHANGEMENT DE PAGE

$(document).ready(function(){
  
  $("#home, #web, #design").click(function(){
    $("#main").finish().fadeOut("slow");
    $("#main").fadeIn("slow");
  });
});


// ANIMATION NAVBAR SLIDER

var element = document.querySelectorAll("#home, #web, #design");

for (var i = 0; i < element.length; i++) {
  element[i].addEventListener("click",function(x){
    if(document.querySelector(".active")){
      document.querySelector(".active").classList.remove("active");
    }
    x.currentTarget.classList.add("active");
    var id= x.target.parentElement.id
    if (id == "home"){
      document.getElementById('slider').style.background = "cyan";
      document.getElementById('logo').style.filter = "hue-rotate(0deg)";
    }
    if (id == "web"){
      document.getElementById('slider').style.background = "palevioletred";
      document.getElementById('logo').style.filter = "hue-rotate(150deg)";
    }
    if (id == "design"){
      document.getElementById('slider').style.background = "lawngreen";
      document.getElementById('logo').style.filter = "hue-rotate(300deg)";
    }
    
  });
} 

// CHANGEMENT D'ONGLET SIDEBAR

function sidebarNavigation() {
  menuLoaded();
  function menuLoaded() {
      const sideMenuChildren = document.getElementById("sidemenu").childNodes;
      for(let i = 0; i < sideMenuChildren.length; i++) {
          const tab = sideMenuChildren[i];
          tab.addEventListener(   //nouveau format pour eventlistener
              "click",
              function (ev) {
                const currentab = document.querySelector(".liactive");
                currentab.classList.remove("liactive");
                ev.target.classList.add("liactive");
                showContent(tab.id);
              }
          )
      }
  }
  
  function showContent(menuName) {
      const pageContainer = document.getElementById("content");
      const element = pageContainer.querySelector("." + menuName);
      const currentContent = document.querySelector(".selected");
      currentContent.classList.remove("selected");
      element.classList.add("selected");
  }
}