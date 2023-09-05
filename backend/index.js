import { Router } from 'itty-router';
// Create a new router
const router = Router();

router.get('/get_access_token', async (request) => {
	const { query } = request

	const auth_header = btoa(`${MM_Client_ID}:${MM_Client_Secret}`)
	const data = new URLSearchParams()

	data.append("grant_type", "authorization_code")
	data.append("code", query["code"])
	data.append("redirect_uri", query["redirect_url"])

	const response = await fetch("https://accounts.spotify.com/api/token", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"Authorization": `Basic ${auth_header}`
		},	
		body: data.toString()
	});

	return response
});

router.all('*', () => new Response('404, not found!', { status: 404 }));

export default {
	fetch: router.handle,
};
