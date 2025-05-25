export const activities = [
    {
        id: crypto.randomUUID(),
        timestamp: 1703097600000,
        text: "Ate lunch",
        user: {
            id: 1, name: 'Nate',
            avatar: "https://robohash.org/nate?bgset=bg1"
        },
        comments: [{ from: 'Ari', text: 'Me too!' }]
    },
    {
        id: crypto.randomUUID(),
        timestamp: 1703097660000,
        text: "Woke up early for a beautiful run",
        user: {
            id: 2, name: 'Ari',
            avatar: "https://robohash.org/ari?bgset=bg2"
        },
        comments: [{ from: 'Nate', text: 'I am so jealous' }]
    },
];