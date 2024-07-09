export async function POST(req) {
	const result = await req.json();
	const { uid } = result;
	console.log('SSO User');
	console.log(uid);
	try {
		// Log User in to BrainHQ and redirect
		console.log(`${process.env.BRAIN_HQ_URL}/api/v2/orgs/${process.env.BRAIN_HQ_ORG}/users/${uid}/ssoinfo`);
		const login = await fetch(`${process.env.BRAIN_HQ_URL}/api/v2/orgs/${process.env.BRAIN_HQ_ORG}/users/${uid}/ssoinfo`, {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `ApiKey-v2 ${process.env.BRAIN_HQ_API_KEY}`,
			},
		});
		const result = await login.json();
		console.log(result);
		return Response.json({ result });
	} catch (error) {
		console.error('Request error', error);
		return Response.json({ error: 'Error creating user' });
	}
}
