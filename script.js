const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const uploadPrompt = document.getElementById('upload-prompt');
const previewContainer = document.getElementById('preview-container');
const imagePreview = document.getElementById('image-preview');
const removeBtn = document.getElementById('remove-btn');
const classifyBtn = document.getElementById('classify-btn');
const loader = document.getElementById('loader');
const results = document.getElementById('results');

const itemName = document.getElementById('item-name');
const itemConfidence = document.getElementById('item-confidence');
const disposalCard = document.getElementById('disposal-card');
const disposalTitle = document.getElementById('disposal-title');
const disposalDesc = document.getElementById('disposal-desc');

// Handle click to browse
dropZone.addEventListener('click', () => fileInput.click());

// Handle file selection via input
fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        showPreview(e.target.files[0]);
    }
});

// Drag and drop handlers
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.style.borderColor = 'var(--primary)';
});

dropZone.addEventListener('dragleave', () => {
    dropZone.style.borderColor = 'var(--border-color)';
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.style.borderColor = 'var(--border-color)';
    if (e.dataTransfer.files.length > 0) {
        fileInput.files = e.dataTransfer.files;
        showPreview(e.dataTransfer.files[0]);
    }
});

function showPreview(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        imagePreview.src = e.target.result;
        uploadPrompt.style.display = 'none';
        previewContainer.style.display = 'flex';
        classifyBtn.disabled = false;
        results.style.display = 'none';
    };
    reader.readAsDataURL(file);
}

// Remove image preview
removeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    fileInput.value = '';
    imagePreview.src = '';
    previewContainer.style.display = 'none';
    uploadPrompt.style.display = 'block';
    classifyBtn.disabled = true;
    results.style.display = 'none';
});

// Simulate AI Classification
classifyBtn.addEventListener('click', () => {
    classifyBtn.style.display = 'none';
    loader.style.display = 'block';
    results.style.display = 'none';

    setTimeout(() => {
        loader.style.display = 'none';
        classifyBtn.style.display = 'block';
        results.style.display = 'flex';

        // Simulated AI category dataset rotation for demonstration
        const categories = [
            { name: "Plastic Water Bottle", type: "recyclable", title: "Recyclable Waste (Blue Bin)", desc: "Empty, rinse, and place in the dry recyclable bin. Do not crush completely if local facilities require optical sorting." },
            { name: "Banana Peel / Food Scraps", type: "organic", title: "Organic Waste (Green Bin)", desc: "Compostable organic matter. Dispose of in your green bin or home compost pile to convert into nutrient-rich soil." },
            { name: "Cardboard Packaging Box", type: "recyclable", title: "Recyclable Waste (Blue Bin)", desc: "Flatten the box to save space and keep it clean and dry before tossing it into paper recycling." },
            { name: "Used Battery / Electronics", type: "hazardous", title: "Hazardous / E-Waste Bin", desc: "Do not throw in household bins! Take to a local e-waste collection point or designated recycling center." }
        ];

        // Randomly pick one or use a pseudo-intelligent pick
        const randomChoice = categories[Math.floor(Math.random() * categories.length)];
        const randomConfidence = (92.4 + Math.random() * 6.5).toFixed(2) + '%';

        itemName.textContent = randomChoice.name;
        itemConfidence.textContent = randomConfidence;
        disposalTitle.textContent = randomChoice.title;
        disposalDesc.textContent = randomChoice.desc;

        // Update styling class based on waste type
        disposalCard.className = `disposal-card ${randomChoice.type}`;
    }, 1500);
});