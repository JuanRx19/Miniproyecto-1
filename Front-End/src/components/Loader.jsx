import BeatLoader from 'react-spinners/BeatLoader';
import '../assets/styles/Loader.css';

const Loader = ({ loading }) => {
    if (!loading) return null;

    return (
        <div className="overlay">
            <div className="loader-container">
                <BeatLoader color={"#ffffff"} loading={loading} size={15} />
            </div>
        </div>
    );
};

export default Loader;
