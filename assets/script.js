document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    const generateArtButton = document.getElementById('generate-art');
    const artContainer = document.getElementById('art-container');
    const shapeAmountInput = document.getElementById('shape-amount');
    const shapeSizeInput = document.getElementById('shape-size');
    const randomnessInput = document.getElementById('randomness');
    const shapeAmountValue = document.getElementById('shape-amount-value');
    const shapeSizeValue = document.getElementById('shape-size-value');
    const randomnessValue = document.getElementById('randomness-value');

    shapeAmountInput.addEventListener('input', () => {
        shapeAmountValue.textContent = shapeAmountInput.value;
    });

    shapeSizeInput.addEventListener('input', () => {
        shapeSizeValue.textContent = shapeSizeInput.value;
    });

    randomnessInput.addEventListener('input', () => {
        randomnessValue.textContent = randomnessInput.value;
    });

    if (generateArtButton && artContainer) {
        generateArtButton.addEventListener('click', generateArt);
    } else {
        console.error('Button or container not found');
    }
});

function generateArt() {
    const artContainer = document.getElementById('art-container');
    artContainer.innerHTML = ''; // Clear previous art

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');

    const shapeAmount = document.getElementById('shape-amount').value;
    const shapeSize = document.getElementById('shape-size').value;
    const randomness = document.getElementById('randomness').value;

    const shapes = [
        { type: 'circle', enabled: document.getElementById('circles').checked },
        { type: 'rect', enabled: document.getElementById('rectangles').checked },
        { type: 'ellipse', enabled: document.getElementById('ellipses').checked },
        { type: 'line', enabled: document.getElementById('lines').checked },
        { type: 'squiggle', enabled: document.getElementById('squiggles').checked }
    ];

    for (let i = 0; i < shapeAmount; i++) {
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        if (!shape.enabled) continue;

        switch (shape.type) {
            case 'circle':
                const circle = document.createElementNS(svgNS, 'circle');
                circle.setAttribute('cx', Math.random() * 100 + '%');
                circle.setAttribute('cy', Math.random() * 100 + '%');
                circle.setAttribute('r', Math.random() * shapeSize);
                circle.setAttribute('fill', getRandomColor());
                svg.appendChild(circle);
                break;
            case 'rect':
                const rect = document.createElementNS(svgNS, 'rect');
                rect.setAttribute('x', Math.random() * 100 + '%');
                rect.setAttribute('y', Math.random() * 100 + '%');
                rect.setAttribute('width', Math.random() * shapeSize);
                rect.setAttribute('height', Math.random() * shapeSize);
                rect.setAttribute('fill', getRandomColor());
                rect.setAttribute('transform', `rotate(${Math.random() * 360}, ${Math.random() * 100}%, ${Math.random() * 100}%)`);
                svg.appendChild(rect);
                break;
            case 'ellipse':
                const ellipse = document.createElementNS(svgNS, 'ellipse');
                ellipse.setAttribute('cx', Math.random() * 100 + '%');
                ellipse.setAttribute('cy', Math.random() * 100 + '%');
                ellipse.setAttribute('rx', Math.random() * shapeSize);
                ellipse.setAttribute('ry', Math.random() * (shapeSize / 2));
                ellipse.setAttribute('fill', getRandomColor());
                ellipse.setAttribute('transform', `rotate(${Math.random() * 360}, ${Math.random() * 100}%, ${Math.random() * 100}%)`);
                svg.appendChild(ellipse);
                break;
            case 'line':
                const line = document.createElementNS(svgNS, 'line');
                line.setAttribute('x1', Math.random() * 100 + '%');
                line.setAttribute('y1', Math.random() * 100 + '%');
                line.setAttribute('x2', Math.random() * 100 + '%');
                line.setAttribute('y2', Math.random() * 100 + '%');
                line.setAttribute('stroke', getRandomColor());
                line.setAttribute('stroke-width', Math.random() * (shapeSize / 10));
                svg.appendChild(line);
                break;
            case 'squiggle':
                const path = document.createElementNS(svgNS, 'path');
                const startX = Math.random() * 100;
                const startY = Math.random() * 100;
                const controlX1 = startX + Math.random() * randomness - randomness / 2;
                const controlY1 = startY + Math.random() * randomness - randomness / 2;
                const controlX2 = startX + Math.random() * randomness - randomness / 2;
                const controlY2 = startY + Math.random() * randomness - randomness / 2;
                const endX = startX + Math.random() * randomness - randomness / 2;
                const endY = startY + Math.random() * randomness - randomness / 2;
                const d = `M${startX}% ${startY}% C${controlX1}% ${controlY1}%, ${controlX2}% ${controlY2}%, ${endX}% ${endY}%`;
                path.setAttribute('d', d);
                path.setAttribute('stroke', getRandomColor());
                path.setAttribute('stroke-width', Math.random() * (shapeSize / 10));
                path.setAttribute('fill', 'none');
                svg.appendChild(path);
                break;
        }
    }

    artContainer.appendChild(svg);
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}