document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("canvas");
    const gridSize = 20; // Μέγεθος πλέγματος 20x20

    let selectedColor = "#ab0000"; // Προεπιλεγμένο χρώμα
    let selectedStitch = "cross"; // Προεπιλεγμένος τύπος βελονιάς

    // Δημιουργία των κελιών στο πλέγμα
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");

        // Προσθήκη διαδραστικότητας για κάθε κελί
        cell.addEventListener("click", function () {
            cell.style.backgroundColor = selectedColor;
            cell.className = `cell ${selectedStitch}`; // Εφαρμόζει την επιλεγμένη βελονιά
        });

        canvas.appendChild(cell);
    }

    // Επιλογή χρώματος
    document.querySelectorAll(".color-btn").forEach(button => {
        button.addEventListener("click", function () {
            selectedColor = this.style.backgroundColor;
        });
    });

    // Επιλογή τύπου βελονιάς
    document.querySelectorAll(".stitch-btn").forEach(button => {
        button.addEventListener("click", function () {
            selectedStitch = this.getAttribute("data-stitch");
        });
    });

    // Αποθήκευση Καμβά στον Local Storage
    window.saveCanvas = function() {
        const canvasData = [];
        document.querySelectorAll(".cell").forEach(cell => {
            canvasData.push({
                color: cell.style.backgroundColor,
                stitch: cell.className.replace("cell ", "") // Αφαιρεί την κλάση "cell"
            });
        });
        localStorage.setItem("canvasData", JSON.stringify(canvasData));
        alert("Ο καμβάς αποθηκεύτηκε!");
    };

    // Επαναφορά Καμβά από τον Local Storage
    function loadCanvas() {
        const canvasData = JSON.parse(localStorage.getItem("canvasData"));
        if (canvasData) {
            document.querySelectorAll(".cell").forEach((cell, index) => {
                cell.style.backgroundColor = canvasData[index].color;
                cell.className = `cell ${canvasData[index].stitch}`;
            });
        }
    }

    // Λήψη του καμβά ως εικόνα
    window.downloadCanvasAsImage = function() {
        html2canvas(document.getElementById("canvas")).then(canvas => {
            const link = document.createElement("a");
            link.download = "digital_stitching.png";
            link.href = canvas.toDataURL("image/png");
            link.click();
        });
    };

    // Κάλεσε τη loadCanvas όταν φορτώνει η σελίδα
    loadCanvas();
});
