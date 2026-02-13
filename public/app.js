const express = require('express');
const app = express();
const port = 3000;
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const imageFolderPath = path.join(__dirname, 'public/images');

// Middleware to parse JSON bodies
app.use(express.json());

// --- IMAGE RESIZING ---
const resizeImage = async (inputPath, outputPath, width, height) => {
    try {
        await sharp(inputPath)
            .resize(width, height)
            .toFile(outputPath);
    } catch (error) {
        console.error('Error resizing image:', error);
    }
};

const resizeAllImages = (folderPath, width, height) => {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error('Error reading image folder:', err);
            return;
        }

        files.forEach((file) => {
            if (file.startsWith('resized_')) return;

            const inputPath = path.join(folderPath, file);
            const outputPath = path.join(folderPath, `resized_${file}`);

            resizeImage(inputPath, outputPath, width, height);
        });
    });
};

resizeAllImages(imageFolderPath, 300, 300);

// --- SIMPLE IN-MEMORY USERS FOR LOGIN ---
let users = [
    { email: "test1@example.com", password: "password1", name: "Test User 1" },
    { email: "test2@example.com", password: "password2", name: "Test User 2" }
];

// --- SIMPLE AUTH MIDDLEWARE ---
const authenticate = (req, res, next) => {
    const { email, password } = req.headers;
    if (!email || !password) return res.status(401).json({ error: "Missing credentials" });

    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return res.status(401).json({ error: "Invalid email or password" });

    req.user = user; // attach user to request
    next();
};

// --- DATA ---
const dogBreeds = [
    { breed: "Golden Retriever", images: ["golden_retriever_1.jpg", "golden_retriever_2.jpg", "golden_retriever_3.jpg"] },
    { breed: "Labrador", images: ["labrador_1.jpg", "labrador_2.jpg", "labrador_3.jpg"] },
    { breed: "Beagle", images: ["beagle_1.jpg", "beagle_2.jpg", "beagle_3.jpg"] },
    { breed: "Boxer", images: ["boxer_1.jpg", "boxer_2.jpg", "boxer_3.jpg"] },
    { breed: "Mixed", images: ["mixed_dog_1.jpg", "mixed_dog_2.jpg", "mixed_dog_3.jpg"] }
];

const catBreeds = [
    { breed: "Tabby", images: ["tabby_1.jpg", "tabby_2.jpg", "tabby_3.jpg"] },
    { breed: "Calico", images: ["calico_1.jpg", "calico_2.jpg", "calico_3.jpg"] },
    { breed: "Siamese", images: ["siamese_1.jpg", "siamese_2.jpg", "siamese_3.jpg"] },
    { breed: "Mixed", images: ["mixed_cat_1.jpg", "mixed_cat_2.jpg", "mixed_cat_3.jpg"] }
];

const descriptors = ["energetic", "shy", "friendly", "mellow", "loving", "anxious"];
const activities = {
    dog: ["playing fetch", "going on walks", "cuddling", "exploring"],
    cat: ["sunbathing", "cuddling", "using scratching posts", "exploring"]
};

const provinces = ["NS", "NB", "PEI"];
const cities = {
    NS: ["Halifax", "Sydney", "New Glasgow", "Truro"],
    NB: ["Fredericton", "Moncton", "Saint John"],
    PEI: ["Charlottetown", "Summerside"]
};

const healthStatuses = ["Healthy", "Special Needs", "Senior Care", "Medical Treatment Needed"];
const shelterNames = [
    "Happy Paws Shelter", "Second Chance Animal Rescue", "Forever Home Society",
    "Maritime Animal Shelter", "Coastal Pet Rescue", "Hopeful Hearts Sanctuary"
];

// --- HELPER FUNCTIONS ---
const getRandomPet = (pet_id) => {
    const species = Math.random() > 0.5 ? "dog" : "cat";
    const breedList = species === "dog" ? dogBreeds : catBreeds;
    const selectedBreed = breedList[Math.floor(Math.random() * breedList.length)];
    const ageMonths = Math.floor(Math.random() * 204) + 2;
    const age = ageMonths < 12 ? `${ageMonths} months` : `${Math.floor(ageMonths / 12)} years`;
    const isPuppyOrKitten = ageMonths <= 12;
    const province = provinces[Math.floor(Math.random() * provinces.length)];
    const cityList = cities[province];
    const city = cityList[Math.floor(Math.random() * cityList.length)];
    const isVaccinated = Math.random() > 0.3;
    const isNeutered = Math.random() > 0.4;
    const healthStatus = Math.random() > 0.7 ? healthStatuses[Math.floor(Math.random() * healthStatuses.length)] : "Healthy";

    return {
        pet_id,
        name: `Pet ${pet_id}`,
        species,
        sex: Math.random() > 0.5 ? "male" : "female",
        breed: selectedBreed.breed,
        age,
        age_group: isPuppyOrKitten ? (species === "dog" ? "puppy" : "kitten") : "adult",
        age_months: ageMonths,
        image_url: `http://example.com/images/${selectedBreed.images[Math.floor(Math.random() * selectedBreed.images.length)]}`,
        additional_images: selectedBreed.images.map(img => `http://example.com/images/${img}`),
        neutered_status: isNeutered,
        location: city,
        province: province,
        adoption_fee: species === "dog" ? (isPuppyOrKitten ? 150 : 100) : (isPuppyOrKitten ? 125 : 75),
        description: `A ${descriptors[Math.floor(Math.random() * descriptors.length)]} ${species} who loves ${activities[species][Math.floor(Math.random() * activities[species].length)]}`,
        vaccination_status: isVaccinated,
        health_status: healthStatus,
        shelter_name: shelterNames[Math.floor(Math.random() * shelterNames.length)],
        adoption_status: Math.random() > 0.9 ? "pending" : "available",
        date_listed: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        poster_email: null,
        is_user_listing: false
    };
};

