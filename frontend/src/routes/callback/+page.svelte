<script>
    import { onMount } from 'svelte';

    /** @type {import('./$types').PageData} */
    export let data;

    onMount( async () => {
        const urlParams = new URLSearchParams(window.location.search);
        
        const access_token = urlParams.get('code')
        const REDIRECT_URL = window.location.href.split('?')[0]
        
        const res = await fetch(`http://127.0.0.1:8787/get_access_token?code=${access_token}&redirect_url=${REDIRECT_URL}`)
        

    })
</script>