// place files you want to import through the `$lib` alias in this folder.
export function get_link(base_url) {
    
    const CLIENT_ID = '3fd670a228914c1796907aab9d0a965f'
    const REDIRECT_URL = base_url + '/callback'

    console.log(REDIRECT_URL)
    const SCOPES = "user-top-read"

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