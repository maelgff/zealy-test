import {
	Card,
	CardBody,
	Flex,
	FormControl,
	IconButton,
	Textarea,
	Text,
} from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";
import { CommentType } from "../App";
import { FiSend } from "react-icons/fi";

type Props = {
	label: string;
	id: string;
	comment: CommentType;
	setComment: (comment: CommentType) => void;
	onClose: () => void;
	saveComment: () => void;
};

export const ReactionCard: React.FC<Props> = ({
	id,
	label,
	onClose,
	setComment,
	comment,
	saveComment,
}) => {
	return (
		<Card
			position="absolute"
			cursor="normal"
			style={{ left: comment.x, top: comment.y }}
			borderRadius="12px"
		>
			<CardBody>
				<IconButton
					onClick={() => onClose()}
					aria-label="Close"
					bg="transparent"
					float="right"
					border="none"
					icon={<FaTimes size="26px" />}
					_hover={{
						border: "none",
						bg: "transparent",
						svg: { fill: "grey" },
					}}
				/>
				<Flex mt="50px" flexDir="column">
					<Flex fontSize={30} justifyContent="space-around" mb="20px">
						{["😀", "😝", "🥰", "❤️‍🔥"].map(
							(emoji: string, idx: number) => {
								return (
									<Text
										display="flex"
										alignItems="center"
										justifyContent="center"
										key={`emoji-${idx}`}
										transform={
											comment.emoji === emoji
												? "scale(1.5)"
												: ""
										}
										transition={"0.6s ease-in-out"}
										borderRadius="50%"
										w="50px"
										h="50px"
										onClick={() =>
											setComment({
												...comment,
												emoji: emoji,
											})
										}
										cursor="pointer"
									>
										{emoji}
									</Text>
								);
							}
						)}
					</Flex>
					<Flex>
						<FormControl>
							<Textarea
								fontFamily="circular"
								autoFocus={true}
								onChange={(e) =>
									setComment({
										...comment,
										content: e.target.value,
									})
								}
								id={id}
								placeholder={label}
							/>
						</FormControl>
						<IconButton
							isDisabled={
								comment.content === "" || comment.emoji === ""
							}
							_hover={{
								border: "none",
								bg: "transparent",
							}}
							zIndex={100}
							w="min-content"
							right="25px"
							bottom="25px"
							position="absolute"
							bg={"transparent"}
							border={"none"}
							color="#0180ff"
							icon={<FiSend size="30px" />}
							aria-label={"Save"}
							onClick={() => saveComment()}
						/>
					</Flex>
				</Flex>
			</CardBody>
		</Card>
	);
};
