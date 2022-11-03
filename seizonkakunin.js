{
    function getCookieValue(key) {
        const cookies = document.cookie.split(';');
        for (let cookie = 0; cookie < cookies.length; cookie++) {
            var cookiesArray = cookies[cookie].split('=');
            if (cookiesArray[0].trim() == key.trim()) {
                return cookiesArray[1];
            }
        }
        return '';
    }
    let token = getCookieValue("scratchcsrftoken");
    let data = new Date();
    let day = `${data.getFullYear()}/${data.getMonth()+1}/${data.getDate()} ${data.getHours()}:${data.getMinutes()}`;
    let aboutMe = ``;
    fetch("https://scratch.mit.edu/session/", {
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then(response => response.json()).then(users => {
        let username = users["user"]["username"];
        fetch(`https://api.scratch.mit.edu/users/${username}/`).then(response => response.json()).then(aboutaboutme => {
            let aboutme = aboutaboutme["profile"]["bio"].split("\n");
            let i = 0;
            for (i = 0; i < aboutme.length - 1; i++) {
                if (aboutme[i].includes("生存確認")) {
                    aboutme[i] = `生存確認：${day}`;
                    aboutMe += aboutme[i] + "\n";
                } else {
                    aboutMe += aboutme[i] + "\n";
                }
            }
            aboutMe += aboutme[i];
            fetch(`https://scratch.mit.edu/site-api/users/all/${username}/`, {
                method: "PUT",
                body: JSON.stringify({
                    bio: aboutMe
                }),
                headers: {
                    'X-CSRFToken': token,
                    "x-requested-with": "XMLHttpRequest"
                }
            });
        });
    })
}
