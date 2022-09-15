$(document).ready(function () {
  /**
   * Variables
   */
  const animes = [],
    randomAnimes = [];


  /**
   * Events
   */
  $("#btnAddAnime").bind("click", onClickAddAnime);
  $("#generatedBtn").bind("click", onClickGeneratedRandomAnime);

  /**
   * Autocallable function after loading page
   */
  (function () {
    console.log("JQuery loaded");
    initializeVariables();
    displayTable("#animeList", getFromLocalStorage("animes"));
    displayTable("#randomAnimeList", getFromLocalStorage("randomAnimes"));
  })();

  /**
   * Events callable functions
   */
  function onClickAddAnime() {
    let anime = getFieldValue();
    if (addItemToTable(animes, anime, "animes")) {
      alert(
        `L'anime ${anime.name} à été ajouté avec success dans liste des animes à regarder`
      );
      clearFields();
      displayTable("#animeList", getFromLocalStorage("animes"));
      displayTable("#randomAnimeList", getFromLocalStorage("randomAnimes"));
    } else alert(`L'anime ${anime.name} à deja été ajouté à la liste des animes à regarder`);
  }

  function onClickGeneratedRandomAnime() {
    let animes = getFromLocalStorage("animes");
    if (animes.length >= 2) {
      let randomAnime = randomTableItem(animes);
      if (addItemToTable(randomAnimes, randomAnime, "randomAnimes")) {
        alert(
          `L'anime ${randomAnime.name} à été ajouté avec success dans liste des animes randoms`
        );
        $("#animeGenerated").html(randomAnime.name);
        displayTable("#randomAnimeList", getFromLocalStorage("randomAnimes"));
      }
    } else alert("Il faut imperativement deux élements pour commencer la generation");
  }

  /** Utils functions */
  function randomTableItem(animes) {
    return animes[Math.floor(Math.random() * animes.length)];
  }

  function displayTable(selector, tab) {
    if (tab.length == 0) {
      $(selector).html(
        "<p class='text-center p-5'>Aucun animé ajouté pour l' instant</p>"
      );
    } else {
      $(selector).empty();
      tab.forEach((item) => {
        let line = `
                <a href="${
                  item.url
                }" title='Cliquer pour regarder' target="_blank" aria-current="true" class="list-group-item list-group-item-action d-flex gap-3 py-3">
                    <img src="${
                      item.image == undefined
                        ? "https://cdn.oneesports.gg/cdn-data/2022/04/OnePiece_FilmRedUta.jpg"
                        : item.image
                    }" alt="photo" width="32" height="32" class="rounded-circle border border-primary mr-2 flex-shrink-0">
                        <div class="d-flex gap-2 w-100 justify-content-between"><div>
                            <h6 class="mb-0"> ${item.name} </h6>
                            <p class="mb-0 opacity-75"></p>
                        </div>
                    </div>
                </a>`;
        $(selector).append(line);
      });
    }
  }

  function checkIfAnimeExist(key) {
    let animes = getFromLocalStorage(key);
    if (animes != undefined) {
      let animeToSearch = animes.find(
        (anime) => anime.name == animeToAdd.name || anime.url == animeToAdd.url
      );
      if (animeToSearch == undefined) return false;
      return true;
    }
  }

  function addItemToTable(tab, obj, key) {
    if (!checkIfAnimeExist(tab, obj)) {
      tab.push(obj);
      saveToLocalStorage(key, tab);
      return true;
    }
    return false;
  }

  /**
   * Field Functions
   */

  function clearFields() {
    document.querySelector("#formAnime").reset();
  }

  function getFieldValue() {
    const animeName = $("#animeName").val();
    const animeUrl = $("#animeUrl").val();
    const animeImage = $("#animeImage").val();
    return {
      name: animeName,
      url: animeUrl,
      image: animeImage,
    };
  }

  /** LocalStorage Functions */
  function saveToLocalStorage(key, item) {
    const array = JSON.stringify(item);
    window.localStorage.setItem(key, array);
  }

  function initializeVariables() {
    checkIfVariableExitInLocalStorage("animes");
    checkIfVariableExitInLocalStorage("randomAnimes");
  }

  function checkIfVariableExitInLocalStorage(key) {
    if (window.localStorage.getItem(key) == undefined)
      saveToLocalStorage(key, animes);
  }

  function getFromLocalStorage(key, type = "array") {
    let item = localStorage.getItem(key);
    return type == "array" ? JSON.parse(item) : item;
  }
});
