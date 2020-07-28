console.log("IS THIS THING ON???")

document.addEventListener('DOMContentLoaded', () => {
    CELEB_URL = "http://localhost:3000/celebrities"
    const celebUl = document.querySelector('.flex-container')


    function fetchCelebs() {
        fetch(CELEB_URL)
        .then(response => response.json())
        .then(celebrities => renderAllCelebs(celebrities))
    }

    function renderAllCelebs(celebrities) {
        celebrities.forEach(celebrity => renderCeleb(celebrity))
    }

    function renderCeleb(celebrity) {
       const li = document.createElement('li')
       li.className = "flex-item"
       li.innerText = celebrity.name
       li.dataset.name = celebrity.name
       li.setAttribute('src', `${celebrity.image}`) 
       li.dataset.occupation = celebrity.occupation
       celebUl.append(li)
    }

    document.addEventListener('click', function(e) {
        if(e.target.className === 'flex-item') {
            console.log(e.target)
            let text = e.target.innerText 
            
           text.fontcolor("green")
        }

    })

    // document.addEventListener('mouseleave', function(e) {
    //     if(e.target.matches('.flex-item')) {
    //         e.target.innerText = e.target.dataset.name
    //     }
    // })



fetchCelebs()
}) // end of DOM Content Loaded