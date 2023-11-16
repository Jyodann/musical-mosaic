<script>
    export let songs = [];
    export let username = "";

    function return_url(song_json) {
        return song_json.album.images[0].url;
    }
</script>

<div class="w-80 font-sans" id="mosaic">
    <div
        class="h-6 flex justify-center items-center px-2 bg-purple-300"
    >
        <p
            class="text-lg font-bebas tracking-normal"
        >
            {username}'s Musical Mosaic
        </p>
    </div>

    <div class="grid grid-cols-5">
        {#each songs as song, idx}
            {#if idx === 6}
                <img
                    class="row-span-3 col-span-3 object-fill"
                    src={return_url(song)}
                    alt="Album Art for {song.name}"
                />
            {:else}
                <img src={return_url(song)} alt="Album Art for {song.name}" />
            {/if}
        {/each}
    </div>

    <div
        class="h-6 flex justify-between items-center px-2 bg-purple-400"
    >
        <img
            class="h-full py-1"
            src="spot_logo_black.png"
            alt="Spotify Logo"
        />
        <p class="font-bebas tracking-wider text-sm">
            {window.location.host}
        </p>
    </div>
</div>
