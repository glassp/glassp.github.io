$.ajax({
  url: "https://api.github.com/users/glassp/repos",
  success: function(result){
    console.log(result);
    console.log(result[0]);
    for(var i in result){
      var repo = result[i].name;
      var user = result[i].owner.login;
      var url = result[i].html_url;
      var desc = result[i].description;
      var isFork = result[i].fork;
      if(!isFork)
        $("#projects").append(`
          <div class="card">
            <img class="card-img-top" src="placeholder.jpg" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">${repo}</h5>
              <p class="card-text">
                <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/${user}/${repo}">
                <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/${user}/${repo}">
              </p>
              <p class="card-text">${desc}</p>
              <a href="${url}" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        `);
    }
  }
})
/*



*/