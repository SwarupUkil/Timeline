// Default values for a timeline entry
export const defaults = {
    image: "freedom.png",
    title: "Enter Title",
    date: "01/01/2024",
    description: "Le description.",
};

// Default data for first added entry
export const defaultMap = new Map();
defaultMap.set(1, {
    image: defaults.image,
    title: defaults.title,
    date: defaults.date,
    description: defaults.description,
});