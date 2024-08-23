import React from 'react';
import PropTypes from 'prop-types';

const MapViewer = ({ map, mapside, side, pos, rover }) => {
    const cellSize = 20;
    const mapWindow = [];

    const startX = Math.max(0, pos[0]);
    const startY = Math.max(0, pos[1]);
    const endX = Math.min(mapside, startX + side);
    const endY = Math.min(mapside, startY + side);

    for (let y = startY - (pos[1] < 0 ? Math.abs(pos[1]) : 0); y < startY + side && y < mapside; y++) {
        const row = [];
        for (let x = startX - (pos[0] < 0 ? Math.abs(pos[0]) : 0); x < startX + side && x < mapside; x++) {
            let backgroundColor;

            if (x === rover[0] && y === rover[1]) {
                // Rover cell
                backgroundColor = 'blue';
            } else if (x >= startX && x < endX && y >= startY && y < endY) {
                // Inside the map window
                const value = map[y * mapside + x];
                backgroundColor = value === 1 ? 'red' : 'gray';
            } else {
                // Outside the map window
                backgroundColor = 'lightblue';
            }

            row.push(
                <div
                    key={`${x}` - `${y}`}
                    style={{
                        width: `${cellSize}px`,
                        height: `${cellSize}px`,
                        backgroundColor,
                        display: 'inline-block',
                        border: '1px solid #ddd'
                    }}
                />
            );
        }
        mapWindow.push(
            <div key={y} style={{ display: 'flex' }}>
                {row}
            </div>
        );
    }

    return (
        <div>
            {mapWindow}
        </div>
    );
};

MapViewer.propTypes = {
    map: PropTypes.arrayOf(PropTypes.number).isRequired,
    mapside: PropTypes.number.isRequired,
    side: PropTypes.number.isRequired,
    pos: PropTypes.arrayOf(PropTypes.number).isRequired,
    rover: PropTypes.arrayOf(PropTypes.number).isRequired
};

export default MapViewer;