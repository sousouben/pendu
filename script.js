// Sélection des éléments HTML
const container = document.querySelector(".container");
const btn = document.querySelector(".start_btn");
const scoreContainer = document.querySelector(".score");
const timeContainer = document.querySelector(".time");

// Musique effrayante
document.addEventListener("DOMContentLoaded", function () {
  const backgroundMusic = document.getElementById("backgroundMusic");

  // Lecture automatique après une petite interaction utilisateur
  document.addEventListener("click", function playBackgroundMusic() {
    backgroundMusic.play();
    // Retirez l'écouteur d'événement après la première interaction
    document.removeEventListener("click", playBackgroundMusic);
  });

  updateScoreDisplay(); // Met à jour l'affichage du score initial
});

// Gestion du clic sur le bouton de démarrage
btn.onclick = function () {
  let score = 0;
  let time = 20;
  container.innerHTML = ""; // Réinitialise le contenu du conteneur

  const interval = setInterval(function showTarget() {
    // Création de la cible
    const target = document.createElement("img");
    target.id = "target";
    target.src = "fantome.png";
    container.appendChild(target);
    target.style.top = Math.random() * (500 - target.offsetHeight) + "px";
    target.style.left = Math.random() * (600 - target.offsetWidth) + "px";

    // Faire disparaître la cible après un certain délai
    setTimeout(function () {
      target.remove();
    }, 2000);

    // Gestion du clic sur la cible
    target.onclick = function () {
      score += 1;
      target.style.display = "none";
    };
    time -= 1;

    // Affichage du score et du temps restant
    scoreContainer.innerHTML = `Score : ${score}`;
    timeContainer.innerHTML = `Temps : ${time}`;

    // Fin du jeu lorsque le temps est écoulé
    if (time === 0) {
      clearInterval(interval);
      container.innerHTML = "Bien joué!";
    }
  }, 500); // Délai réduit à 500 millisecondes
};
