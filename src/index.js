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
       li.className = "box"
       li.innerText = celebrity.name
       li.dataset.name = celebrity.name
       li.setAttribute('src', `${celebrity.image}`) 
       li.dataset.occupation = celebrity.occupation
       celebUl.append(li)

       celebrity.posts.forEach( post => renderPost(post))
    }

    function renderPost(post){
        const newsFeed = document.getElementById("news-feed")
        newsFeed.innerHTML += `
        <h1>${post.headline}</h1>
        <img src= ${post.image}>
        <br/>
        <br/>
        <div class="caption"> ${post.content}</div>
        <br/>
        <div id="reaction-table">
            <ul id="reaction-list">
                <li>😍 
                    <span class="like-span">9</span>
                </li>
                <li>😱
                    <span class="like-span">3</span>
                </li>
                <li>😢
                    <span class="like-span">5</span>
                </li>
                <li>😡
                    <span class="like-span">2</span>
                </li>
                <li>💩
                    <span class="like-span">0</span>
                </li>
            </ul>
        </div>
        `
    }

    const clickHandler = () => {
        document.addEventListener("click", function(e){
            if(e.target.matches(".box")){
                //e.target.style.color = 'red'
                fetch()
            }
        })
    }

    // document.addEventListener('mouseover', function(e) {
    //     if(e.target.matches('.flex-item')) {
    //         e.target.innerText = "Hi"
    //     }
    // })

    // document.addEventListener('mouseleave', function(e) {
    //     if(e.target.matches('.flex-item')) {
    //         e.target.innerText = e.target.dataset.name
    //     }
    // })

    /*

    breedUl.addEventListener("click", function(e) {
         e.target.style.color = 'red'
    });

    */



    fetchCelebs()
    clickHandler()
}) // end of DOM Content Loaded