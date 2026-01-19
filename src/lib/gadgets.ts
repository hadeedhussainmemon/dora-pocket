export interface Gadget {
    id: string;
    name: string;
    description: string;
    image: string;
    mangaChapter: string;
    usefulness: number; // 1-5
}

export const gadgets: Gadget[] = [
    {
        id: "bamboo-copter",
        name: "Bamboo Copter",
        description: "A small head-accessory that allows flight by simulating anti-gravity.",
        image: "/gadgets/bamboo-copter.png",
        mangaChapter: "Vol. 1",
        usefulness: 5,
    },
    {
        id: "anywhere-door",
        name: "Anywhere Door",
        description: "A door that allows the user to travel to any location they desire.",
        image: "/gadgets/anywhere-door.png",
        mangaChapter: "Vol. 6",
        usefulness: 5,
    },
    {
        id: "time-kerchief",
        name: "Time Kerchief",
        description: "A cloth that can advance or reverse the flow of time for any object covered by it.",
        image: "/gadgets/time-kerchief.png",
        mangaChapter: "Vol. 2",
        usefulness: 4,
    },
    // Add placeholders for now if images aren't generated yet, or reuse existing ones
];
