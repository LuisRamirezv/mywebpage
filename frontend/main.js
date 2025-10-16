window.addEventListener('DOMContentLoaded',(event) => { //When the content is loaded go and run this event
    getVisitCount();
})

const functionApiUrl = 'https://getresumecounterweb.azurewebsites.net/api/GetResumeCounter?code=7gVzmgzs2j85aLXc3erxe9TpsNVXlFqolML1jIxRKBXuAzFuSt58YQ%3D%3D';
const localFunctionApi = 'http://localhost:7071/api/GetResumeCounter';

const getVisitCount = () => {
    let count = 30; // This variable is has a value but only for the begining

    fetch(functionApiUrl).then(response => {
        return response.json()
    }).then(response =>{

        console.log("Website called function API.");
        count = response.count; // the count variable are going to store the value that json response 
        document.getElementById("counter").innerText = count; // Then go into thge document, find the counter ID , take the innertext and change by the new value from the response

    }).catch(function(error){
        console.log(error);
    });
    return count;

}

window.addEventListener('DOMContentLoaded', (event) => {
  getVisitCount();

  // Bounce all badges when DOM is loaded
  const badges = document.querySelectorAll('.badge-bounce');
  badges.forEach((badge, index) => {
    setTimeout(() => {
      badge.classList.add('badge-bounce');
    }, index * 100); // stagger the bounce effect slightly
  });
});

