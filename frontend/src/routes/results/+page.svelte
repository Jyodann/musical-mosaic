<script>
    import { onMount } from 'svelte';
    let songs = []
    let username = ""
    onMount(async () => {
        const access_token = window.sessionStorage.getItem("access_token") ?? ""
        const res = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=17', {
            headers: {
                "Authorization" : "Bearer " + access_token
            }
        })

        const user_res = await fetch('https://api.spotify.com/v1/me', {
            headers: {
                "Authorization" : "Bearer " + access_token
            }
        })

        const res_json = await res.json()
        console.log(res_json)
        const user_res_json = await user_res.json()
        songs = res_json["items"]

        const top_song = songs.shift()
        songs.splice(6, 0, top_song)

        username = user_res_json["display_name"]
        console.log(username)
    })

    function return_url(song_json) {
        console.log(song_json)

        return song_json.album.images[0].url
    }
</script>

<svelte:head>
    <style>

        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Ubuntu&display=swap');
    </style>
</svelte:head>
{#if username !== ''}
<div class="flex flex-col justify-center place-items-center ">
    <div class="w-80 text-center bg-blue-200 font-sans">
        
        
        <div class="grid grid-cols-5">
            {#each songs as song, idx}
                 {#if idx === 6}
                 <img class="row-span-3 col-span-3 object-fill" src={songs[idx].album.images[0].url} alt='Album Art for {songs[idx].name}'>
         
                 {:else}
                 <img  src={songs[idx].album.images[0].url} alt='Album Art for {songs[idx].name}'>
                 {/if}
                 
            {/each}
         </div>

         <div class="h-8 bg-blue-500">
            <div class="justify-between flex items-center h-full px-2 py-1.5">
                <img class="h-full" src='Spotify_Logo_RGB_Black.png'>
                <div class="flex flex-col font-bebas text-right">
                    <p class="text-xs">{username}'s Musical Mosaic</p>
                    <p class="text-xs underline">musical-mosaic.pages.dev</p>
                </div>
                
            </div>
            
         </div>
    </div>
</div>
{/if}


