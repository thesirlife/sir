// import { getServerSession } from 'next-auth';
// import { authOptions } from '../../api/auth/[...nextauth]';

import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import ChatBot from "@/app/components/ChatBot/ChatBot";

async function getChatSession(user: object) {
	const sessionId = await fetch('http://54.69.12.63/sessions', {
		method: 'POST',
		body: JSON.stringify({
			user_id: user.userId,
		}),
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + process.env.PROXYCURL_API_KEY,
		},
	})
		.then(async (res) => {
			const response = await res.json();
			console.log(response.session_id);
			return response.session_id;
		})
		.catch((err) => console.log(err));
	console.log(sessionId);
	return sessionId;
}

const AIChatBot = async () => {
	// const session = await getServerSession(authOptions);
	// const chatId = getChatSession(session.user);
	const user = {
		userId: 10,
	};
	const sessionId = await getChatSession(user);
	console.log(sessionId);

  return (
		<>
			<div className="bg-navy-primary h-full flex flex-col items-center justify-center">
				<div className="container">
					<div className="py-10">
						<Breadcrumbs />
						<h1 className="text-3xl font-bold">Personal AI Confidant</h1>
					</div>
				</div>
				<ChatBot sessionId={sessionId} />
			</div>
		</>
  );
};

export default AIChatBot;
