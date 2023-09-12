<script>
    import { goto } from "$app/navigation";
    import { get_link } from "$lib";
    
</script>

<svelte:head>
    <title>Musical Mosaic</title>
</svelte:head>


<div class="flex font-bebas flex-col items-center px-2">
    <p class="text-3xl text-center font-bold w-full">Musical Mosaic: Your Favorites. One Photo.</p>

    <img class="w-96 object-scale-down py-2" src="jordan_mosaic.jpg" alt="Jordan's Musical Mosaic" >

    <p class="font-bebas text-2xl">Create yours here!</p>
    <button on:click={() => { 
        const link = get_link(window.location.origin)
        goto(link)      
    } } class="bg-green-500 font-bebas py-2 rounded-3xl px-24 text-xl">
    Login with Spotify
    </button>
</div>


