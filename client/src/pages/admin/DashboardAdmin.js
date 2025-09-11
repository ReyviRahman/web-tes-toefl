import React from 'react';
import { useEffect, useState } from 'react';
import { FaUsers, FaCheckCircle} from "react-icons/fa";
import { PiExamFill } from "react-icons/pi";
import { AiFillDollarCircle } from "react-icons/ai";
import { MdAccessTimeFilled } from "react-icons/md";
import { HiUserAdd } from "react-icons/hi";
import { BsCreditCardFill } from "react-icons/bs";
import axios from 'axios';
import Swal from 'sweetalert2';

const StatCard = ({ icon, title, value, note, colorClass }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md flex items-center">
      <div className={`p-3 rounded-full mr-4 ${colorClass}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
        {/* --- Perbaikan: Tambahkan whitespace-nowrap untuk mencegah teks turun baris --- */}
        <p className="text-2xl font-bold text-slate-900 dark:text-slate-200 whitespace-nowrap">{value}</p>
        {note && <p className="text-xs text-red-400 dark:text-red-500 mt-1">{note}</p>}
      </div>
    </div>
  );
};

const UsersIcon = () => <FaUsers color='white' />;
const PackageIcon = () => <PiExamFill color='white'/>;
const MoneyIcon = () => <AiFillDollarCircle color='white'/>;
const ClockIcon = () => <MdAccessTimeFilled color='white'/>;
const CheckCircleIcon = () => <FaCheckCircle color='green' />;
const UserAddIcon = () => <HiUserAdd color='blue' />;
const PaymentIcon = () => <BsCreditCardFill color='purple' />;


const DashboardAdmin = () => {
  const [data, setData] = useState(null);

  const fetchDashboard = async () => {
    Swal.fire({
      title: "Memuat data dashboard...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/admin/dashboard`, {
        withCredentials: true, 
      });

      setData(res.data);
      Swal.close();
    } catch (err) {
      Swal.fire("Error", "Gagal mengambil data dashboard", "error");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  // --- Data Dummy ---
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 1250,
    simulationsDone: 890,
    totalPackages: 15,
    pendingPayments: 3,
    monthlyRevenue: 500000,
    bestSellingPackages: [
      { id: 1, name: 'Paket A Prediction Level', sold: 150 },
      { id: 2, name: 'Paket A ITP Level', sold: 85 },
      { id: 3, name: 'Paket B ITP Level', sold: 62 },
    ],
    recentActivities: [
      { id: 1, type: 'simulation', text: 'Budi baru saja menyelesaikan Simulasi TOEFL 1 dengan skor 550.' },
      { id: 2, type: 'register', text: 'Anita baru saja mendaftar.' },
      { id: 3, type: 'payment', text: 'Reyvi baru saja melakukan pembayaran.' },
    ]
  });



  return (
    <div>
      <h2 className="text-2xl mb-4 font-bold text-slate-800 dark:text-slate-200">Dashboard Admin</h2>
      
      {/* --- Grid untuk Kartu Statistik --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard 
          icon={<UsersIcon />}
          title="Total Pengguna"
          value={data?.totalUsers.toLocaleString('id-ID')}
          colorClass="bg-blue-500"
        />
        <StatCard 
          icon={<PackageIcon />}
          title="Simulasi Dikerjakan"
          value={data?.totalSimulation.toLocaleString('id-ID')}
          colorClass="bg-green-500"
        />
        <StatCard 
          icon={<MoneyIcon />}
          title="Total Pendapatan"
          value={`Rp ${data?.totalRevenue.toLocaleString('id-ID')}`}
          colorClass="bg-yellow-500"
        />
        <StatCard 
          icon={<ClockIcon />}
          title="Pembayaran Pending"
          value={data?.pendingPayments}
          note="Perlu dikonfirmasi segera"
          colorClass="bg-red-500"
        />
      </div>

      {/* --- Grid untuk Aktivitas & Paket Terlaris --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Kolom Aktivitas Terbaru */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-lg mb-4 text-slate-800 dark:text-slate-200">Aktivitas Terbaru</h3>
          <ul>
            <li className="flex items-center mb-4 pb-2 border-b border-slate-200 dark:border-slate-700 last:border-b-0 last:pb-0">
              <div className="mr-3">
                <CheckCircleIcon />
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">{data?.latestActivity}</p>
            </li>
            <li className="flex items-center mb-4 pb-2 border-b border-slate-200 dark:border-slate-700 last:border-b-0 last:pb-0">
              <div className="mr-3">
                <UserAddIcon />
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">{data?.latestUserRegister}</p>
            </li>
            <li className="flex items-center mb-4 pb-2 border-b border-slate-200 dark:border-slate-700 last:border-b-0 last:pb-0">
              <div className="mr-3">
                <PaymentIcon />
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">{data?.latestUserPayment}</p>
            </li>
          </ul>
        </div>

        {/* Kolom Paket Soal Terlaris */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-lg mb-4 text-slate-800 dark:text-slate-200">Paket Soal Terlaris</h3>
          <ul>
            {data?.topPaketSoal?.map((pkg, index) => (
              <li key={pkg.paket_soal_id} className="flex justify-between items-center mb-3">
                <span className="text-sm text-slate-600 dark:text-slate-400">{index + 1}. {pkg.nama_paket}</span>
                <span className="font-semibold text-sm bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-1 rounded-md">{pkg.total} peserta</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};

export default DashboardAdmin;
