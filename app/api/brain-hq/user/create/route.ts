import patchUser from "@/app/data/patchUser";
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
	const result = await req.json();
	const { userId, email, firstName } = result;

	try {
		console.log(`${process.env.BRAIN_HQ_URL}/api/v2/orgs/${process.env.BRAIN_HQ_ORG}/users`);
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
		const { uid, status, joined, errs, error } = result;
		console.log('create user');
		console.log(result);

		if ((status === 'created' && joined !== false) || errs === 'exists') {
			// @TODO : Update usermeta for BrainHQ Id
			const update = patchUser({
				id: userId,
				property: 'user_meta_brain_hq_user_id',
				value: uid,
			});
			console.log('update');
			console.log(update);

			// Log User in to BrainHQ and redirect
			const login = await fetch(`${process.env.BRAIN_HQ_URL}/api/v2/orgs/${process.env.BRAIN_HQ_ORG}/users/${uid}/ssoinfo`, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `ApiKey-v2 ${process.env.BRAIN_HQ_API_KEY}`,
				},
			});
			return await login.json();
		} else if (joined === false) {
			const err = error === 'no_open_seats' ? 'Please contact SIR at hello@thesirlife.com regarding BrainHQ licenses.' : 'There was an error with BrainHQ - please contact SIR at hello@thesirlife.com.';
			return Response.json({ error: err });
		}
	} catch (error) {
		console.error('Request error', error);
		return Response.json({ error: 'Error creating user' });
	}
}
