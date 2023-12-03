
interface Topic {
    // Define the properties of the Topic interface here
}

interface Reply {
    id: string;
    userId: string;
    // Define the properties of the Reply interface here
}

interface Discussion {
    id: string;
    title: string;
    body: string;
    replies: Reply[];
    topicId: string;
    userId: string;
}