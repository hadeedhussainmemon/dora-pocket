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
    {
        id: "future-city",
        name: "22nd Century City",
        description: "Doraemon's home time! Marvel at the flying cars and futuristic skyline of Tokyo in 2112.",
        image: "/locations/future_city.png",
    },
    {
        id: "cloud-kingdom",
        name: "Cloud Kingdom",
        description: "A magical castle in the sky built with the Cloud Hardening Gas. Don't fall off!",
        image: "/locations/cloud_kingdom.png",
    },
    {
        id: "school-hill",
        name: "School Back Hill",
        description: "The peaceful grassy hill where Nobita loves to take naps. A perfect spot for cloud gazing.",
        image: "/locations/school_hill.png",
    },
];
