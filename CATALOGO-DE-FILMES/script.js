let actualPage = 1;
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzAyZDk4NWU0NGQyNGM5YjI3OWZiMjE4YWYyZWIwNCIsIm5iZiI6MTczNjY3NTA4NS43NjEsInN1YiI6IjY3ODM4ZjBkNjAxYWNmZTdiZDRmMTdkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.q6zJu2jeJARGwN-UtbllgkG3Ht3dZvhwNmJP-jT4lPc'
    }
  };

  
  requisicao();
  navPage();
  
function requisicao(){ 
  fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${actualPage}&sort_by=popularity.desc`, options)
    .then(res => res.json())
    .then(obj => {
        showAllMovies(obj);
      
    }).catch(err => console.error(err));
}


    async function showAllMovies(obj){
  
       // console.log(obj);
       let arrayMovie = obj.results
        
       //console.log(arrayMovie);
       arrayMovie.forEach(element => {
         let modelAreaMovie = document.querySelector('.area-movie').cloneNode(true);

         modelAreaMovie.querySelector('img').src = `https://image.tmdb.org/t/p/w500/${element.poster_path}`;
         //modelAreaMovie.querySelector('.rating img');
         modelAreaMovie.querySelector('h1').innerHTML = element.title;
         modelAreaMovie.querySelector('p').innerHTML = element.overview;

         console.log("okkk");
         modelAreaMovie.style.display = 'block';
         document.querySelector('.container-movies').append(modelAreaMovie);
        });
        
    };


    function navPage(obj){
      document.querySelector('.nav-page div').innerHTML =`pagina ${actualPage}`;
      //volta pagina
      document.querySelector('#backPage').addEventListener('click',e=>{
        actualPage--
        if(actualPage===0){
          actualPage = 1
        }
        requisicao();
        document.querySelector('.container-movies').innerHTML = "";
        document.querySelector('.nav-page div').innerHTML =`pagina ${actualPage}`;
        //ir ao topo
        window.scrollTo({
          top: 0,
          behavior: 'smooth' 
        }); 
      });
      //avancar pagina
      document.querySelector('#nextPage').addEventListener('click',e=>{
        actualPage++
        requisicao();
        document.querySelector('.container-movies').innerHTML = "";
        document.querySelector('.nav-page div').innerHTML =`pagina ${actualPage}`
        //ir ao topo
        window.scrollTo({
          top: 0,
          behavior: 'smooth' 
      }) 


    });
    };