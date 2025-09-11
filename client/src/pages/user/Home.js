import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../../components/Navbar'
import Main from '../../components/Main'
import { MdCheckCircle, MdWhatsapp, MdOutlineScore } from 'react-icons/md'
import { FaFileAlt, FaClock } from "react-icons/fa";
import { FiGlobe } from "react-icons/fi";
import { NavLink } from 'react-router-dom'

const Home = () => {
  const scrollRef = useRef(null);
  const scrollRefUp = useRef(null);
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Observer untuk deteksi jika section terlihat di layar
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Autoscroll ke bawah (kolom 2)
  useEffect(() => {
  let interval;
    const isDesktop = window.innerWidth > 768;

    if (isVisible && scrollRef.current && isDesktop) {
      interval = setInterval(() => {
        scrollRef.current.scrollBy({ top: 1, behavior: 'smooth' });
        if (
          scrollRef.current.scrollTop + scrollRef.current.clientHeight >=
          scrollRef.current.scrollHeight
        ) {
          scrollRef.current.scrollTop = 0;
        }
      }, 30);
    }

    return () => clearInterval(interval);
  }, [isVisible]);


  // Autoscroll ke atas (kolom 3)
  useEffect(() => {
    let interval;
    const isDesktop = window.innerWidth > 768;

    if (isVisible && scrollRefUp.current && isDesktop) {
      interval = setInterval(() => {
        scrollRefUp.current.scrollBy({ top: -1, behavior: 'smooth' });
        if (scrollRefUp.current.scrollTop <= 0) {
          scrollRefUp.current.scrollTop =
            scrollRefUp.current.scrollHeight - scrollRefUp.current.clientHeight;
        }
      }, 30);
    }

    return () => clearInterval(interval);
  }, [isVisible]);

  const phoneNumber = "6285267388073"; // Ganti dengan nomor WA tujuan
  const message = "Halo, saya ingin mendaftar kursus TOEFL intensif Via Zoom."; // Pesan default

  const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <>
      <Navbar />
      <Main>
        {/* Hero Section */}
        <section id="daftar" className='container mx-auto'>
          <div className="grid sm:grid-cols-2 gap-x-7 py-[30px]">
          <div className='flex items-center justify-center '>
            <div>
              <h1 className='text-[#002147] font-bold sm:text-6xl text-4xl text-center sm:mt-6 mt-2'>Belajar TOEFL Via Zoom Di</h1>
              <h1 className='text-[#101566] font-bold sm:text-6xl text-center text-4xl sm:mt-6 mt-2'>Yanto Tanjung</h1>
              <h1 className='text-[#FFD700] font-bold sm:text-6xl text-center text-4xl sm:mt-6 mt-2'>English Academy</h1>
              <h1 className='text-[#5B6D84] text-center mt-6 sm:text-2xl'>TOEFL’s Easy When We Learn Together!</h1>
              <div className='grid sm:grid-cols-2 gap-4 sm:px-[70px] mt-6'>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sm:text-[18px] text-sm mt-4 w-full bg-[#002147] text-[#FFFFFF] text-center font-bold p-2 py-3 rounded-[12px] shadow-xl"
                >
                  Daftar Kursus
                </a>
                <NavLink
                  to="/paketsoal"
                  className="sm:text-[18px] text-sm sm:mt-4 w-full bg-white text-[#5B6D84] text-center font-bold p-2 py-3 rounded-[12px] shadow-[0_4px_12px_rgba(0,0,0,0.20)] transition duration-300"
                >
                  Mulai Simulasi TOEFL
                </NavLink>

              </div>
            </div>
          </div>
          <div className='flex items-center justify-center sm:mt-0 mt-5'>
            <img
              className="w-[400px] h-auto rounded-xl"
              src="/assets/img/home/dayanto-home.png"
              alt="Foto"
            />
          </div>
        </div>
        </section>
        

        {/* Fasilitan Section */}
        <section id="fasilitas" className='container mx-auto'>
          <div className='pt-8 pb-16'>
          <h1 className='text-[#002147] font-bold sm:text-5xl text-3xl sm:mb-10 mb-5'>Fasilitas yang Disediakan</h1>

          <div className="grid sm:grid-cols-4 gap-4">
            <div className='bg-[#002147] rounded-md text-center px-4 py-10 '>
              <div className='flex justify-center'>
                <div className="relative bg-[#FFD700] flex items-center 
                justify-center rounded-md shadow-md px-4 py-1">
                  {/* Gambar di tengah */}
                  <img
                    src="/assets/img/home/icon-toefl.png"
                    alt="Icon"
                    className="w-[80px] h-[90px] object-contain"
                  />

                  {/* Angka di sudut kanan atas */}
                  <div className="absolute -top-3 p-4 text-lg -right-2 bg-[#002147] text-white w-6 h-6 flex items-center justify-center rounded-full font-semibold">
                    1
                  </div>
                </div>
              </div>
              <h1 className='font-bold text-xl text-[#FFD700] mt-5'>Gratis 1x Simulasi Tes TOEFL Online</h1>
              <h1 className='text-md text-[#FFFFFF] mt-2'>Dapatkan kesempatan mencoba 1x simulasi tes TOEFL online secara gratis untuk mengukur kemampuan awal dan mengenal format TOEFL yang sebenarnya.</h1>
            </div>

            <div className='bg-[#002147] rounded-md text-center px-4 py-10 '>
              <div className='flex justify-center'>
                <div className="relative bg-[#FFD700] flex items-center 
                justify-center rounded-md shadow-md px-4 py-1">
                  {/* Gambar di tengah */}
                  <img
                    src="/assets/img/home/icon-camera.png" // Ganti dengan path gambarmu
                    alt="Icon"
                    className="w-[80px] h-[90px] object-contain"
                  />

                  {/* Angka di sudut kanan atas */}
                  <div className="absolute -top-3 p-4 text-lg -right-2 bg-[#002147] text-white w-6 h-6 flex items-center justify-center rounded-full font-semibold">
                    2
                  </div>
                </div>
              </div>
              <h1 className='font-bold text-xl text-[#FFD700] mt-5'>20 Kali Pertemuan / 90 Menit</h1>
              <h1 className='text-md text-[#FFFFFF] mt-2'>Kelas intensif selama 20 pertemuan dengan durasi masing-masing 90 menit, dirancang agar peserta benar-benar memahami setiap aspek penting dalam ujian TOEFL.</h1>
            </div>

            <div className='bg-[#002147] rounded-md px-4 py-10'>
              <div className='flex justify-center'>
                <div className="relative bg-[#FFD700] flex items-center 
                justify-center rounded-md shadow-md px-4 py-1">
                  {/* Gambar di tengah */}
                  <img
                    src="/assets/img/home/icon-files.png" // Ganti dengan path gambarmu
                    alt="Icon"
                    className="w-[80px] h-[90px] object-contain"
                  />

                  {/* Angka di sudut kanan atas */}
                  <div className="absolute -top-3 p-4 text-lg -right-2 bg-[#002147] text-white w-6 h-6 flex items-center justify-center rounded-full font-semibold">
                    3
                  </div>
                </div>
              </div>
              <h1 className='font-bold text-xl text-[#FFD700] mt-5 text-center'>Materi Lengkap: E-Book, Audio, dan PPT</h1>
              
              
              <h1 className='text-md text-[#FFFFFF] mt-2'>Kamu akan mendapatkan:</h1>
              <div className='flex justify-center'>
                <ul className='list-disc px-4 marker:text-[#FFFFFF]'>
                  <li><h1 className=' text-md text-[#FFFFFF]'>Materi E-Book TOEFL</h1></li>
                  <li><h1 className=' text-md text-[#FFFFFF]'>Audio Listening</h1></li>
                  <li><h1 className=' text-md text-[#FFFFFF]'>PPT Setiap Pertemuan</h1></li>
                  <li><h1 className=' text-md text-[#FFFFFF]'>PPT Ringkasan Seluruh Skill</h1></li>
                </ul>
              </div>
            </div>

            <div className='bg-[#002147] rounded-md text-center px-4 py-10'>
              <div className='flex justify-center'>
                <div className="relative bg-[#FFD700] flex items-center 
                justify-center rounded-md shadow-md px-4 py-1">
                  {/* Gambar di tengah */}
                  <img
                    src="/assets/img/home/icon-rec.png" // Ganti dengan path gambarmu
                    alt="Icon"
                    className="w-[80px] h-[90px] object-contain"
                  />

                  {/* Angka di sudut kanan atas */}
                  <div className="absolute -top-3 p-4 text-lg -right-2 bg-[#002147] text-white w-6 h-6 flex items-center justify-center rounded-full font-semibold">
                    4
                  </div>
                </div>
              </div>
              <h1 className='font-bold text-xl text-[#FFD700] mt-5'>Rekaman Zoom 20 Kali Pertemuan</h1>
              <h1 className='text-md text-[#FFFFFF] mt-2'>Tidak sempat ikut kelas? Tenang! Seluruh sesi Zoom direkam dan bisa kamu akses kapan saja untuk review ulang materi.</h1>
            </div>
          </div>
          {/* bagian bawah */}
          <div className="flex sm:flex-row flex-col justify-center gap-4 mt-4">
            <div className='bg-[#002147] rounded-md text-center px-4 py-10 sm:w-[285px] w-full'>
              <div className='flex justify-center'>
                <div className="relative bg-[#FFD700] flex items-center 
                justify-center rounded-md shadow-md px-4 py-1">
                  <img
                    src="/assets/img/home/icon-qa.png" // Ganti dengan path gambarmu
                    alt="Icon"
                    className="w-[80px] h-[90px] object-contain"
                  />
                  <div className="absolute -top-3 p-4 text-lg -right-2 bg-[#002147] text-white w-6 h-6 flex items-center justify-center rounded-full font-semibold">
                    5
                  </div>
                </div>
              </div>
              <h1 className='font-bold text-xl text-[#FFD700] mt-5'>Sesi Tanya Jawab Gratis via WhatsApp</h1>
              <h1 className='text-md text-[#FFFFFF] mt-2'>Konsultasi seputar TOEFL, IELTS, TOEIC, dan berbagai tes Bahasa Inggris lainnya secara fleksibel lewat WhatsApp—langsung bersama Pak Yanto Tanjung.</h1>
            </div>
            <div className='bg-[#002147] rounded-md text-center px-4 py-10 sm:w-[285px] w-full'>
              <div className='flex justify-center'>
                <div className="relative bg-[#FFD700] flex items-center 
                justify-center rounded-md shadow-md px-4 py-1">
                  <img
                    src="/assets/img/home/icon-consult.png" // Ganti dengan path gambarmu
                    alt="Icon"
                    className="w-[80px] h-[90px] object-contain"
                  />
                  <div className="absolute -top-3 p-4 text-lg -right-2 bg-[#002147] text-white w-6 h-6 flex items-center justify-center rounded-full font-semibold">
                    6
                  </div>
                </div>
              </div>
              <h1 className='font-bold text-xl text-[#FFD700] mt-5'>Konsultasi Beasiswa Luar Negeri</h1>
              <h1 className='text-md text-[#FFFFFF] mt-2'>Dapatkan bimbingan gratis untuk mencari dan mendaftar beasiswa luar negeri: mulai dari strategi pendaftaran, persiapan dokumen, hingga tips interview.</h1>
            </div>
            <div className='bg-[#002147] rounded-md text-center px-4 py-10 sm:w-[285px] w-full'>
              <div className='flex justify-center'>
                <div className="relative bg-[#FFD700] flex items-center 
                justify-center rounded-md shadow-md px-4 py-1">
                  <img
                    src="/assets/img/home/icon-tanya-jawab.png" // Ganti dengan path gambarmu
                    alt="Icon"
                    className="w-[80px] h-[90px] object-contain"
                  />
                  <div className="absolute -top-3 p-4 text-lg -right-2 bg-[#002147] text-white w-6 h-6 flex items-center justify-center rounded-full font-semibold">
                    7
                  </div>
                </div>
              </div>
              <h1 className='font-bold text-xl text-[#FFD700] mt-5'>Konsultasi Kesulitan Bahasa Inggris</h1>
              <h1 className='text-md text-[#FFFFFF] mt-2'>Kesulitan memahami grammar, vocab, atau strategi soal? Kamu bisa konsultasi langsung di luar kelas tanpa biaya tambahan.</h1>
            </div>
            
        </div>

        </div>
        </section>

        {/* Tentang Pengajar Section */}
        {/* <div>
          <div className="grid sm:grid-cols-2 gap-4 py-8">
            <div>
              <div className="inline-block relative">
                <h1 className="text-3xl font-bold text-[#002147]">Tentang Pengajar</h1>
                <svg
                  viewBox="0 0 200 20"
                  className="absolute left-0 -bottom-3 w-full h-3"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 10 Q50 20 100 10 T200 10"
                    stroke="#FFD700"
                    strokeWidth="4"
                    fill="transparent"
                  />
                </svg>
              </div>

            </div>
            <div>09</div>
          </div>
        </div> */}

        {/* Alasan Ikut Kursus */}
        <section id='profile' className='container mx-auto mb-20'>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="">
              <img src="/assets/img/home/gbr-alasan.png" alt="Deskripsi Gambar" className="w-[500px] h-auto" />
            </div>
            <div className="">
              <div>
                <div className="inline-block relative">
                  <h1 className="text-4xl font-bold text-primary">
                    5 Alasan mengapa sebaiknya kamu ikut kursus ini
                  </h1>
                </div>
              </div>
              <div className='flex flex-col gap-5 mt-8'>
                <div className='relative bg-[#F6F7F9] rounded-xl px-8 py-2'>
                  <span className='absolute -left-4 top-0 bg-[#FBD300] text-primary font-bold border-4 border-white rounded-full w-10 h-10 flex items-center justify-center text-sm shadow-md'>
                    1
                  </span>

                  <h1 className='text-primary font-bold text-lg text-justify'>
                    Pak Yanto adalah dosen Bahasa Inggris dengan pengalaman mengajar lebih dari 25 tahun.
                  </h1>
                </div>

                <div className='relative bg-[#F6F7F9] rounded-xl px-8 py-2'>
                  <span className='absolute -left-4 top-0 bg-[#FBD300] text-primary font-bold border-4 border-white rounded-full w-10 h-10 flex items-center justify-center text-sm shadow-md'>
                    2
                  </span>

                  <h1 className='text-primary font-bold text-lg text-justify'>
                    Pak Yanto adalah Dosen Bahasa Inggris dengan latar belakang S1, S2, S3 
  Pendidikan bahasa Inggris.
                  </h1>
                </div>

                <div className='relative bg-[#F6F7F9] rounded-xl px-8 py-2'>
                  <span className='absolute -left-4 top-0 bg-[#FBD300] text-primary font-bold border-4 border-white rounded-full w-10 h-10 flex items-center justify-center text-sm shadow-md'>
                    3
                  </span>

                  <h1 className='text-primary font-bold text-lg text-justify'>
                    Pak Yanto pernah kuliah di tiga universitas di Australia yakni 
  Flinders University, Murdoch University dan Edith Cowan University.
                  </h1>
                </div>

                <div className='relative bg-[#F6F7F9] rounded-xl px-8 py-2'>
                  <span className='absolute -left-4 top-0 bg-[#FBD300] text-primary font-bold border-4 border-white rounded-full w-10 h-10 flex items-center justify-center text-sm shadow-md'>
                    4
                  </span>

                  <h1 className='text-primary font-bold text-lg text-justify'>
                    Pak Yanto adalah penulis buku 7 Kebiasaan Belajar Bahasa Inggris yang Efektif 
  dan 17 buku lainnya.
                  </h1>
                </div>

                <div className='relative bg-[#F6F7F9] rounded-xl px-8 py-2'>
                  <span className='absolute -left-4 top-0 bg-[#FBD300] text-primary font-bold border-4 border-white rounded-full w-10 h-10 flex items-center justify-center text-sm shadow-md'>
                    5
                  </span>

                  <h1 className='text-primary font-bold text-lg text-justify'>
                    Pak Yanto Menggunakan Psikologi Pendidikan sebagai basis pengajarannya.
                  </h1>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Testimoni Section */}
        <section id='testimoni' className='bg-primary mb-20' ref={containerRef}>
          <div className='container mx-auto'>
            <div className="grid sm:grid-cols-3 gap-4">
              
              {/* Kolom 1: Deskripsi */}
              <div className='flex flex-col justify-center gap-8'>
                <h1 className='font-bold text-[42px]'>
                  <span className='text-white'>Ribuan orang telah terbantu lewat pembelajaran</span>{' '}
                  <span className='text-[#FBD300]'>Yanto Tanjung</span>
                </h1>
                <h1 className='text-white text-justify text-lg'>
                  Banyak yang berhasil meraih skor TOEFL 500–600, lolos beasiswa LPDP, tes TBI BUMN, hingga melanjutkan studi ke Australia.
                </h1>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg transition w-fit"
                >
                  <MdWhatsapp size={20} />
                  Hubungi 0852-6738-8073
                </a>

              </div>

              {/* Kolom 2: Scroll ke bawah */}
              <div
                ref={scrollRefUp}
                className=' pt-6 flex flex-col gap-4 max-h-[600px] pr-2 overflow-y-auto scrollbar-hide'
              >
                <img src='/assets/img/home/testi-1.png' className='rounded-lg' />
                <img src='/assets/img/home/testi-2.png' className='rounded-lg' />
                <img src='/assets/img/home/testi-3.png' className='rounded-lg' />
                <img src='/assets/img/home/testi-4.png' className='rounded-lg' />
                <img src='/assets/img/home/testi-5.png' className='rounded-lg' />
                <img src='/assets/img/home/testi-6.png' className='rounded-lg' />
                <img src='/assets/img/home/testi-7.jpg' className='rounded-lg' />
              </div>

              {/* Kolom 3: Scroll ke atas */}
              <div
                ref={scrollRef}
                className=' pt-6 flex flex-col gap-4 max-h-[600px] pr-2 overflow-y-auto scrollbar-hide'
              >
                <img src='/assets/img/home/testi-7.jpg' className='rounded-lg' />
                <img src='/assets/img/home/testi-8.jpg' className='rounded-lg' />
                <img src='/assets/img/home/testi-9.jpg' className='rounded-lg' />
                <img src='/assets/img/home/testi-10.jpg' className='rounded-lg' />
                <img src='/assets/img/home/testi-11.jpg' className='rounded-lg' />
                <img src='/assets/img/home/testi-12.jpg' className='rounded-lg' />
              </div>
            </div>
          </div>
        </section>

        {/* Membership Section */}
        <section id='berlangganan' className='container mx-auto pb-10'>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className='sm:col-span-2 flex items-center'>
              <div className='sm:pe-20'>
                <h1 className="sm:text-4xl text-2xl font-bold text-primary text-justify">
                  Belum siap ikut kursus TOEFL? Ayo mulai dengan Berlangganan YouTube Yanto Tanjung
                </h1>
                <p className='mt-6 text-justify mb-6'>Dapatkan akses ke konten eksklusif yang dirancang untuk bantu kamu memahami dasar-dasar TOEFL, meningkatkan skill listening, reading, hingga writing semuanya dengan pendekatan yang santai, jelas, dan mudah dipahami.</p>
                <a
                  href={"https://www.youtube.com/@Yantotanjung/join"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-6 inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-lg transition w-fit"
                >
                  Berlangganan Sekarang
                </a>

                <h1 className='text-primary font-bold text-lg text-justify mb-3'>
                  Gabung sekarang dan nikmati manfaat berikut:
                </h1>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className='bg-[#F6F7F9] rounded-xl flex justify-center py-6'>
                    <div className='w-[300px]'>
                      <div className='flex items-center gap-3'>
                        <MdCheckCircle size={24} color="#101566" />
                        <h1 className='text-primary font-semibold'>Akses ke semua video eksklusif</h1>
                      </div>
                        <br/>
                      <h1 className='text-justify'>Tonton seluruh video pembelajaran khusus member yang tidak tersedia di publik</h1>
                    </div>
                  </div>
                  <div className='bg-[#F6F7F9] rounded-xl flex justify-center py-6'>
                    <div className='w-[300px]'>
                      <div className='flex items-center gap-3'>
                        <MdCheckCircle size={30} color="#101566" />
                        <h1 className='text-primary font-semibold'>Minta materi PDF, PPT, dan Audio listening.</h1>
                      </div>
                      <h1 className='text-justify'>Dapatkan File belajar lengkap yang bisa kamu unduh.</h1>
                    </div>
                  </div>
                  <div className='bg-[#F6F7F9] rounded-xl flex justify-center py-6'>
                    <div className='w-[300px]'>
                      <div className='flex items-center gap-3'>
                        <MdCheckCircle size={30} color="#101566" />
                        <h1 className='text-primary font-semibold'>Komentar akan diprioritaskan untuk dijawab</h1>
                      </div>
                      <h1 className='text-justify'>Punya pertanyaan? Komentarmu akan jadi prioritas untuk dijawab langsung oleh pak Yanto.</h1>
                    </div>
                  </div>
                  <div className='bg-[#F6F7F9] rounded-xl flex justify-center py-6'>
                    <div className='w-[300px]'>
                      <div className='flex items-center gap-3'>
                        <MdCheckCircle size={30} color="#101566" />
                        <h1 className='text-primary font-semibold'>Ikut Live Streaming Gratis</h1>
                      </div>
                      <br/>
                      <h1 className='text-justify'>Ikuti sesi live eksklusif, tanya jawab langsung, dan bahas soal TOEFL bareng secara real-time.</h1>
                    </div>
                  </div>
                  <div className='bg-[#F6F7F9] rounded-xl flex justify-center py-6'>
                    <div className='w-[300px]'>
                      <div className='flex items-center gap-3'>
                        <MdCheckCircle size={30} color="#101566" />
                        <h1 className='text-primary font-semibold'>Video baru upload setiap bulan</h1>
                      </div>
                      <br/>
                      <h1 className='text-justify'>Dapatkan update materi secara rutin setiap bulan.</h1>
                    </div>
                  </div>
                  <div className='bg-[#F6F7F9] rounded-xl flex justify-center py-6'>
                    <div className='w-[300px]'>
                      <div className='flex items-center gap-3'>
                        <MdCheckCircle size={30} color="#101566" />
                        <h1 className='text-primary font-semibold'>Langganan bisa stop kapan saja</h1>
                      </div>
                      <br/>
                      <h1 className='text-justify'>Kamu bebas berhenti kapan pun kamu mau.</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex items-center'>
              <img
                className="rounded-xl"
                src="/assets/img/home/gbr-membership.png"
                alt="Foto"
              />
            </div>
          </div>
        </section>

        {/* Simulasi Section */}
        <div className="grid sm:grid-cols-2 gap-4 container mx-auto pb-10">
          <div className='flex items-center'>
            <div>
              <h1 className="sm:text-4xl text-2xl font-bold text-[#FBD300] text-justify">
                Simulasi TOEFL Online
              </h1>
              <h1 className="sm:text-4xl text-2xl font-bold text-primary ">
                Uji kemampuanmu sebelum menghadapi tes sesungguhnya!
              </h1>
              <div className='flex sm:justify-start justify-center'>
                <NavLink
                  to="/paketsoal"
                  className="inline-flex w-fit sm:text-[18px] text-sm mt-4 bg-white text-[#5B6D84] text-center font-bold px-4 py-4 rounded-[12px] shadow-[0_4px_12px_rgba(0,0,0,0.20)] transition duration-300"
                >
                  Mulai Simulasi TOEFL
                </NavLink>
              </div>
            </div>
          </div>
          <div className='grid sm:grid-cols-2 shadow-xl'>
            <div className='border-l border-t sm:border-b border-r flex items-center justify-center py-6 px-10'>
              <div>
                <div className='flex justify-center'>
                  <FaFileAlt size={50} color="#3B82F6" />
                </div>
                <h1 className='text-primary text-lg font-bold mt-3'>Soal asli setara TOEFL</h1>
              </div>
            </div>
            <div className='border-t border-r border-b border-l flex items-center justify-center py-6 px-10'>
              <div>
                <div className='flex justify-center'>
                  <FaClock size={50} color="#3B82F6" />
                </div>
                <h1 className='text-primary text-lg font-bold mt-3 text-center'>Waktu terbatas seperti ujian resmi</h1>
              </div>
            </div>
            <div className='border-l border-b border-r flex items-center justify-center py-6 px-10'>
              <div>
                <div className='flex justify-center'>
                  <MdOutlineScore size={50} color="#3B82F6" />
                </div>
                <h1 className='text-primary text-lg font-bold text-center'>Skor otomatis setelah selesai</h1>
              </div>
            </div>
            <div className='border-r border-b flex items-center justify-center py-6 px-10'>
              <div>
                <div className='flex justify-center'>
                  <FiGlobe size={50} color="#3B82F6" />
                </div>
                <h1 className='text-primary text-lg font-bold text-center'>Bisa diakses kapan saja, dari mana saja</h1>
              </div>
            </div>
          </div>
        </div>

        

      </Main>
    </>
  )
}

export default Home