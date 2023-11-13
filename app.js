document
  .getElementsByClassName("search")[0]
  .addEventListener("click", function () {
    let input = document.querySelector("input").value;

    let query = encodeURIComponent(input);

    fetch("superheroes.php?query=" + query)
      .then((response) => {
        return response.json();
      })
      .then((superheroes) => {
        let resultDiv = document.getElementById("result");

        resultDiv.innerHTML = "";

        // Create a container div for the result
        const resultContainer = document.createElement("div");
        resultContainer.innerHTML = `
  <div>
    <h2>RESULT</h2>
    <hr>
  </div>
`;

        // Function to create and append a message div
        function appendMessage(message) {
          const messageDiv = document.createElement("div");
          messageDiv.innerHTML = `<p class="unfound">${message}</p>`;
          resultContainer.appendChild(messageDiv);
        }

        // single superhero
        function appendSingleSuperhero(superhero) {
          const singleSuperheroDiv = document.createElement("div");
          singleSuperheroDiv.innerHTML = `
    <div>
      <h3>${superhero.alias}</h3>
      <h4>${superhero.name}</h4>
      <p>${superhero.biography}</p>
    </div>
  `;
          resultContainer.appendChild(singleSuperheroDiv);
        }

        // list of superheroes
        function appendSuperheroList(superheroes) {
          const list = document.createElement("ul");
          superheroes.forEach((superhero) => {
            const listItem = document.createElement("li");
            listItem.textContent = superhero.name;
            list.appendChild(listItem);
          });
          resultContainer.appendChild(list);
        }

        // Check if any superheroes were found
        if (superheroes.length === 0) {
          appendMessage("SUPERHERO NOT FOUND", "unfound");
        } else if (superheroes.length === 1) {
          appendSingleSuperhero(superheroes[0]);
        } else {
          appendSuperheroList(superheroes);
        }

        // Add result to container
        resultDiv.appendChild(resultContainer);
      })
      .catch((error) => {
        console.error(error);
      });
  });


