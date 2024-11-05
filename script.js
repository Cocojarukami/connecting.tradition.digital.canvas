document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("canvas");
    const gridSize = 20; // Πλέγμα 20x20

    // Δημιουργία των κελιών στο πλέγμα
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");

        // Προσθήκη διαδραστικότητας για κάθε κελί
        cell.addEventListener("click", function () {
            cell.classList.toggle("selected"); // Εναλλαγή χρώματος
        });

        canvas.appendChild(cell);
    }
});

