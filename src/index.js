console.log("IS THIS THING ON???")

document.addEventListener('DOMContentLoaded', () => {
    CELEB_URL = "http://localhost:3000/celebrities"
    POST_URL = "http://localhost:3000/posts"
    USER_URL = "http://localhost:3000/users"
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
    } 


    function renderPost(post){
        const newsFeed = document.getElementById("news-feed")
        newsFeed.innerHTML += `
        <div class="post-div" id=${post.id}>
        <h1>${post.headline}</h1>
        <img src= ${post.image}>
        <br/>
        <br/>
        <div class="caption"> ${post.content}</div>
        <br/>
        <div id="reaction-table">
            <ul id="reaction-list">
                <li id="joy">😍 
                    <span class="like-span">${post.joy}</span>
                </li>
                <li id="shock">😱
                    <span class="like-span">${post.shock}</span>
                </li>
                <li id="sad">😢
                    <span class="like-span">${post.sad}</span>
                </li>
                <li id="anger">😡
                    <span class="like-span">${post.anger}</span>
                </li>
                <li id="poop">💩
                    <span class="like-span">${post.poop}</span>
                </li>
            </ul>
        </div>
    </div>
    <br/>
    <br/>
     `

     
    }

    const clickHandler = () => {
        document.addEventListener("click", function(e){
            if(e.target.matches(".box")){
                const thisCeleb = e.target
                thisCeleb.className = 'selected-box'  //changed classname from box to selected-box so we can add some new properties ooooo
                 
                fetch(`${CELEB_URL}/${thisCeleb.dataset.id}`)
                .then(res => res.json())
                .then(celebrityPost => renderPosts(celebrityPost.posts))

                const renderPosts = (PostsArray) => {
                    PostsArray.forEach(post => {
                        renderPost(post)
                    })
                }
            }
            if(e.target.matches("#joy")){
                const joyButton = e.target 
                const joySpan = joyButton.querySelector("span")
                const newJoyNumber = parseInt(joySpan.textContent, 10) + 1
                joySpan.textContent = newJoyNumber

                emojisplosion({ //this function is from the emoji library 
                    className: "my-emoji-styles", //we had to add the class name to get the style attributes 
                    emojiCount: 100, //number of emojis we want exploded 
                    emojis: ["😍"], //type of emoji we want 
                  });

                const id = joyButton.closest("div").parentElement.id

                fetch(`${POST_URL}/${id}`, {
                    method: "PATCH",
                    headers: {
                      "content-type": "application/json",
                      "accept": "application/json"
                    },
                    body: JSON.stringify({ joy: newJoyNumber })
                  })
            }

            if(e.target.matches("#shock")){
                const shockButton = e.target 
                const shockSpan = shockButton.querySelector("span")
                const newShockNumber = parseInt(shockSpan.textContent, 10) + 1
                shockSpan.textContent = newShockNumber

                emojisplosion({
                    className: "my-emoji-styles",
                    emojiCount: 100,
                    emojis: ["😱"],
                });

                const id = shockButton.closest("div").parentElement.id

                fetch(`${POST_URL}/${id}`, {
                    method: "PATCH",
                    headers: {
                      "content-type": "application/json",
                      "accept": "application/json"
                    },
                    body: JSON.stringify({ shock: newShockNumber })
                  })
            }

            if(e.target.matches("#sad")){
                const sadButton = e.target 
                const sadSpan = sadButton.querySelector("span")
                const newSadNumber = parseInt(sadSpan.textContent, 10) + 1
                sadSpan.textContent = newSadNumber

                emojisplosion({
                    className: "my-emoji-styles",
                    emojiCount: 100,
                    emojis: ["😢"],
                });


                const id = sadButton.closest("div").parentElement.id

                fetch(`${POST_URL}/${id}`, {
                    method: "PATCH",
                    headers: {
                      "content-type": "application/json",
                      "accept": "application/json"
                    },
                    body: JSON.stringify({ sad: newSadNumber })
                  })
            }

            if(e.target.matches("#anger")){
                const angerButton = e.target 
                const angerSpan = angerButton.querySelector("span")
                const newAngerNumber = parseInt(angerSpan.textContent, 10) + 1
                angerSpan.textContent = newAngerNumber

                emojisplosion({
                    className: "my-emoji-styles",
                    emojiCount: 100,
                    emojis: ["😡"],
                });

                const id = angerButton.closest("div").parentElement.id

                fetch(`${POST_URL}/${id}`, {
                    method: "PATCH",
                    headers: {
                      "content-type": "application/json",
                      "accept": "application/json"
                    },
                    body: JSON.stringify({ anger: newAngerNumber })
                  })
            }

            if(e.target.matches("#poop")){
                const poopButton = e.target 
                const poopSpan = poopButton.querySelector("span")
                const newPoopNumber = parseInt(poopSpan.textContent, 10) + 1
                poopSpan.textContent = newPoopNumber

                emojisplosion({
                    className: "my-emoji-styles",
                    emojiCount: 100,
                    emojis: ["💩"],
                });

                const id = poopButton.closest("div").parentElement.id

                fetch(`${POST_URL}/${id}`, {
                    method: "PATCH",
                    headers: {
                      "content-type": "application/json",
                      "accept": "application/json"
                    },
                    body: JSON.stringify({ poop: newPoopNumber })
                  })
            }


        })
    } // end of clickHandler function

    const followHandler = () => {
      const followButton = document.getElementById('follow-button')
      followButton.addEventListener('click', function(e) {
          const celebrityNames = document.querySelectorAll('.selected-box') 
          celebrityNames.forEach(li => {
                const myList = document.getElementById("celebrity-followings-list")
                myList.innerHTML += `
                <li>
                <h4>${li.textContent} <button id="unfollow">Unfollow</button>
                </li>`

                
                li.className = 'box' //returns the li tag to its original class

                fetch("http://localhost:3000/follows", {
                    method: "POST",
                    headers: {
                      "content-type": "application/json",
                      "accept": "application/json"
                    },
                    body: JSON.stringify({user_id: 1, celebrity_id: li.dataset.id  })
                  })
                //   .then(response => response.json())
                //   .then(follow => )
                
                })

            })
        } // end of follow handler 


        //event listener 
        //fetch 
        //method to update the dom 
        


        
        clickHandler() //had to switch order of executions !!
        followHandler()
        fetchCelebs()
    
}) // end of DOM Content Loaded