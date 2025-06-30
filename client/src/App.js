import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Register from './pages/auth/Register'
import Home from './pages/user/Home';
import Navbar from './components/Navbar';
import Login from './pages/auth/Login';
import Layout from './components/Layout';
import DashboardAdmin from './pages/DashboardAdmin';
import RequireAuth from './components/RequireAuth';
import Keuangan from './pages/Keuangan';
import SuratCreate from './features/surat/SuratCreate'
import SuratEdit from './features/surat/SuratEdit'
import SuratList from './features/surat/SuratList'
import ProsesSurat from './features/admin/prosessurat/ProsesSurat';
import LandingPage from './features/admin/landingpage/LandingPage';
import ToeflSimulation from './pages/toefl/ToeflSimulation';
import TestPage from './pages/TestPage';
import './App.css';
import PilihPaketSoal from "./pages/user/PilihPaketSoal";
import Bayar from "./pages/user/Bayar";
import AdminLayout from "./pages/admin/AdminLayout";
import PaymentList from "./pages/admin/PaymentList";
import RiwayatUjian from "./pages/admin/RiwayatUjian";
import RiwayatUjianUser from "./pages/user/RiwayatUjian";
import RequirePaid from "./components/RequirePaid";
import PaketSaya from "./pages/user/PaketSaya";
import SoalSimulasi from "./pages/admin/SoalSimulasi";
import TambahPaketSoal from "./pages/admin/TambahPaketSoal";
import EditPaketSoal from "./pages/admin/EditPaketSoal";

function App() {
  return (
    <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path='/login' element={<Login />} />
        <Route path='/testpage' element={<TestPage userId={'123'} />} />
        <Route path='/register' element={<Register />} />

        <Route element={<RequireAuth allowedRoles={["Admin"]} />}>
          <Route path='dashboardadmin' element={<DashboardAdmin />}>
            <Route path='admin' element={<LandingPage />} />
            <Route path='prosessurat' element={<ProsesSurat />} />
            <Route path='prosessurat/:id' element={<SuratEdit />} />
          </Route>
        </Route>

        <Route element={<RequireAuth allowedRoles={["User", "Admin"]} />}>
          <Route element={<RequirePaid />}>
            <Route path="/simulasi-toefl/:paketId" element={<ToeflSimulation />} />
          </Route>
          <Route path="/riwayat-ujian" element={<RiwayatUjianUser/>} />
          <Route path='/paketsoal' element={<PilihPaketSoal />} />
          <Route path='/paket-saya' element={<PaketSaya />} />
          <Route path='/bayar/:paketId' element={<Bayar />} />
        </Route>
        
          <Route path='/' element={<Home />} />
        <Route element={<RequireAuth allowedRoles={['Admin']} />}>
          <Route path="/admin" element={<AdminLayout />}>
            {/* kalau buka /admin → langsung redirect ke /admin/payments */}
            <Route
              index
              element={<Navigate to="payments" replace />}
            />

              {/* /admin/payments */}
              <Route path="payments" element={<PaymentList />} />

              {/* /admin/dashboard jika butuh */}
              <Route path="riwayat-ujian" element={<RiwayatUjian />} />
              <Route path="soal-simulasi" element={<SoalSimulasi />} />
              <Route path="soal-simulasi/add" element={<TambahPaketSoal />} />
              <Route path="soal-simulasi/edit/:id" element={<EditPaketSoal />} />

              {/* contoh jika nanti mau detail payment */}
              {/* <Route path="payments/:id" element={<PaymentDetail />} /> */}

              {/* catch-all di bawah jika perlu */}
              {/* <Route path="*" element={<Navigate to="payments" replace />} /> */}
          </Route>

      
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    
  );
}

export default App;
