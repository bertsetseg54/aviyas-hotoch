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
          src="https://mail.google.com/mail/u/0?ui=2&ik=c4d190eb69&attid=0.1&permmsgid=msg-f:1844741411388061942&th=1999d68a303cf8f6&view=fimg&fur=ip&permmsgid=msg-f:1844741411388061942&sz=s0-l75-ft&attbid=ANGjdJ_Sfa43MycXdFtvUlmgvwKgcMt0TitmzF8VxIpckBP0rsRYHJXRXRsri2UGHKU8gNIe0_jFXFyyG2QEXSC2y5XRqsWbJ6hGM-FF4th22fCY21bJynYkoOQrnHY&disp=emb&realattid=ii_1999d685ab5e38e167c1&zw"
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
