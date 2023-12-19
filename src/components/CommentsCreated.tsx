import {
	useDisclosure,
	Popover,
	PopoverTrigger,
	PopoverContent,
	FocusLock,
	PopoverArrow,
	PopoverCloseButton,
	Text,
} from "@chakra-ui/react";
import { CommentType } from "../App";

type Props = {
	comment: CommentType;
	idx: number;
};

export const CommentsCreated: React.FC<Props> = ({ comment, idx }) => {
	const { onOpen, onClose, isOpen } = useDisclosure();

	return (
		<Popover
			isOpen={isOpen}
			onOpen={onOpen}
			onClose={onClose}
			placement="right"
			closeOnBlur={false}
			key={`comment-${comment.x}-${idx}`}
		>
			<PopoverTrigger>
				<Text
					position="absolute"
					fontSize="25px"
					cursor="pointer"
					style={{ left: comment.x, top: comment.y }}
				>
					{comment.emoji}
				</Text>
			</PopoverTrigger>
			<PopoverContent p={5}>
				<FocusLock persistentFocus={false}>
					<PopoverArrow />
					<PopoverCloseButton />
					<Text fontFamily="circular" color="#b0b0b0">
						{comment.date}
					</Text>
					<Text>{comment.emoji}</Text>
					<Text fontFamily="circular" fontSize="20px">
						{comment.content}
					</Text>
				</FocusLock>
			</PopoverContent>
		</Popover>
	);
};
