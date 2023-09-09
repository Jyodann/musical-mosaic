<script>
    import { onMount } from 'svelte';
    import html2canvas from 'html2canvas';
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

    function render_image() {
        const mosaic = document.getElementById('mosaic')
        html2canvas(mosaic, {
            useCORS: true,
            scrollX: 0,
            scrollY: 0,
            scale: 1,
            removeContainer: true,
            windowHeight: 320,
            windowWidth: 368
        }).then(
            function(canvas) {
                const uri = canvas.toDataURL("image/jpeg")

                const link = document.createElement('a')

                if (typeof link.download === 'string') {
                    link.href = uri;
                    link.download = 'Mosaic.jpeg'

                    //Firefox requires the link to be in the body
                    document.body.appendChild(link);

                    link.click()

                    document.body.removeChild(link);
                } else {
                    window.open(uri)
                }
            }
        )
    }
</script>

<svelte:head>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Ubuntu&display=swap');
    </style>
</svelte:head>
{#if username !== ''}
<div class="flex flex-col justify-center place-items-center" >
    <div class="w-80 text-center bg-purple-300 font-sans" id="mosaic">
        <div class="h-6 bg-purple-400 flex justify-center items-center px-2">
            <p class="text-lg font-bebas">{username}'s Musical Mosaic</p>
         </div>
        
        <div class="grid grid-cols-5 p-1">
            {#each songs as song, idx}
                 {#if idx === 6}
                 <img class="row-span-3 col-span-3 object-fill" src={songs[idx].album.images[0].url} alt='Album Art for {songs[idx].name}'>
         
                 {:else}
                 <img  src={songs[idx].album.images[0].url} alt='Album Art for {songs[idx].name}'>
                 {/if}
                 
            {/each}
         </div>

         <div class="h-6 bg-purple-400 flex justify-between items-center px-2">
            <img class="h-full py-1" src='Spotify_Logo_RGB_Black.png'>
            <p class="text-xs font-bebas">{window.location.host}</p>
         </div>
    </div>

    <button class="rounded bg-slate-200 p-4 m-2" on:click={render_image}>Download Image</button>
</div>


{/if}


