const gridWidth = 1000;
const gridHeight = 650;

const rows = 50;
const columns = Math.round(rows * (gridWidth/gridHeight));


const colors = [
    "#00ff00",//green
    "#ff0000",//red
    "#0066ff",//blue
    "#ff3399",//pink
    "#00ffff",//lightblue
    "#993300",//brown
    "#003300",//darkgreen
    "#ffcc66",//lightyellow
    "#ffff00",//yellow
];

const statuses = {
    STARTPOINT: 'startpoint',
    ENDPOINT: 'endpoint',
    BARRIERS: 'barriers'
}

export {gridWidth,gridHeight,rows,columns,colors, statuses}
