<script>
    import { onMount } from 'svelte';
    import { stored_token } from '../../stores';
    import { goto } from '$app/navigation';
    let is_error = false
    let token_json = {}
    onMount( async () => {
        const urlParams = new URLSearchParams(window.location.search);
        
        const redirect_token = urlParams.get('code')
        const REDIRECT_URL = window.location.href.split('?')[0]
        
        const res = await fetch(`https://musical-mosaic-backend.jyodann.workers.dev/get_access_token?code=${redirect_token}&redirect_url=${REDIRECT_URL}`)
        
        token_json = await res.json()

        is_error = token_json.hasOwnProperty('error')

        if (!is_error) 
        {
            stored_token.set(token_json['access_token'])
            goto('/results')
        }
    })
</script>

{#if is_error}
    <p>Error Logging in: {token["error_description"]}</p>
{:else}
    <p>Managed to log in, redirecting...</p>
{/if}
