"use client";

import { fetchResponse } from '../../util/chatApi';

import {
	Alert,
	Avatar,
	Button,
	Box,
	Card,
	CardActionArea,
	CardContent,
	CircularProgress,
	LinearProgress,
	Divider,
	Drawer,
	IconButton,
	Input,
	Snackbar,
	Stack,
	Toolbar,
	Typography,
} from "@mui/material";
import { useChat } from '@ai-sdk/react';
import { useState } from 'react';

// this will change eventually when we get the response from the server
type ChatBot = {
	sessionId: string;
};
//

const ChatBot = ({ sessionId }: ChatBot) => {
	const [loading, setIsLoading] = useState(false);
	const [messages, setMessages] = useState([]);
	const [latestMessage, setLatestMessage] = useState('');

	const [input, setInput] = useState('');

	// const { messages, input, handleInputChange, handleSubmit } = useChat({
	// 	id: sessionId,
	// 	body: {
	// 		session_id: sessionId,
	// 	},
	// 	onResponse: () => {
	// 		setIsLoading(false);
	// 	},
	// });

	const handleSendMessage = async () => {
		const trimmedText = input.trim();
		if (!trimmedText) return;

		const userMessage = {
				id: messages.length + 1,
				text: trimmedText,
				sender: 'You'
		};
		const newMessages = [...messages, userMessage];
		setMessages(newMessages);
		setInput('');
		setIsLoading(true);

		const apiResponse = await fetch('http://54.69.12.63/message', {
			method: "POST",
			headers: {
				"Content-Type": "text/event-stream",
				'Access-Control-Allow-Origin': '*',
				Authorization: 'Bearer WkYwJlK8Cv1vR5KwYnLRBCJrVRiTQNCT',
			},
			body: JSON.stringify({
				session_id: sessionId,
				stream: true,
				message: trimmedText,
			}),
		});

		if (!apiResponse.body) return;

		// To decode incoming data as a string
		const reader = apiResponse.body
			.pipeThrough(new TextDecoderStream())
			.getReader();

		let incomingMessage = "";

		while (true) {
			const { value, done } = await reader.read();
			if (done) {
				// Insert the response received into the messages state
				setMessages((messages) => [
					...messages,
					{ role: "assistant", content: incomingMessage },
				]);
				// Reset the latest message's state received
				setLatestMessage("");
				break;
			}
			if (value) {
				// Do something
				console.log(value);
				// Append the incoming data to latest message's value
        incomingMessage += value;
        setLatestMessage(incomingMessage);
			}
		}

		// const name = sessionStorage.getItem('name');
		// const responseText = await fetchResponse(trimmedText, sessionId);

		// const botMessage = {
		// 		id: newMessages.length + 1,
		// 		text: responseText,
		// 		sender: 'Mindful Bot'
		// };

		// const updatedMessages = [...newMessages, botMessage];
		// setMessages(updatedMessages);

		// // if (typeof window !== 'undefined') {
		// // 		sessionStorage.setItem(chatHistoryVersion, JSON.stringify(updatedMessages));
		// // }
		// setIsLoading(false);
};

	return (
		<>
			<div className="max-w-[662px] w-full">
				{messages &&
					messages.length > 0 &&
					messages.map((m, index) => (
						<div
							key={index}
							style={{
								borderBottom: `1px solid #eeeeee`,
								display: 'flex',
								gap: '1rem',
								marginLeft: m.role !== 'user' ? 'auto' : 0,
								padding: '1rem',
							}}
						>
							<Avatar
								sx={{ height: 25, width: 25 }}
								// src={m.role === 'user' ? avatarImg : '/images/default-profile.jpg'}
							>
								{/* {chat?.user.firstName ? Array.from(chat.user.firstName)[0] : null} */}
							</Avatar>
							<Box>
								<Typography
									variant="body1"
									sx={{
										fontWeight: 500,
										// mb: cyberTheme.spacing(2),
									}}
								>
									{m.role === 'user' ? 'You' : 'AI'}
								</Typography>
								<Typography variant="body1" style={{ marginTop: 0, whiteSpace: 'pre-wrap' }}>
									{m.content ? m.content : m.ui}
								</Typography>
							</Box>
						</div>
					))}

				{loading ? (
					<Box
						sx={{
							// px: cyberTheme.spacing(4),
							// py: cyberTheme.spacing(4),
							width: '100px',
						}}
					>
						<LinearProgress />
					</Box>
				) : null}

				<Box
					sx={{
						bgcolor: '#e6eaee',
						bottom: 0,
						// px: cyberTheme.spacing(2),
						// pb: cyberTheme.spacing(4),
						// pt: cyberTheme.spacing(2),
						position: 'sticky',
					}}
				>
					{/* <form
						onSubmit={(e) => handleSubmit(e)}
						style={{
							alignItems: 'center',
							display: 'flex',
						}}
					> */}
						<Input
							placeholder="Ask any question..."
							value={input}
							// onChange={handleInputChange}
							onChange={(e) => setInput(e.target.value)}
							disableUnderline={true}
							style={{
								backgroundColor: 'transparent',
								// border: `1px solid ${cyberTheme.palette.background.dark}`,
								borderRadius: '4px',
								marginLeft: '5px',
								// padding: cyberTheme.spacing(2, 2, 2, 2),
								// transition: cyberTheme.transitions.create('width'),
								width: '100%',
							}}
							onKeyDown={event => event.key === 'Enter' ? handleSendMessage() : null}
						/>
					{/* </form> */}
				</Box>

				<div id="anchor" style={{ overflowAnchor: 'auto', height: '1px' }}></div>
			</div>
		</>
	);
};

export default ChatBot;
