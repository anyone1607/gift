import { useState, useEffect } from "react";
import "./App.css";
import "tailwindcss/tailwind.css";

function App() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [luckyAmount, setLuckyAmount] = useState(null);

  const amounts = [10, 20, 50, 100, 200, 500, 1000]; // Các mệnh giá tiền lì xì

  const spinTheWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    const randomIndex = Math.floor(Math.random() * amounts.length);
    const randomDegree = 360 * 5 + randomIndex * (360 / amounts.length); // 5 vòng quay và một bước quay ngẫu nhiên

    setRotation(randomDegree);

    // Sau khi quay xong, hiển thị kết quả
    setTimeout(() => {
      setLuckyAmount(amounts[randomIndex]);
      setIsSpinning(false);
    }, 3000); // 3 giây để hoàn tất vòng quay
  };

  // Đảm bảo vòng quay luôn có hiệu ứng smooth khi quay
  useEffect(() => {
    if (isSpinning) {
      setRotation((prevRotation) => prevRotation + 360); // Thêm một vòng quay nữa để tạo hiệu ứng
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
              transition: isSpinning ? "transform 3s ease-out" : "none", // Thêm hiệu ứng khi quay
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
                <span className="text-white">{amount} VNĐ</span>
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
