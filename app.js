document
  .getElementsByClassName("search-btn")[0]
  .addEventListener("click", function () {
    fetch("superheroes.php")
      .then((response) => {
        return response.text();
      })
      .then((superheroes) => {
        alert(superheroes);
      })
      .catch((error) => {
        console.error(error);
      });
  });
