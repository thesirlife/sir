"use client";

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
	console.log(sessionId);

	const { messages, input, append, handleInputChange, handleSubmit } = useChat({
		id: sessionId,
		body: {
			sessionId,
		},
		// initialMessages: chat && chat.messages ? (Object.keys(chat?.messages).length !== 0 ? chat.messages : []) : [],
		onResponse: () => {
			setIsLoading(false);
		},
	});
	console.log(messages);

  return (
		<>
			<div className="max-w-[662px] w-full">
				{messages &&
					messages.length > 0 &&
					messages.map((m, index) => (
						<div
							key={index}
							// style={{
							// 	borderBottom: `1px solid ${cyberTheme.palette.background.dark}`,
							// 	display: 'flex',
							// 	gap: '1rem',
							// 	marginLeft: m.role !== 'user' ? 'auto' : 0,
							// 	padding: cyberTheme.spacing(3),
							// }}
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
									{m.role === 'user' ? 'You' : 'CoPilot'}
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
					<form
						onSubmit={(e) => handleSubmit(e)}
						style={{
							alignItems: 'center',
							display: 'flex',
						}}
					>
						<Input
							placeholder="Ask any question..."
							value={input}
							onChange={handleInputChange}
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
						/>
					</form>
				</Box>

				<div id="anchor" style={{ overflowAnchor: 'auto', height: '1px' }}></div>
			</div>
		</>
  );
};

export default ChatBot;
