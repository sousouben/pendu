const container = document.querySelector(".container");
const btn = document.querySelector(".start_btn");
const scoreContainer = document.querySelector(".score");
const timeContainer = document.querySelector(".time");
const difficultySelector = document.querySelector("#difficulty");
const backgroundMusic = document.getElementById("backgroundMusic");
const winSound = document.getElementById("winSound");
const loseSound = document.getElementById("loseSound");

let interval;
let score = 0;
let time = 20;
let speed = 500; // vitesse par défaut

// Musique effrayante
document.addEventListener("DOMContentLoaded", function () {
  // Lecture automatique après une petite interaction utilisateur
  btn.addEventListener("click", function playBackgroundMusic() {
    backgroundMusic.play();
    // Retirez l'écouteur d'événement après la première interaction
    document.removeEventListener("click", playBackgroundMusic);
  });

  updateScoreDisplay(); // Met à jour l'affichage du score initial
});

// Gestion du clic sur le bouton de démarrage
btn.onclick = function () {
  score = 0;
  time = 20;
  clearInterval(interval); // Arrête l'intervalle précédent

  container.innerHTML = ""; // Réinitialise le contenu du conteneur

  // Définir la vitesse en fonction du niveau de difficulté sélectionné
  switch (difficultySelector.value) {
    case "easy":
      speed = 1000;
      break;
    case "medium":
      speed = 800;
      break;
    case "hard":
      speed = 500;
      break;
    default:
      speed = 800; // Niveau moyen par défaut
  }

  interval = setInterval(function showTarget() {
    // Création de la cible
    const target = document.createElement("img");
    target.id = "target";
    target.src = "images/fantome.png";
    container.appendChild(target);
    target.style.top = Math.random() * (500 - target.offsetHeight) + "px";
    target.style.left = Math.random() * (600 - target.offsetWidth) + "px";

    // Création de la deuxième image pour la défaite
    const loseImage = document.createElement("img");
    loseImage.id = "loseImage";
    loseImage.src = "images/bomb.png";
    container.appendChild(loseImage);
    loseImage.style.top = Math.random() * (500 - loseImage.offsetHeight) + "px";
    loseImage.style.left = Math.random() * (600 - loseImage.offsetWidth) + "px";

    // Faire disparaître les images après un certain délai
    setTimeout(function () {
      target.remove();
      loseImage.remove();
    }, 2000);

    // Gestion du clic sur la cible
    target.onclick = function () {
      score += 1;
      target.style.display = "none";
    };

    // Gestion du clic sur l'image de défaite
    loseImage.onclick = function () {
      clearInterval(interval); // Arrête le jeu
      backgroundMusic.pause(); // Pause la musique
      loseSound.play(); // Joue le son de défaite
      container.innerHTML = ""; // Effacer le contenu existant du conteneur
      const loseImage = document.createElement("img");
      loseImage.src = "images/lose_image.png"; // Spécifier l'image de défaite
      container.appendChild(loseImage); // Ajouter l'image de défaite au conteneur
    };

    time -= 1;

    // Affichage du score et du temps restant
    scoreContainer.innerHTML = `Score : ${score}`;
    timeContainer.innerHTML = `Temps : ${time}`;

    // Fin du jeu lorsque le temps est écoulé
    if (time === 0) {
      clearInterval(interval);
      backgroundMusic.pause(); // Pause la musique
      winSound.play(); // Joue le son de victoire
      container.innerHTML = ""; // Effacer le contenu existant du conteneur
      const winImage = document.createElement("img");
      winImage.src = "images/win_image.png"; // Spécifier l'image de victoire
      container.appendChild(winImage); // Ajouter l'image de victoire au conteneur
    }
  }, speed); // Utilisez la vitesse définie
};
