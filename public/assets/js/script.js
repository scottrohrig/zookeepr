const $animalForm = document.querySelector('#animal-form');
const $zookeeperForm = document.querySelector( '#zookeeper-form' )

const handleAnimalFormSubmit = event => {
  event.preventDefault();

  // get animal data and organize it
  const name = $animalForm.querySelector('[name="animal-name"]').value;
  const species = $animalForm.querySelector('[name="species"]').value;
  const dietRadioHTML = $animalForm.querySelectorAll('[name="diet"]');
  let diet;

  // get value of radio button options for diet
  for (let i = 0; i < dietRadioHTML.length; i += 1) {
    if (dietRadioHTML[i].checked) {
      diet = dietRadioHTML[i].value;
    }
  }

  if (diet === undefined) {
    diet = '';
  }

  // add personality traits
  const selectedTraits = $animalForm.querySelector('[name="personality"').selectedOptions;
  const personalityTraits = [];
  for (let i = 0; i < selectedTraits.length; i += 1) {
    personalityTraits.push(selectedTraits[i].value);
  }
  // deconstruct to create animal object to pass to POST body
  const animalObject = { name, species, diet, personalityTraits };

  fetch( '/api/animals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( animalObject )
  } )
    .then( response => {
      if ( response.ok ) {
        return response.json();
      }
      alert( 'Error: ' + response.statusText );
    } )
    .then( postResponse => {
      console.log( postResponse );
      alert( 'Thank you for adding an animal!' );
    } );
};

// create function to handle zookeeper form submission
// should create a zookeeper from form values, then POST to api/zookeepers
const handleZookeeperFormSubmit = event => {
  event.preventDefault();
  // compile form values
  const name = $zookeeperForm.querySelector( '[name="zookeeper-name"]' ).value;
  const age = $zookeeperForm.querySelector( '[name="age"]' ).value;
  const favoriteAnimal = $zookeeperForm.querySelector( '[name="favorite-animal"]' ).value;

  // create zookeeper object
  const zookeeperObject = { name, age, favoriteAnimal };

  // POST response
  fetch( 'api/zookeepers', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( zookeeperObject )
  } )
    .then( response => {
      // validate response is ok else log err
      if ( response.ok ) {
        console.log( '\n\n\nnoahsdfohsdoivsoivsdov\n\n\n' )
        return response.json();
      }
      alert( "Error: " + response.statusText );
    } )
    .then( postResponse => {
      console.log( 'post response line 81', postResponse );
      alert( 'Thank you for adding a zookeeper!' );
    } );
};

$zookeeperForm.addEventListener( 'submit', handleZookeeperFormSubmit );
$animalForm.addEventListener('submit', handleAnimalFormSubmit);
