<script>
    import { goto } from "$app/navigation";
    import { get_link } from "$lib";
    
</script>

<svelte:head>
    <title>Musical Mosaic</title>
</svelte:head>


<div class="flex flex-col font-bebas items-center px-2">
    <div class="flex flex-col md:w-[40rem] items-center">
        <p class="text-4xl pt-2">Musical Mosaic</p>
        <p class="text-xl">Your Favorites. One Photo.</p>
        <img class="w-96 object-scale-down py-2" src="jordan_mosaic.jpg" alt="Jordan's Musical Mosaic" >
    
        <p class="font-bebas text-2xl">Create yours here!</p>
        <button on:click={() => { 
            const link = get_link(window.location.origin)
            goto(link)      
        } } class="bg-green-500 font-bebas py-2 rounded-3xl px-24 text-xl">
        Login with Spotify
        </button>
    </div>
    
</div>


