document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    const generateArtButton = document.getElementById('generate-art');
    const saveArtButton = document.getElementById('save-art'); // New button
    const artContainer = document.getElementById('art-container');
    const shapeAmountInput = document.getElementById('shape-amount');
    const shapeSizeInput = document.getElementById('shape-size');
    const randomnessInput = document.getElementById('randomness');
    const shapeAmountValue = document.getElementById('shape-amount-value');
    const shapeSizeValue = document.getElementById('shape-size-value');
    const randomnessValue = document.getElementById('randomness-value');
    const backgroundColorInput = document.getElementById('background-color');
    const transparentBackgroundCheckbox = document.getElementById('transparent-background');

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

    if (saveArtButton && artContainer) {
        saveArtButton.addEventListener('click', saveArtAsPNG); // Attach event listener
    } else {
        console.error('Save button or container not found');
    }
});

function generateArt() {
    const artContainer = document.getElementById('art-container');
    artContainer.innerHTML = ''; // Clear previous art

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 100 100'); // Set viewBox to ensure coordinates are relative

    const shapeAmount = document.getElementById('shape-amount').value;
    const shapeSize = document.getElementById('shape-size').value / 2; // Reduce the maximum size of shapes
    const randomness = document.getElementById('randomness').value;
    const backgroundColor = document.getElementById('background-color').value;
    const transparentBackground = document.getElementById('transparent-background').checked;

    if (!transparentBackground) {
        const rect = document.createElementNS(svgNS, 'rect');
        rect.setAttribute('width', '100%');
        rect.setAttribute('height', '100%');
        rect.setAttribute('fill', backgroundColor);
        svg.appendChild(rect);
    }

    const shapes = [
        { type: 'circle', enabled: document.getElementById('circles').checked },
        { type: 'rect', enabled: document.getElementById('rectangles').checked },
        { type: 'ellipse', enabled: document.getElementById('ellipses').checked },
        { type: 'line', enabled: document.getElementById('lines').checked },
        { type: 'squiggle', enabled: document.getElementById('squiggles').checked }
    ];

    let squiggleCount = 0;
    const minSquiggles = 3;
    const maxSquiggles = 6;
    const totalSquiggles = Math.floor(Math.random() * (maxSquiggles - minSquiggles + 1)) + minSquiggles;

    for (let i = 0; i < shapeAmount; i++) {
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        if (!shape.enabled) continue;

        if (shape.type === 'squiggle' && squiggleCount >= totalSquiggles) {
            continue; // Skip adding more squiggles if the limit is reached
        }

        switch (shape.type) {
            case 'circle':
                const circle = document.createElementNS(svgNS, 'circle');
                circle.setAttribute('cx', Math.random() * 100);
                circle.setAttribute('cy', Math.random() * 100);
                circle.setAttribute('r', Math.random() * shapeSize);
                circle.setAttribute('fill', getRandomColor());
                svg.appendChild(circle);
                break;
            case 'rect':
                const rect = document.createElementNS(svgNS, 'rect');
                rect.setAttribute('x', Math.random() * 100);
                rect.setAttribute('y', Math.random() * 100);
                rect.setAttribute('width', Math.random() * shapeSize);
                rect.setAttribute('height', Math.random() * shapeSize);
                rect.setAttribute('fill', getRandomColor());
                rect.setAttribute('transform', `rotate(${Math.random() * 360}, ${Math.random() * 100}, ${Math.random() * 100})`);
                svg.appendChild(rect);
                break;
            case 'ellipse':
                const ellipse = document.createElementNS(svgNS, 'ellipse');
                ellipse.setAttribute('cx', Math.random() * 100);
                ellipse.setAttribute('cy', Math.random() * 100);
                ellipse.setAttribute('rx', Math.random() * shapeSize);
                ellipse.setAttribute('ry', Math.random() * (shapeSize / 2));
                ellipse.setAttribute('fill', getRandomColor());
                ellipse.setAttribute('transform', `rotate(${Math.random() * 360}, ${Math.random() * 100}, ${Math.random() * 100})`);
                svg.appendChild(ellipse);
                break;
            case 'line':
                const line = document.createElementNS(svgNS, 'line');
                line.setAttribute('x1', Math.random() * 100);
                line.setAttribute('y1', Math.random() * 100);
                line.setAttribute('x2', Math.random() * 100);
                line.setAttribute('y2', Math.random() * 100);
                line.setAttribute('stroke', getRandomColor());
                line.setAttribute('stroke-width', Math.random() * (shapeSize / 10));
                svg.appendChild(line);
                break;
            case 'squiggle':
                const path = document.createElementNS(svgNS, 'path');
                let d = `M${Math.random() * 100} ${Math.random() * 100}`;
                const numControlPoints = Math.floor(Math.random() * 3) + 3; // Random number of control points between 3 and 5
                for (let j = 0; j < numControlPoints; j++) {
                    const controlX1 = Math.random() * 100;
                    const controlY1 = Math.random() * 100;
                    const controlX2 = Math.random() * 100;
                    const controlY2 = Math.random() * 100;
                    const endX = Math.random() * 100;
                    const endY = Math.random() * 100;
                    d += ` C${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY}`;
                }
                path.setAttribute('d', d);
                path.setAttribute('stroke', getRandomColor());
                path.setAttribute('stroke-width', Math.random() * (shapeSize / 20)); // Smaller stroke width
                path.setAttribute('fill', 'none');
                svg.appendChild(path);
                squiggleCount++;
                console.log('Squiggle path:', d); // Debugging statement
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

function saveArtAsPNG() {
    const svg = document.querySelector('#art-container svg');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    const scaleFactor = 4; // Increase the scale factor for higher quality
    canvas.width = svg.clientWidth * scaleFactor;
    canvas.height = svg.clientHeight * scaleFactor;

    img.onload = function() {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const pngFile = canvas.toDataURL('image/png');

        const downloadLink = document.createElement('a');
        downloadLink.href = pngFile;
        downloadLink.download = 'art.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
}