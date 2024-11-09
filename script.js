document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("canvas");
    const startButton = document.getElementById("startSimulation");
    const gridSize = 20; // Μέγεθος 20x20
    const selectedColor = "#a40707"; // Χρώμα που θα χρησιμοποιήσουμε για το γέμισμα
    const cells = [];
    let simulationInterval;

    // Δημιουργία κελιών και αρχική κατάσταση
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.status = "empty"; // Αρχική κατάσταση: άδειο

        // Χρωματισμός ή άδειασμα κελιού με κλικ
        cell.addEventListener("click", function () {
            if (cell.dataset.status === "filled") {
                cell.dataset.status = "empty";
                cell.style.backgroundColor = "#ffffff";
            } else {
                cell.dataset.status = "filled";
                cell.style.backgroundColor = selectedColor;
            }
        });

        canvas.appendChild(cell);
        cells.push(cell);
    }

    // Συνάρτηση για να βρει τους γείτονες ενός κελιού (8 γειτονικά κελιά)
    function getNeighbors(index) {
        const neighbors = [];
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue; // Αποφυγή του ίδιου κελιού
                const newRow = row + i;
                const newCol = col + j;
                if (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize) {
                    neighbors.push(newRow * gridSize + newCol);
                }
            }
        }
        return neighbors;
    }

    // Λειτουργία ενημέρωσης του grid με βάση τους κανόνες του Game of Life
    function updateGrid() {
        const newStates = [];

        cells.forEach((cell, index) => {
            const isFilled = cell.dataset.status === "filled";
            const neighbors = getNeighbors(index);
            const filledNeighbors = neighbors.filter(i => cells[i].dataset.status === "filled").length;

            // Κανόνες Game of Life
            if (isFilled && (filledNeighbors < 2 || filledNeighbors > 3)) {
                newStates[index] = "empty"; // Θάνατος από απομόνωση ή υπερπληθυσμό
            } else if (!isFilled && filledNeighbors === 3) {
                newStates[index] = "filled"; // Γέννηση νέου γεμάτου κελιού
            } else {
                newStates[index] = isFilled ? "filled" : "empty"; // Καμία αλλαγή
            }
        });

        // Ενημέρωση των καταστάσεων κελιών
        cells.forEach((cell, index) => {
            cell.dataset.status = newStates[index];
            cell.style.backgroundColor = newStates[index] === "filled" ? selectedColor : "#ffffff";
        });
    }

    // Έναρξη προσομοίωσης με κουμπί
    startButton.addEventListener("click", function () {
        if (simulationInterval) {
            clearInterval(simulationInterval);
            simulationInterval = null;
            startButton.textContent = "Start Simulation";
        } else {
            simulationInterval = setInterval(updateGrid, 1000); // Κάθε 1 δευτερόλεπτο
            startButton.textContent = "Stop Simulation";
        }
    });
});
