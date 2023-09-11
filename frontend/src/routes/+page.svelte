<script>
    import { goto } from "$app/navigation";
    import { get_link } from "$lib";
    
</script>

<svelte:head>
    <title>Musical Mosaic</title>
    
</svelte:head>
<h1 class="text-center">Welcome to Musical Mosaic</h1>
<div class="items-center justify-center flex">
    <button on:click={() => { 
            const link = get_link(window.location.origin)
            goto(link)      
        } } class="bg-green-500 m-4 py-8 rounded-full text-4xl px-20">
        Login to Spotify
    </button>
</div>