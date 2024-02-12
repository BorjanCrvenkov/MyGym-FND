import React, {useState} from "react";
import "../../styles/businessImagesHoverStyle.css";
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import FileService from "../../service/modelService/FileService";

const BusinessIndexedGymImage = ({file, refreshData, shutdown}) => {
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
            className={`image-container col-2 mb-2 ${isFullscreen ? "fullscreen" : ""}`}
        >
            {isFullscreen && (
                <button className="close-button btn" onClick={exitFullscreen}>
                    Close
                </button>
            )}
            <img src={file.link} className="img-class" style={{width: '250px', height: '200px'}}/>
            {
                !shutdown &&
                <div className="button-container" style={{'margin-left': '-20px'}}>
                    <button className="view-button btn btn-light rounded-4" onClick={enterFullscreen}>
                        View
                    </button>
                    <DeleteConfirmationModal id={file.id} service={new FileService()} text={'image'}
                                             refreshData={refreshData}/>
                </div>
            }
        </div>
    );
};

export default BusinessIndexedGymImage;
