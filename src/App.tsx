import { Box, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { ReactionCard } from "./components/ReactionCard";
import { useState } from "react";
import { CommentsCreated } from "./components/CommentsCreated";
import ColorModeToggle from "./components/ColorModeToggle";
import { v4 as uuidv4 } from "uuid";

export type CommentType = {
	id: string;
	content: string;
	emoji: string;
	date?: string;
	x?: number;
	y?: number;
	answers: string[];
};

const App: React.FC<Record<string, never>> = () => {
	const { onOpen, onClose, isOpen } = useDisclosure();
	const [commentsCreated, setCommentsCreated] = useState<CommentType[]>([]);
	const [newComment, setNewComment] = useState<CommentType>({
		id: uuidv4(),
		content: "",
		emoji: "",
		answers: [],
	});

	const createComment = (e: React.MouseEvent<Element>) => {
		setNewComment({
			...newComment,
			x: e.clientX,
			y: e.clientY,
			date: new Date().toLocaleString(),
		});
		onOpen();
	};

	const saveComment = () => {
		const newId = uuidv4();
		setCommentsCreated([...commentsCreated, newComment]);
		setNewComment({
			id: newId,
			content: "",
			emoji: "",
			answers: [],
		});
		onClose();
	};

	const resetComment = () => {
		setNewComment({
			id: uuidv4(),
			content: "",
			emoji: "",
			answers: [],
		});
		onClose();
	};

	const saveAnswer = (answer: string, currentComment: CommentType) => {
		const otherComments = commentsCreated.filter(
			(c) => c.id !== currentComment.id
		);
		otherComments.push({
			...currentComment,
			answers: [...currentComment.answers, answer],
		});
		setCommentsCreated(otherComments);
	};

	return (
		<>
			<ColorModeToggle />
			<Box
				minH="calc(100vh - 160px)"
				position="relative"
				margin="50px 250px"
				onClick={(e: React.MouseEvent<Element>) => createComment(e)}
			>
				{" "}
				<Flex id="text-zone">
					<Text fontFamily="circular">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit,
						sed do eiusmod tempor incididunt ut labore et dolore
						magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea
						commodo consequat. Duis aute irure dolor in
						reprehenderit in voluptate velit esse cillum dolore eu
						fugiat nulla pariatur. Excepteur sint occaecat cupidatat
						non proident, sunt in culpa qui officia deserunt mollit
						anim id est laborum.
					</Text>
				</Flex>
			</Box>
			{commentsCreated.map((comment: CommentType, idx: number) => {
				return (
					<CommentsCreated
						key={`comment-${comment.x}-${idx}`}
						comment={comment}
						saveAnswer={saveAnswer}
					/>
				);
			})}
			{isOpen && (
				<ReactionCard
					label="Add your comment"
					onClose={resetComment}
					id={"comment"}
					comment={newComment}
					setComment={setNewComment}
					saveComment={saveComment}
				/>
			)}
		</>
	);
};

export default App;
