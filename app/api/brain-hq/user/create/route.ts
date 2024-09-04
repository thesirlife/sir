import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
	const result = await req.json();
	const { userId, email, firstName } = result;

	try {
		// Just trying to create the user, and if they already exist log them in
		// Saves a call to our DB for the userId...
		console.log('BrainHQ URL: ', `${process.env.BRAIN_HQ_URL}/api/v2/orgs/${process.env.BRAIN_HQ_ORG}/users`);
		console.log('BrainHQ User Email: ', email);
		const query = await fetch(`${process.env.BRAIN_HQ_URL}/api/v2/orgs/${process.env.BRAIN_HQ_ORG}/users`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `ApiKey-v2 ${process.env.BRAIN_HQ_API_KEY}`,
			},
			body: JSON.stringify({
				first_name: firstName,
				last_name: '',
				login: email,
				test_user: true,
				user_member_id: userId,
				group_id: process.env.BRAIN_HQ_GROUP_ID
			}),
		});
		const result = await query.json();
		console.log('BrainHQ Usesr Lookup Result: ', result);
		const { uid, status, joined, errs, error } = result;

		if ((status === 'created' && joined !== false) || status === 'existing' || errs === 'exists') {
			// Log User in to BrainHQ and redirect
			const login = await fetch(`${process.env.BRAIN_HQ_URL}/api/v2/orgs/${process.env.BRAIN_HQ_ORG}/users/${uid}/ssoinfo`, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `ApiKey-v2 ${process.env.BRAIN_HQ_API_KEY}`,
				},
			});

			const result = await login.json();
			console.log('BrainHQ Login result: ', result);
			return Response.json(result);
		} else if (joined === false) {
			const err = error === 'no_open_seats' ? 'Please contact SIR at hello@thesirlife.com regarding BrainHQ licenses.' : 'There was an error with BrainHQ - please contact SIR at hello@thesirlife.com.';
			console.log('BrainHQ Error: ', err);
			return Response.json({ error: err });
		}
	} catch (error) {
		console.error('Request error', error);
		return Response.json({ error: 'Error creating user' });
	}
}
