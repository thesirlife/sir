import { OpenAIStream, StreamingTextResponse } from 'ai';
// import { getServerSession } from 'next-auth/next';

// import { authOptions } from '@/api/auth/[...nextauth]';

export async function POST(req) {
	// const session = await getServerSession(authOptions);
	// const { userId } = session.user;

	// if (session) {

		// Extract the `messages` and `context` from the body of the request
		const result = await req.json();
		console.log(result);

		const { messages, context, sessionId } = result;
		const lastInput = messages.slice(-1)[0].content;
		console.log(lastInput);

		let response = await fetch(`http://54.69.12.63/message`, {
			method: 'POST',
			headers: {
				accept: 'application/json',
				'content-type': 'application/json',
				Authorization: 'Bearer ' + process.env.PROXYCURL_API_KEY,
			},
			body: JSON.stringify({
				session_id: sessionId,
				stream: true,
				message: lastInput,
			}),
		});
		console.log(response.json());

		// Convert the response into a friendly text-stream
		const stream = OpenAIStream(response);

		// Respond with the stream
		return new StreamingTextResponse(stream);
	// }
}
