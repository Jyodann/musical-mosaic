<script>
    import { onMount } from 'svelte';
    let is_error = false
    let token = {}
    onMount( async () => {
        const urlParams = new URLSearchParams(window.location.search);
        
        const access_token = urlParams.get('code')
        const REDIRECT_URL = window.location.href.split('?')[0]
        
        const res = await fetch(`https://musical-mosaic-backend.jyodann.workers.dev/get_access_token?code=${access_token}&redirect_url=${REDIRECT_URL}`)
        
        token = await res.json()

        is_error = token.hasOwnProperty('error')

        if (!is_error) 
        {
            window.sessionStorage.setItem("access_token", token["access_token"])
            window.location.replace('/results')
        }
    })
</script>

{#if is_error}
    <p>Error Logging in: {token["error_description"]}</p>
{:else}
    <p>Managed to log in, redirecting...</p>
{/if}
