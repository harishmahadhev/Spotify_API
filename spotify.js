const data = getToken();
const username = document.querySelector('.username')
const userid = document.querySelector('.userid')
const playlist = document.querySelector('.playlist_name');
const track = document.querySelector('.track-name');
// Api  TOKEN
const apitoken = "BQC1OZBGV3mulN2MMi25H_6SK5_3-SYU5zmL5OIesJ5N0neE2bz1dGg21WekDkZprHN8aDiFQ5DaUYRUxdYwmUXQF1lDf4xoXU5qhnTpgm_xR2oV9bVOZt6wsofjXxjBAXoNPWE-F3uV9K0pjrWjGeGiJ0I6M7e7haxECypHsFcky0xB2DYIskrwxSzsbIVSY2ea6cF476T61feVe5zwgttBzhySEGnQqkM4kj5qRFL0wQyvcPcj59e3536GNd-CHaa_UvSU63H6QTVw27YzwS8wMm16kQn1_xWPjhN-CqIO"
async function getToken() {
    const clientId = "bd77a8e7515d4b34b9e99e2188b35027";
    const clientSecret = "af7aa1a747be4435a8a5afb58e9ba752";
    try {
        const result = fetch("https://accounts.spotify.com/api/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Authorization': "Basic " + btoa(clientId + ":" + clientSecret),
                },
                body: "grant_type=client_credentials",
            })
            .then(result => result.json())
            .then(result => result)
        const data = result.then(result => result);

        return data

    } catch (error) {
        console.log(error);
    }
}
getme();

// Calling User Profile 

async function getme() {
    try {
        fetch('https://api.spotify.com/v1/me', {
                method: 'GET',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apitoken}`,
                },
            })
            .then(result => result.json())

        .then(result => {
            username.innerHTML += result.display_name;
            userid.innerHTML += result.id;
            console.log(result);
            return result.id
        })

        .then(result => getPlaylist(result)) // Getting Playlists of user by user_id
    } catch (error) {
        console.log(error);
    }
}


// Getting Playlist 


async function getPlaylist(id) {

    try {
        const result = fetch(`https://api.spotify.com/v1/users/${id}/playlists`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${apitoken}`,
                },
            })
            .then(result => result.json())
            .then(result => result)
        const items = await result.then(result => { return result.items });

        items.forEach((e) => {
            const list = document.createElement('li')

            list.innerHTML = e.name
            playlist.append(list);
        })

        items.forEach(e => getItem(e.id, e.name)) //Getting Items of Playlist using Playlist id
    } catch (error) {
        console.log(error);
    }
}


// Getting tracks from Playlist

async function getItem(id, name) {

    try {
        const result = fetch(`https://api.spotify.com/v1/playlists/${id}/tracks?market=ES&fields=items(added_by.id%2Ctrack(name%2Chref%2Calbum(name%2Chref)))&limit=10&offset=5`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${apitoken}`,
                },
            })
            .then(result => result.json())
            .then(result => result)
        const items = await result.then(result => result.items)
        const tracks = items.map(e => e.track);
        const names = items.map(e => e.track.name);
        const uris = items.map(e => e.track.href);
        const Playlist = document.createElement('ul');
        Playlist.className = "playlist-name"
        Playlist.innerHTML = name;
        track.append(Playlist)
        names.forEach(e => {
            const list = document.createElement('li');
            list.innerHTML = e;
            Playlist.append(list);
            // console.log(e)
        })
    } catch (error) {
        console.log(error);
    }
}

// adding Playlist item

async function addItem(id) {
    try {
        const result = fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks?uris=spotify%3Atrack%${track_id}%2Cspotify%3Atrack%3A${track_id}`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${apitoken}`,
                },
            })
            .then(result => result.json())
            .then(result => result)
        const items = await result.then(result => result.items)
        const tracks = items.map(e => e.track);
        console.log(tracks)
    } catch (error) {
        console.log(error);
    }
}