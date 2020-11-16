import React, { useState, useEffect, useContext } from 'react';
import { Comment, Avatar, Input, Form, Button, Divider } from 'antd';
import { UserContext } from '../../Context'
const CardComments = ({ children, user, card, game }) => {
    console.log(` Comment Params ${user} ${card} ${game}`)
    const { fetchWithCSRF, userInfo } = useContext(UserContext);
    const [commentsPageState, setCommentsPageState] = useState({ comments: [] })
    const [commentMessage, setCommentMessage] = useState('')
    useEffect(() => {
        async function fetchComments() {
            const res = await fetch(`/api/card-comments/${user.username}/${game.name}/${card.name}`)
            if (res) {
                const { card, user, game, comments } = await res.json()
                await setCommentsPageState({ ...commentsPageState, card, user, game, comments })
            } else {
                await setCommentsPageState({ ...commentsPageState })
            }
        }
        fetchComments();
    }, []);
    const onCommentChange = (e) => {
        setCommentMessage(e.target.value)
    }
    const onCommentSubmit = async (e) => {
        console.log(commentMessage);
        console.log(`${user.username}/${game.name}/${card.name}`)
        const res = await fetchWithCSRF(`/api/card-comments/${user.username}/${game.name}/${card.name}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({ message: commentMessage, user_id: userInfo.id })
        })
        console.log(res)
        if (res.ok) {
            const { comment } = await res.json();
            let copiedComments = { ...commentsPageState }
            copiedComments.comments.push(comment)
            await setCommentsPageState(copiedComments);
            setCommentMessage('')
            return comment;
        }
    };


    const onDeleteComment = async (e) => {
        const splitId = e.target.id.split('_')
        console.log(splitId)
        const commentID = splitId[0].split('card-comment-')[1]
        const commentIndex = splitId[1].split('index-')[1]

        console.log(commentID)
        console.log(commentIndex)
        console.log(`${user.username}/${game.name}/${card.name}`)
        const res = await fetchWithCSRF(`/api/card-comments/${commentID}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include'
        })
        console.log(res)
        if (res.ok) {
            const data = await res.json();
            let copiedComments = [...commentsPageState.comments]
            copiedComments.splice(commentIndex, 1);
            await setCommentsPageState({ ...commentsPageState, comments: copiedComments });
            setCommentMessage('')
            return data;
        }
    }
    return (<>
        {commentsPageState.comments.length > 0 ?
            commentsPageState.comments.map((ele, index) => {
                let eleUsername
                let eleProfilePic
                switch (ele.user_id) {
                    case 1:
                        eleUsername = 'guest';
                        eleProfilePic = 'https://placekitten.com/205/178'
                        break;
                    case 2:
                        eleUsername = 'Ian';
                        eleProfilePic = 'https://dummyimage.com/772x187'
                        break;
                    case 3:
                        eleUsername = 'Javier';
                        eleProfilePic = 'https://www.lorempixel.com/594/532'
                        break;
                    case 4:
                        eleUsername = 'Dean';
                        eleProfilePic = 'https://placekitten.com/248/624'
                        break;
                    case 5:
                        eleUsername = 'Angela';
                        eleProfilePic = 'https://placekitten.com/263/622'
                        break;
                    case 6:
                        eleUsername = 'Soon-Mi';
                        eleProfilePic = 'https://www.lorempixel.com/289/485'
                        break;
                    case 7:
                        eleUsername = 'Alissa';
                        eleProfilePic = 'https://www.lorempixel.com/76/262'
                        break;
                    case 8:
                        eleUsername = 'demo';
                        eleProfilePic = 'https://dummyimage.com/857x771'
                        break;
                    default:
                        eleUsername = 'demo';
                        eleProfilePic = 'https://www.lorempixel.com/76/262'
                        break;

                }
                return (
                    <>
                        <Divider />
                        <Comment
                            // actions={[<span key="comment-nested-reply-to">Reply to</span>]}
                            key={index}
                            author={<a href={`/${eleUsername}`}>{eleUsername}</a>}
                            avatar={
                                <Avatar
                                    src={eleProfilePic}
                                    alt={eleUsername}
                                />
                            }
                            style={{ padding: '2em', backgroundColor: 'white' }}
                            content={<>
                                <p style={{ padding: '2em' }}>
                                    {ele.message}
                                </p>
                                <button primary size='small' id={`card-comment-${ele.id}_index-${index}`} onClick={onDeleteComment}>Delete</button>
                            </>

                            }
                        >
                            {children}
                        </Comment>
                        <Divider />
                    </>
                )
            })
            : <p>NO STUFF</p>
        }
        <Form.Item>
            <Input.TextArea rows={4} onChange={onCommentChange} value={commentMessage} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" onClick={onCommentSubmit} disabled={!userInfo.id} type="primary">
                Add Comment
      </Button>
        </Form.Item>
    </>
    );
}
export default CardComments;
