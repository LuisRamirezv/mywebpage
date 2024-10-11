window.addEventListener('DOMContentLoaded',(event) => { //When the content is loaded go and run this event
    getVisitCount();
})

const functionApi = 'http://localhost:7071/api/GetResumeCounter';

const getVisitCount = () => {
    let count = 30; // This variable is has a value but only for the begining

    fetch(functionApi).then(response => {
        return response.json()
    }).then(response =>{

        console.log("Website called function API.");
        count = response.count; // the count variable are going to store the value that json response 
        document.getElementById("counter").innetText = count; // Then go into thge document, find the counter ID , take the innertext and change by the new value from the response

    }).catch(function(error){
        console.log(error);
    });
    return count;

}
