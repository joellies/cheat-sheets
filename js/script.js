function encodePreElements() {
  var pre = document.getElementsByTagName('pre');
  for (var i = 0; i < pre.length; i++) {
    var encoded = htmlEncode(pre[i].innerHTML);
    pre[i].innerHTML = encoded;
  }
}

function htmlEncode(value) {
  var div = document.createElement('div');
  var text = document.createTextNode(value);
  div.appendChild(text);
  return div.innerHTML;
}

/*let howAreYou = prompt('Hi ! How are you ?');
window.alert('Thanx for sharing');*/

/*Quotes*/

const getRandomQuotes = () => {
  let randomNumber = Math.floor(Math.random() * Math.floor(1643));
  fetch('https://type.fit/api/quotes')
    .then(response => {
      return response.json();
    })
    .then(response => {
      let data = response[randomNumber];
      document.getElementById('quotes').textContent = data.text;
      document.getElementById('author').textContent = data.author;
    });
};
getRandomQuotes();

function buttonListener() {
  document.getElementById('main-container').addEventListener('click', () => {
    getRandomQuotes();
  });
}
buttonListener();

/*Form post*/

let myHeaders = new Headers({ 'content-type': 'application/json' });

document.getElementById('submit-btn').addEventListener('click', () => {
  let authorValue = document.getElementById('auteur').value; //on récupère les valeurs entrées dans les champs du formulaire
  let commentValue = document.getElementById('comment').value;
  //je récupère les valeurs de mes champs
  let body = {
    auteur: authorValue,
    comment: commentValue,
  }; // variable utile pour le body du post
  console.log(JSON.stringify(body)); //pour garder chaine de caractères en tant que clés
  fetch('https://quotes-light-api.herokuapp.com/api/comments/', {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(body),
  });
});

/*Form get*/

let getComment = () => {
  fetch('https://quotes-light-api.herokuapp.com/api/comments/', {
    method: 'GET',
  })
    .then(response => {
      return response.json();
    })
    .then(response => {
      console.log(response);
      let data = response; // on stocke la réponse dans une data, c'est un objet
      firstTen = new Array();
      data.slice([0], [10]).map(item => {
        firstTen.push(item);
        console.log(firstTen);
      });
      firstTen.forEach(element => {
        //les données arrivent sous forme de tableau, donc pour chaque élément du tableau on applique la méthode
        let currentDiv = document.getElementById('o-fetch__getExemple'); //balise fantôme avant laquelle on viendra greffer les nouveaux contenus
        let newDivAuteur = document.createElement('div'); //nouvelle div où on injectera auteur
        let newDivComment = document.createElement('div'); //nouvelle div où on injectera comment
        let newContentAuteur = document.createTextNode(element.auteur); //créer nouveau noeud texte auteur, même chose que text-content
        let newContentComment = document.createTextNode(element.comment); //texte commment
        newDivAuteur.appendChild(newContentAuteur); //s'utilise sur l'élément parent et prend comme param l'élément enfant, on greffe le nouveau contenu auteur dans la nouvelle div auteur
        newDivComment.appendChild(newContentComment); // on greffe le nouveau contenu comment dans la nouvelle div comment
        currentDiv.appendChild(newDivAuteur); //on insère dans le code html (avant la current div fantôme qu'on a créé plus tôt) la nouvelle div auteur, , le première param est la nouvelle div, le 2 c'est le prochain frère de la current div qui est le point de repère
        currentDiv.appendChild(newDivComment); //on insère dans le code html (avant la current div fantôme qu'on a créé plus tôt) la nouvelle div comment, le première param est la nouvelle div, le 2e c'est le prochain frère de la div point de repère
        newDivAuteur.setAttribute('class', 'auteurForm');
        newDivComment.setAttribute('class', 'commentForm');
      });
    });
};
getComment();
