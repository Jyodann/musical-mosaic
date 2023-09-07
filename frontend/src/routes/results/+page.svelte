<script>
    import { onMount } from 'svelte';

    let songs = []
    onMount(async () => {
        const access_token = window.sessionStorage.getItem("access_token") ?? ""
        const res = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=18', {
            headers: {
                "Authorization" : "Bearer " + access_token
            }
        })

        const res_json = await res.json()

        songs = res_json["items"]
        console.log(songs)
    })
</script>

<div class="grid grid-cols-5">
   {#each songs as song, idx}
        {#if idx === 6}
        <img class="row-span-3 col-span-3" src={songs[0].album.images[0].url} alt='Album Art for {songs[0].name}'>

        {:else}
        <img  src={songs[idx+1].album.images[0].url} alt='Album Art for {songs[idx+1].name}'>
        {/if}
        
   {/each}
</div>