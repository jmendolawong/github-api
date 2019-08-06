'use strict'


const searchURL = 'https://api.github.com/users/' //:username/repos

/*take the results and pull out the appropriate information
Format relevant info into proper html to display
If second query, clear the first results to display only the second results, iterated.
*/
function displayResults(results){
    console.log(results);
    $('#results-list').empty();
    $('#results').removeClass('hidden');
    
    //for each item in the array, extract name and url and format via html
    for(let i=0; i<results.length; i++){
        $('#results-list').append(
            `<li>
                <p><strong>${results[i].name}</strong>: <a href="${results[i].html_url}">repo</a></p> 
            </li>`
        )
    }
}

/* 
getRepo will add the user input to the search url to create api url
Implement the native fetch api, add response.ok, then to conver response to JSON
Then when conversion complete, run through displayResults function to format HTML properly
*/
function getRepo(query){
    const url = searchURL + query + '/repos';

    fetch (url)
      .then(response => {
          if(response.ok){
              return response.json();
          }
          throw new Error (response.statusText);
      })
      .then(responseJSON => displayResults(responseJSON))
      .catch(error => { 
          $('#js-error').text(`Error - user ${error.message}`);
      })
    }



/* 
This function is what's teed up once the page loads
Watches to see when the form is submitted
Prevents default submission and sets user to the value from the input
Passes that value to the function get Repo
*/
function watchForm(){
    $('form').submit(e =>{
        e.preventDefault();
        const user = $('#search-user').val();
        getRepo(user);
    });
}

$(watchForm);