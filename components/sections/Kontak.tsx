export default function Kontak() {
  return (
    <section id="kontak" className="py-20 bg-white px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* Info Kontak */}
        <div>
          <h2 className="text-3xl font-extrabold mb-4 text-sky-800">Hubungi Kami</h2>
          <p className="text-gray-600 mb-8">Pengurus RT 17 / RW 02 siap membantu Anda. Silakan hubungi melalui kontak berikut atau datang langsung ke lokasi.</p>
          
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="bg-sky-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-sky-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Alamat Kantor Developer</h4>
                <p className="text-sm text-gray-600">Jl. Tembus Mantuil, Basirih No. 51, Kel. Basirih Selatan, Kec. Banjarmasin Selatan, Kota Banjarmasin 70246</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-sky-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-sky-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Telepon / WhatsApp</h4>
                <p className="text-sm text-gray-600">(022) 1234-5678 / 0812-3456-7890</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-sky-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-sky-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Email</h4>
                <p className="text-sm text-gray-600">siwargart17@banjarmasin.go.id</p>
              </div>
            </div>
          </div>
        </div>

        {/* Google Maps Embed Banjarmasin */}
        <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 h-[400px] md:h-full min-h-[400px]">
          <iframe 
            src="https://maps.google.com/maps?q=Basirih%20Selatan,%20Banjarmasin%20Selatan&t=&z=14&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

      </div>
    </section>
  );
}