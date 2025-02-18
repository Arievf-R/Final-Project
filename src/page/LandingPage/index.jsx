import image1 from "../../assets/LandingPage/landing_page.jpg";

const LandingPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-20 text-center text-white bg-gray-800">
        <img src={image1} alt="image1" className="w-1/2" />
        <h1>
          lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, quas?
        </h1>
        <button className="p-3 text-white bg-blue-500 rounde-lg">
          <a href="/login">Getting Started</a>
        </button>
      </div>
    </>
  );
};

export default LandingPage;
