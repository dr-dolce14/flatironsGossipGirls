console.log("IS THIS THING ON???")

document.addEventListener('DOMContentLoaded', () => {
    CELEB_URL = "http://localhost:3000/celebrities"
    POST_URL = "http://localhost:3000/posts"
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
       li.dataset.id = celebrity.id
       celebUl.append(li)
       
    //    celebrity.posts.forEach( post => renderPost(post))
    } // <- take this out of here and put it in our clickhandler if statement 

    function renderPost(post){
        // console.log(post)
        const newsFeed = document.getElementById("news-feed")
        // newsFeed.innerHTML = ''
        newsFeed.innerHTML += `
        <div class="post-div" id=${post.celebrity_id}>
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
    </div
        `
        // console.log(post)
    }

    

    const clickHandler = () => {
        document.addEventListener("click", function(e){
            if(e.target.matches(".box")){
                const thisCeleb = e.target
                thisCeleb.style.color = 'red'
                fetch(POST_URL)
                .then(res => res.json())
                .then(celebrityPost => {
                    celebrityPost.forEach 
                // const postDiv = document.querySelectorAll('.post-div')
                // console.log(postDiv)
                // postDiv.forEach(post => {
                //     console.log(post)
                //     if (thisCeleb.dataset.id === post.id) {
                //         renderPost(post)
                //         console.log(thisCeleb)
    
                //     } 
                // })
             
            }
        })
    }

    // make a separate fetch request to the specific id of the celebrity we're clicking



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