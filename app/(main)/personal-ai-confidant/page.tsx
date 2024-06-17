import { auth } from "@/auth";
import { redirect } from "next/navigation";

import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import ChatBot from "@/app/components/ChatBot/ChatBot";

async function getChatSession(userEmail: String) {
	const sessionId = await fetch('http://54.69.12.63/sessions', {
		method: 'POST',
		body: JSON.stringify({
			user_id: userEmail,
		}),
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' +  process.env.CHATBOT_API_KEY,
		},
	})
		.then(async (res) => {
			const response = await res.json();
			return response.session_id;
		})
		.catch((err) => console.log(err));
	return sessionId;
}

const AIChatBot = async () => {
	const session = await auth();
	if (!session?.user.email) {
		redirect(`/`);
	}

	// @TODO :: set this to User Id from session instead of user email
	const sessionId = await getChatSession(session?.user.email);

	return (
		<>
			<div className="bg-navy-primary h-full flex flex-col items-center justify-center">
				<div className="container">
					<div className="py-10 px-4 sm:px-0">
						<Breadcrumbs />
						<h1 className="text-3xl font-bold">Personal AI Confidant</h1>
					</div>
				</div>
			</div>
			<ChatBot sessionId={sessionId} />
		</>
	);
};

export default AIChatBot;
