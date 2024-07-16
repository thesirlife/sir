const loginBrainHQUser = async (brainHqId: number): Promise<Object> => {
	const data = await fetch(`/api/brain-hq/user/login`, {
		method: 'POST',
		body: JSON.stringify({
			uid: brainHqId,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	return await data.json();
};

export default loginBrainHQUser;
