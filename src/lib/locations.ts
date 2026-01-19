export interface Location {
    id: string;
    name: string;
    description: string;
    image: string;
}

export const locations: Location[] = [
    {
        id: "dino-era",
        name: "The Cretaceous Period",
        description: "A lush, green world ruled by friendly dinosaurs. Watch out for Pisuke!",
        image: "/locations/dino-era.jpg",
    },
    {
        id: "moon-kingdom",
        name: "The Moon Kingdom",
        description: "A futuristic society of moon rabbits living on the dark side of the moon.",
        image: "/locations/moon-kingdom.jpg",
    },
    {
        id: "nobita-room",
        name: "Nobita's Room",
        description: "The cozy room where it all began. Check the desk drawer for a time machine!",
        image: "/locations/nobita-room.jpg",
    },
];
