export default function Feedback() {
  return (
    <div className="w-full h-[900px] flex flex-col justify-center items-center bg-gray-50">
      {/* Гарчиг */}
      <h1 className="text-3xl font-semi bold text-gray-900 mb-8 relative inline-block">
        Хамгийн Хамгийн Багш тодруулах санал асуулга
      </h1>

      {/* QR код карт */}
      <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center gap-10">
        <img
          src="1000022659.jpg"
          alt="QR"
          className="w-[300px] h-[300px] object-contain"
        />
        <p className="mt-4 text-gray-600 text-lg text-center">
          Санал өгөхийн тулд QR кодыг уншуулна уу 📱
        </p>
      </div>
    </div>
  );
}