// --- DATA ARRAYS ---
const pets = Array.from({ length: 100 }, (_, index) => getRandomPet(index + 1));
let adoptionRequests = [];
let userListings = [];
let nextUserListingId = 1001;

// --- SHUFFLE HELPER ---
const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

// --- ENDPOINTS ---

// LOGIN
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return res.status(401).json({ error: "Invalid email or password" });
    res.json({ message: "Login successful", user: { email: user.email, name: user.name } });
});

// REGISTER
app.post('/register', (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) return res.status(400).json({ error: "Email, password, and name are required" });

    if (users.find(u => u.email === email)) return res.status(400).json({ error: "Email already exists" });

    const newUser = { email, password, name };
    users.push(newUser);
    res.status(201).json({ message: "User registered successfully", user: { email, name } });
});

// GET ALL PETS
app.get('/pets', (req, res) => {
    const { species, location, province } = req.query;
    let allPets = [...pets, ...userListings].filter(pet => pet.adoption_status !== "adopted");

    if (species) allPets = allPets.filter(p => p.species.toLowerCase() === species.toLowerCase());
    if (location) allPets = allPets.filter(p => p.location.toLowerCase() === location.toLowerCase());
    if (province) allPets = allPets.filter(p => p.province.toLowerCase() === province.toLowerCase());

    res.json(shuffleArray(allPets));
});

// GET PET BY ID
app.get('/pets/:pet_id', (req, res) => {
    const { pet_id } = req.params;
    const pet = [...pets, ...userListings].find(p => p.pet_id === parseInt(pet_id));
    if (!pet) return res.status(404).json({ error: "Pet not found" });
    res.json(pet);
});

// POST NEW PET (login required)
app.post('/pets', authenticate, (req, res) => {
    const { name, species, sex, breed, age, age_months, neutered_status, location, province, adoption_fee, description, vaccination_status, health_status, image_url, additional_images } = req.body;

    if (!name || !species || !location || !province) return res.status(400).json({ error: "Required fields: name, species, location, province" });

    const newListing = {
        pet_id: nextUserListingId++,
        name,
        species: species.toLowerCase(),
        sex: sex || "unknown",
        breed: breed || "Mixed",
        age: age || "Unknown",
        age_months: age_months || null,
        age_group: age_months && age_months <= 12 ? (species === "dog" ? "puppy" : "kitten") : "adult",
        image_url: image_url || "http://example.com/images/default_pet.jpg",
        additional_images: additional_images || [],
        neutered_status: neutered_status || false,
        location,
        province: province.toUpperCase(),
        adoption_fee: adoption_fee || 0,
        description: description || "No description provided.",
        vaccination_status: vaccination_status || false,
        health_status: health_status || "Unknown",
        shelter_name: "Private Listing",
        adoption_status: "available",
        date_listed: new Date().toISOString().split('T')[0],
        poster_name: req.user.name,
        poster_email: req.user.email,
        poster_phone: null,
        is_user_listing: true
    };

    userListings.push(newListing);
    res.status(201).json({ message: "Pet listing created successfully", listing: newListing });
});

// POST ADOPTION REQUEST (login required)
app.post('/adoption-requests', authenticate, (req, res) => {
    const { pet_id, message } = req.body;
    if (!pet_id) return res.status(400).json({ error: "pet_id is required" });

    const pet = [...pets, ...userListings].find(p => p.pet_id === parseInt(pet_id));
    if (!pet) return res.status(404).json({ error: "Pet not found" });

    const adoptionRequest = {
        request_id: adoptionRequests.length + 1,
        pet_id: pet.pet_id,
        pet_name: pet.name,
        adopter_name: req.user.name,
        adopter_email: req.user.email,
        adopter_phone: null,
        message: message || "",
        status: "pending",
        submitted_at: new Date().toISOString(),
        poster_email: pet.poster_email || 'shelter@example.com'
    };

    adoptionRequests.push(adoptionRequest);

    console.log(`\n=== EMAIL SIMULATION ===\nTo: ${pet.poster_email || 'shelter@example.com'}\nAdopter: ${req.user.name}\nPet: ${pet.name}\nMessage: ${message || 'No message'}\n======================\n`);

    res.status(201).json({ message: "Adoption request submitted successfully", request: adoptionRequest });
});

// PATCH MARK AS ADOPTED (login required)
app.patch('/pets/:pet_id/adopt', authenticate, (req, res) => {
    const { pet_id } = req.params;
    const listingIndex = userListings.findIndex(p => p.pet_id === parseInt(pet_id) && p.poster_email === req.user.email);
    if (listingIndex === -1) return res.status(404).json({ error: "Listing not found or not owned by you" });

    userListings[listingIndex].adoption_status = "adopted";
    res.json({ message: "Pet marked as adopted successfully", listing: userListings[listingIndex] });
});

// DELETE LISTING (login required)
app.delete('/pets/:pet_id', authenticate, (req, res) => {
    const { pet_id } = req.params;
    const listingIndex = userListings.findIndex(p => p.pet_id === parseInt(pet_id) && p.poster_email === req.user.email);
    if (listingIndex === -1) return res.status(404).json({ error: "Listing not found or not owned by you" });

    const deletedListing = userListings.splice(listingIndex, 1)[0];
    res.json({ message: "Listing deleted successfully", listing: deletedListing });
});

// GET MY LISTINGS (login required)
app.get('/my-listings', authenticate, (req, res) => {
    const myListings = userListings.filter(p => p.poster_email === req.user.email);
    res.json(myListings);
});

// START SERVER
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
