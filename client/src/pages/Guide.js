import React from "react";
import Header from "../components/common/Header";
import Background from "../components/common/Background";

const Guide = () => {
		return (
			<Background>
				<Header />
								<main className="max-w-3xl mx-auto px-2 py-4 md:px-4 md:py-8">
									<div className="flex justify-center mb-4 md:mb-6">
										<h1 className="text-2xl md:text-3xl font-bold text-center px-4 py-3 md:px-8 md:py-4 rounded-2xl shadow-lg" style={{ backgroundColor: '#F0BE01', color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.10)' }}>
											Petunjuk Permainan EcoSCha
										</h1>
									</div>
									<div className="bg-white rounded-2xl shadow-lg p-3 md:p-6 space-y-4 md:space-y-6">
										<section>
											<h2 className="text-lg md:text-xl font-semibold mb-2">Tujuan Permainan</h2>
											<p className="text-gray-700 text-sm md:text-base">EcoSCha adalah permainan kartu edukasi lingkungan yang dimainkan secara kelompok. Setiap pemain mendapatkan peran dan berpartisipasi dalam diskusi, voting, dan aksi untuk mencapai tujuan keberlanjutan.</p>
										</section>
										<section>
											<h2 className="text-lg md:text-xl font-semibold mb-2">Alur Permainan</h2>
											<ol className="list-decimal list-inside text-gray-700 space-y-1 text-sm md:text-base">
												<li>Scan QR untuk masuk ke room permainan.</li>
												<li>Moderator membagikan peran dan kode room.</li>
												<li>Setiap pemain membaca penjelasan peran masing-masing.</li>
												<li>Permainan dimulai dengan narasi, diskusi, dan voting.</li>
												<li>Pemain melakukan aksi sesuai peran dan instruksi moderator.</li>
												<li>Permainan berakhir dengan evaluasi dan leaderboard.</li>
											</ol>
										</section>
										<section>
											<h2 className="text-lg md:text-xl font-semibold mb-2">Tips Bermain</h2>
											<ul className="list-disc list-inside text-gray-700 space-y-1 text-sm md:text-base">
												<li>Baca peran dan instruksi dengan teliti.</li>
												<li>Diskusikan strategi bersama tim.</li>
												<li>Jaga sportivitas dan semangat belajar.</li>
												<li>Gunakan fitur voting dan leaderboard untuk evaluasi.</li>
											</ul>
										</section>
									</div>
								</main>
			</Background>
		);
};

export default Guide;
