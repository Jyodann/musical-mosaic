<script>
    function get_link() {
        
        const CLIENT_ID = '3fd670a228914c1796907aab9d0a965f'
        const REDIRECT_URL = window.location + 'callback'
        const SCOPES = "user-top-read user-read-email user-read-private"

        const finalUrl = new URL(
            "https://accounts.spotify.com/authorize"
        )

        finalUrl.searchParams.append("response_type", "code")
        finalUrl.searchParams.append("client_id", CLIENT_ID)
        finalUrl.searchParams.append("redirect_uri", REDIRECT_URL)
        finalUrl.searchParams.append("scope", SCOPES)
        console.log(REDIRECT_URL)
        return finalUrl.toString()
    }
</script>

<h1 class="text-center">Welcome to Musical Mosaic</h1>
<div class="items-center justify-center flex">
    <button on:click={() => { 
            window.location.replace(get_link())       
        } } class="bg-green-500 m-4 py-8 rounded-full text-4xl px-20">
        Login to Spotify
    </button>
</div>