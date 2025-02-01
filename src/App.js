import { useState, useEffect } from "react";
import "./App.css";
import "tailwindcss/tailwind.css";

function App() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [luckyAmount, setLuckyAmount] = useState(null);

  const amounts = [1000, 5000, 10000, 15000, 20000, 0, "Cúc"];
  const images = [
    "https://img.lovepik.com/photo/20211119/small/lovepik-1000-vietnam-shield-picture_500186405.jpg",
    "https://gonatour.vn/vnt_upload/news/05_2020/tien_5000_dong_viet_nam.jpg",
    "https://upload.wikimedia.org/wikipedia/vi/thumb/3/32/%C4%90%E1%BB%93ng_b%E1%BA%A1c_10.000_%C4%91%E1%BB%93ng.jpg/300px-%C4%90%E1%BB%93ng_b%E1%BA%A1c_10.000_%C4%91%E1%BB%93ng.jpg",
    "",
    "https://baoxaydung.com.vn/stores/news_dataimages/vananh/072016/06/10/100839baoxaydung_image009.jpg",
    "https://steamuserimages-a.akamaihd.net/ugc/947327626495107891/03AC098D1A4EBCE4735A7B5B534110D4731F665B/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
    "https://steamuserimages-a.akamaihd.net/ugc/947327626495107891/03AC098D1A4EBCE4735A7B5B534110D4731F665B/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
  ];

  const spinTheWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    const randomIndex = Math.floor(Math.random() * amounts.length);
    const randomDegree = 360 * 5 + randomIndex * (360 / amounts.length);

    setRotation(randomDegree);
    setTimeout(() => {
      setLuckyAmount(amounts[randomIndex]);
      setIsSpinning(false);
    }, 3000);
  };

  useEffect(() => {
    if (isSpinning) {
      setRotation((prevRotation) => prevRotation + 360);
    }
  }, [isSpinning]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Vòng Quay Lì Xì</h1>
        <div className="relative inline-block">
          <div
            className="wheel"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning ? "transform 3s ease-out" : "none",
            }}
          >
            {amounts.map((amount, index) => (
              <div
                key={index}
                className="wheel-section"
                style={{
                  transform: `rotate(${(360 / amounts.length) * index}deg)`,
                  backgroundColor: index % 2 === 0 ? "#ff4b5c" : "#ff6b81",
                }}
              >
                <img
                  src={images[index]}
                  alt={`${amount} VNĐ`}
                  className="w-16 h-16 object-contain mx-auto"
                />
                <span className="text-white text-sm">{amount} VNĐ</span>
              </div>
            ))}
          </div>
          <button
            onClick={spinTheWheel}
            className="absolute inset-0 flex items-center justify-center w-16 h-16 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 disabled:opacity-50"
            disabled={isSpinning}
          >
            {isSpinning ? "Đang quay..." : "Quay"}
          </button>
        </div>
        {luckyAmount !== null && (
          <div className="mt-4 text-xl font-semibold text-green-500">
            Bạn nhận được: {luckyAmount} VNĐ
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
