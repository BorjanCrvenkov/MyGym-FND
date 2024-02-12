import React, { useState } from "react";
import "../../styles/businessImagesHoverStyle.css";

const MemberIndexedGymImage = ({ file, refreshData }) => {
    const [isFullscreen, setIsFullscreen] = useState(false);

    const enterFullscreen = () => {
        setIsFullscreen(true);
        const imageContainer = document.getElementById(`image-container-${file.id}`);
        if (imageContainer) {
            if (imageContainer.requestFullscreen) {
                imageContainer
                    .requestFullscreen()
                    .catch((error) => console.error("Failed to enter fullscreen mode:", error));
            } else if (imageContainer.mozRequestFullScreen) {
                imageContainer.mozRequestFullScreen();
            } else if (imageContainer.webkitRequestFullscreen) {
                imageContainer.webkitRequestFullscreen();
            } else if (imageContainer.msRequestFullscreen) {
                imageContainer.msRequestFullscreen();
            }
        }
    };

    const exitFullscreen = () => {
        setIsFullscreen(false);
        if (document.exitFullscreen) {
            document
                .exitFullscreen()
                .catch((error) => console.error("Failed to exit fullscreen mode:", error));
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    };

    return (
        <div
            id={`image-container-${file.id}`}
            className={`image-container col-2 ${isFullscreen ? "fullscreen" : ""}`}
            style={{'margin-left': '30px', 'margin-top': '-200px'}}
        >
            {isFullscreen && (
                <button className="close-button btn" onClick={exitFullscreen}>
                    Close
                </button>
            )}
            <img src={file.link} className="img-class rounded-4" />
            <div className="button-container">
                <button className="view-button btn btn-light rounded-4" onClick={enterFullscreen} style={{'margin-top': '-170px', 'margin-left': '20px', height: '50px'}}>
                    View
                </button>
            </div>
        </div>
    );
};

export default MemberIndexedGymImage;
