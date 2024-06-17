import React from 'react';
import ThreeScene from './ThreeScene.js';


class Map extends React.Component {
    
    render() {
        return (
            <div className="content map">
                <div className="container-body map">
                    <ThreeScene />
                    <div className="map__description-wrapper">
                        <div className="map__help-wrapper">
                            <img src="" alt="" />
                        </div>
                    </div>
                    <div className="body__title map"></div>
                </div>
            </div>
        );
    }
}

export default Map;