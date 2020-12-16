//DO NOT STORE A TOKEN DIRECTLY LIKE THIS FOR CRITICAL SYSTEMS
//BEST PRACTICE IS TO NEVER STORE TOKENS IN THE FRONT-END
//This is a rare case where it is not possible to store it in the backend as Github pages does not allow backend code
//Therefor if one has to use this approach ensure that the token is read-only for non-critical data
var token = "965ab1133f437eb8dd7e7102cf2fbfe3201b6cfa"

//send a POST request using jquery to the Github GraphQL API
$.ajax({
    method: "POST",
    url: "https://api.github.com/graphql",
    contentType: "application/json",
    headers: {
      //Authorize using the token as anonymous is not implemented yet.
      Authorization: `bearer ${token}`
    },
    //What information to fetch
    data: JSON.stringify({
      query: `query {
          user(login:"glassp"){
            repositories(first:100){
              nodes{
                name,
                openGraphImageUrl,
                url,
                description
                isFork,
                owner{
                  login
                }
              }
            }
          }
        }`
    }),
    success: function(result) {
      //parse information into variable repo
      var repos = result.data.user.repositories.nodes;
      for(var i in repos){
        var repo = repos[i];
        if(!repo.isFork && !repo.name.includes("examples") && repo.name.includes("mathe"))
        //inject a html card with the repo info (exclude forked and examples repo)
        $("#projects").append(`
          <div class="card">
            <div class="embbed-responsive">
              <img class="card-img-top" src="${repo.openGraphImageUrl}" alt="Card image cap">
            </div>
            <div class="card-body">
              <h5 class="card-title">${repo.name}</h5>
              <p class="card-text">
                <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/${repo.owner.login}/${repo.name}">
                <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/${repo.owner.login}/${repo.name}">
              </p>
              <p class="card-text">${repo.description}</p>
              <a href="${repo.url}" class="btn btn-primary">Go to Project</a>
            </div>
          </div>
        `);
      }
    }
  });
