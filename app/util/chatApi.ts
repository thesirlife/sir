export async function fetchResponse(message, session_id) {
	console.log(session_id);
	try {
		const response = await fetch(`http://54.69.12.63/message`, {
				method: 'POST',
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Content-Type': 'application/json',
					Authorization: 'Bearer WkYwJlK8Cv1vR5KwYnLRBCJrVRiTQNCT',
				},
				body: JSON.stringify({
					session_id,
					stream: true,
					message,
				}),
			});

		return chatCompletion.choices[0].message.content;
	} catch (error) {
		console.error('Error calling ChatGPT API:', error);
		return 'There was an error processing your request. Please try again later.';
	}
}