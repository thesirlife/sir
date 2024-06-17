export async function POST(req) {
	const result = await req.json();
	const { userId } = result;
	console.log('create');
	console.log(result);

	// if (session) {
		try {
			const query = await fetch(`${process.env.BRAIN_HQ_URL}/api/v2/orgs/${process.env.BRAIN_HQ_ORG}/users`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `ApiKey-v2 ${process.env.BRAIN_HQ_API_KEY}`,
				},
				body: JSON.stringify({
					first_name: 'Kelly',
					last_name: 'Bleck',
					login: 'kelly+brain@edgesfirst.co',
					test_user: true,
					user_member_id: userId,
					group_id: process.env.BRAIN_HQ_GROUP_ID
				}),
			});
			const result = await query.json();
			const { uid, status, errs } = result;
			console.log(result);

			if (status === 'created' || errs === 'exists') {
				// @TODO : Update usermeta for BrainHQ Id

				// Log User in to BrainHQ and redirect
				const login = await fetch(`${process.env.BRAIN_HQ_URL}/api/v2/orgs/${process.env.BRAIN_HQ_ORG}/users/${uid}/ssoinfo`, {
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
						Authorization: `ApiKey-v2 ${process.env.BRAIN_HQ_API_KEY}`,
					},
				});
				const result = await login.json();
				const { web } = result;
				if (web) {

				}
			} else if (errs !== 'exists') {
				return Response.json({ error: `Error creating user in BrainHQ - ${errs}` });
			}
		} catch (error) {
			console.error('Request error', error);
			return Response.json({ error: 'Error creating user' });
		}
	// }
}
