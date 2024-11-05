document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("canvas");
    const gridSize = 20;
    let selectedColor = "#a40707";
    let selectedStitch = "cross";

    // Δημιουργία των κελιών με SVG
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");

        // Δημιουργία SVG για την βελονιά
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.classList.add("stitch-svg");

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M12 0L15 5H9L12 0Z"); // Παράδειγμα βελονιάς
        path.setAttribute("fill", selectedColor);

        svg.appendChild(path);
        cell.appendChild(svg);

        cell.addEventListener("click", function () {
            path.setAttribute("fill", selectedColor);
            path.setAttribute("d", getStitchPath(selectedStitch)); // Αλλάζει τον τύπο βελονιάς
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

    // Αποθήκευση καμβά
    window.saveCanvas = function() {
        const canvasData = [];
        document.querySelectorAll(".cell path").forEach(path => {
            canvasData.push({
                color: path.getAttribute("fill"),
                d: path.getAttribute("d"),
            });
        });
        localStorage.setItem("canvasData", JSON.stringify(canvasData));
        alert("Ο καμβάς αποθηκεύτηκε!");
    };

    // Λήψη εικόνας καμβά
    window.downloadCanvasAsImage = function() {
        html2canvas(document.getElementById("canvas")).then(canvas => {
            const link = document.createElement("a");
            link.download = "digital_stitching.png";
            link.href = canvas.toDataURL("image/png");
            link.click();
        });
    };

    // Λειτουργία για τη μορφή της βελονιάς
    function getStitchPath(stitchType) {
        if (stitchType === "cross") return "M12 0L15 5H9L12 0Z"; // Σταυροβελονιά
        if (stitchType === "line") return "M5 12H19"; // Γραμμή
        if (stitchType === "dot") return "M12 12m-2,0a2,2 0 1,0 4,0a2,2 0 1,0 -4,0"; // Κύκλος
        return "";
    }
});
