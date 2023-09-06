import { Router } from 'itty-router';
import { createCors } from 'itty-cors'

const { preflight, corsify } = createCors({
	methods: ['GET', 'POST', 'DELETE'], // GET is included by default... omit this if only using GET
	origins: ['*'],                     // defaults to allow all (most common).  Restrict if needed.
	maxAge: 3600,
	headers: {
	},
  })
// Create a new router
const router = Router();

router
	.all('*', preflight)
	.get('/get_access_token', async (request, environment, _) => {
		const { query } = request
	
		const auth_header = btoa(`${environment.MM_Client_ID}:${environment.MM_Client_Secret}`)
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
	})
	.all('*', () => new Response('404, not found!', { status: 404 }));

export default {
	fetch: (...args) => router
		.handle(...args)
		.catch(err => error(500, err.stack))
		.then(corsify)
};
