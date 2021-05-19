const data = getToken();
const username = document.querySelector('.username')
const userid = document.querySelector('.userid')
const playlist = document.querySelector('.playlist_name');
const track = document.querySelector('.track-name');
// Api  TOKEN
const apitoken = "BQAmllaSwZ-3QAQRqvqdIkkGvn8-khm9RFY1RLdbBriD5dHHM7_JatdUzbQIGJJawpva5Hn7bIRZAkCVPA2uYHEc821coQy7uLkawXkvj0b4HWuTIvdt5bHoESNx7wZi17sW-4zh-IzBn_PCT_4vwxZuTiTzQpI3xqn2gOQQ9DwKGkxvEu6akV43UbaBb8er96ZsXf3DUsTLNq6opEm680KeRPxw6McOcKCvtJ-uy9DQwEVFxCs6U3nHVhBfcY3JOPt6cH-c56fEHGj81i33lpGnTErHOLwf92VZqevRsBlY"
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
