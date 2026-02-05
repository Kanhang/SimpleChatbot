'use client'

interface ConversationsProps {
    conversationIdx: number;
    messagesLists: any[];
    setConversationIdx: Function;
    setMessages: Function;
    setCur: Function;
    loading: boolean;
}

const Conversations = (
    props: ConversationsProps
) => {

    const { conversationIdx, messagesLists, setConversationIdx, setMessages, setCur, loading } = props;

    const onSelectConversation = (event: any, index: number) => {
        if (loading) {
            return;
        }
        setConversationIdx(index);
        setCur('');
        setMessages([]);
    }

    return (
        <>
            {messagesLists.length > 0 &&
                <>
                    <p className='m-3'>Conversations Lists</p>
                    {messagesLists.map((list, index) => {
                        return <div className={'p-2 mx-3 border'}
                            key={`conv-${index}`}
                            style={{
                                width: '150px',
                                borderWidth: index === conversationIdx ? '3px' : '1px'
                            }} onClick={(event) => onSelectConversation(event, index)}>Conversation {index}</div>
                    })}

                </>} :
        </>
    )

};



export default Conversations;