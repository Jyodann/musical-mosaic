<script>
    import { goto } from "$app/navigation";
    import { get_link } from "$lib";
    
</script>

<svelte:head>
    <title>Musical Mosaic</title>
</svelte:head>


<div class="flex flex-col place-items-center">
    
    <p class="font-bebas text-4xl pt-6">Musical Mosaic: Your Favorites, all in one photo.</p>
    <p>Musical Mosaic creates a collage of all your favourite Spotify tracks!</p>
    <img class="h-[32rem] object-scale-down py-2" src="jordan_mosaic.jpg" alt="Jordan's Musical Mosaic" >

    <p class="font-bebas text-2xl">Create yours here!</p>
    <button on:click={() => { 
        const link = get_link(window.location.origin)
        goto(link)      
    } } class="bg-green-500 font-bebas py-2 rounded-3xl px-24 text-xl">
    Login with Spotify
    </button>
</div>


