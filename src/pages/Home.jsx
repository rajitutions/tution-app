import "../Home.css";
import image from "../assets/20250204_135911.png";
const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <img src={image} alt="Profile" className="profile-image" />
        <h1>Welcome to My Website</h1>
        <p>Discover amazing content and explore new possibilities.</p>
        <button className="explore-button">Explore Now</button>
      </div>
      <div class="elfsight-app-9b7f4d59-e19e-43ac-bf11-8bfc706725e6" data-elfsight-app-lazy></div>

    </div>
  );
};

export default Home;
