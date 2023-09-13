

<script>
    import { onMount } from 'svelte';
    import html2canvas from 'html2canvas';
    import { stored_token } from '../../stores';
    import { goto } from '$app/navigation';
    import { get_link } from '$lib';
    let songs = []
    let orignal_song_list = []
    let username = ""
    onMount(async () => {
        
        let access_token;

        stored_token.subscribe(
            (value) => {
                access_token = value;
            }
        )

        if (access_token === '') {
            const link = get_link(window.location.origin)
            goto(link)
        }

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
        
        const user_res_json = await user_res.json()
        
        orignal_song_list = res_json["items"]
        
        songs = structuredClone(orignal_song_list)

        const top_song = songs.shift()
        
        songs.splice(6, 0, top_song)

        username = user_res_json["display_name"]
    })

    function return_url(song_json) {
        
        return song_json.album.images[0].url
    }

    function render_image() {
        const mosaic = document.getElementById('mosaic')
        html2canvas(mosaic, {
            useCORS: true,
            scrollX: 0,
            scrollY: 0,
            scale: 6,
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
    <title>
        Music Mosaic Results
    </title>
    
</svelte:head>
{#if username !== ''}
<div class="flex flex-col place-items-center" >
    <div class="flex flex-col md:w-[40rem] place-items-center">
        <p class="font-bebas text-4xl pt-2">Your favourites, all in one photo:</p>
        <div class="w-80">
            
        </div>
        <div class="w-80 bg-purple-100 font-sans" id="mosaic">
            <div class="h-6 bg-purple-200 flex justify-center items-center px-2">
                <p class="text-lg font-bebas tracking-normal">{username}'s Musical Mosaic</p>
             </div>
            
            <div class="grid grid-cols-5">
                {#each songs as song, idx}
    
                    {#if idx === 6}
                        <img class="row-span-3 col-span-3 object-fill" src={return_url(song)} alt='Album Art for {song.name}'>
             
                     {:else}
                     <img  src={return_url(song)} alt='Album Art for {song.name}'>
                     {/if}
                     
                {/each}
             </div>
             
             <div class="h-6 bg-purple-400 flex justify-between items-center px-2">
                <img class="h-full py-1" src='Spotify_Logo_RGB_Black.png' alt="Spotify Logo">
                <p class="font-bebas tracking-wider text-sm">{window.location.host}</p>
             </div>
        </div>
        <div class="w-80 flex justify-between py-2">
            <button class="rounded bg-slate-200 p-4 w-full" on:click={render_image}>Download Image</button>
        </div>
        
        <p class="font-bebas text-center text-2xl">Featured Tracks</p>
        <div class="w-80 font-bebas h-40 overflow-auto">
            
            
                {#each orignal_song_list as song}
                <div class="p-2 overflow-auto">
                    <div class="text-center bg-purple-300 p-2 rounded-lg">
                        {song.name} by {song.artists.map((x) => x.name).join(', ')} 
                    </div>
                </div>
                
                {/each}
           
          
       
        </div>

    </div>
   
    
    
</div>




{/if}


