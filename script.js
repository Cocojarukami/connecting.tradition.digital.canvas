body {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: Arial, sans-serif;
    background-color: #f8f8f8;
    margin: 0;
    padding: 20px;
}

h1 {
    color: #333;
}

#color-picker, #stitch-picker {
    margin: 10px;
    display: flex;
    gap: 10px;
}

.color-btn, .stitch-btn {
    width: 30px;
    height: 30px;
    border: none;
    cursor: pointer;
}

#canvas {
    display: grid;
    grid-template-columns: repeat(20, 20px);
    grid-template-rows: repeat(20, 20px);
    gap: 1px;
    margin-top: 20px;
}

.cell {
    width: 20px;
    height: 20px;
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    cursor: pointer;
}

/* Στυλ για διαφορετικές βελονιές */
.cross {
    background-image: url('cross-stitch.png'); /* Αντικατάστησε με το σωστό μοτίβο */
    background-size: cover;
}

.line {
    background-image: url('line-stitch.png'); /* Αντικατάστησε με το σωστό μοτίβο */
    background-size: cover;
}

.dot {
    background-image: url('dot-stitch.png'); /* Αντικατάστησε με το σωστό μοτίβο */
    background-size: cover;
}
