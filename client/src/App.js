import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Register from './pages/auth/Register'
import Home from './pages/user/Home';
import Login from './pages/auth/Login';
import RequireAuth from './components/RequireAuth';
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
import SesiSoal from "./pages/admin/SesiSoal";
import TambahSoalListening from "./pages/admin/soal-simulasi/tambah-soal-simulasi/TambahSoalListening";
import SoalListening from "./pages/admin/soal-simulasi/SoalListening";
import EditSoalListening from "./pages/admin/soal-simulasi/edit-soal-simulasi/EditSoalListening";
import SoalStructure from "./pages/admin/soal-simulasi/SoalStructure";
import TambahSoalStructure from "./pages/admin/soal-simulasi/tambah-soal-simulasi/TambahSoalStructure";
import EditSoalStructure from "./pages/admin/soal-simulasi/edit-soal-simulasi/EditSoalStructure";
import SoalWritten from "./pages/admin/soal-simulasi/SoalWritten";
import TambahSoalWritten from "./pages/admin/soal-simulasi/tambah-soal-simulasi/TambahSoalWritten";
import SoalReading from "./pages/admin/soal-simulasi/SoalReading";
import TambahSoalReading from "./pages/admin/soal-simulasi/tambah-soal-simulasi/TambahSoalReading";
import EditSoalReading from "./pages/admin/soal-simulasi/edit-soal-simulasi/EditSoalReading";
import DataUser from "./pages/admin/DataUser";
import Profile from "./pages/user/Profile";
import StartScreen from "./pages/mini-test-toefl/StartScreen";
import Listening from "./pages/mini-test-toefl/Listening";
import Structure from "./pages/mini-test-toefl/Structure";
import Reading from "./pages/mini-test-toefl/Reading";
import Finish from "./pages/mini-test-toefl/Finish";
import DashboardAdmin from "./pages/admin/DashboardAdmin";

function App() {
  return (
    <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path='/login' element={<Login />} />
        <Route path='/testpage' element={<TestPage userId={'123'} />} />
        <Route path='/register' element={<Register />} />

        <Route element={<RequireAuth allowedRoles={["User", "Admin"]} />}>
          <Route element={<RequirePaid />}>
            <Route path="/simulasi-toefl/:paketId" element={<ToeflSimulation />} />
          </Route>
          <Route path="/riwayat-ujian" element={<RiwayatUjianUser/>} />
          <Route path='/paketsoal' element={<PilihPaketSoal />} />
          <Route path='/paket-saya' element={<PaketSaya />} />
          <Route path='/bayar/:paketId' element={<Bayar />} />
          <Route path='/profile' element={<Profile />} />

          <Route path='/mini-test' element={<StartScreen />} />
          <Route path='/listening' element={<Listening />} />
          <Route path='/structure' element={<Structure />} />
          <Route path='/reading' element={<Reading />} />
          <Route path='/finish' element={<Finish />} />
        </Route>
        
        <Route path='/' element={<Home />} />
        <Route element={<RequireAuth allowedRoles={['Admin']} />}>
          <Route path="/admin" element={<AdminLayout />}>
            {/* kalau buka /admin → langsung redirect ke /admin/payments */}
            <Route
              index
              element={<Navigate to="payments" replace />}
            />

              <Route path="dashboard" element={<DashboardAdmin />} />
              <Route path="payments" element={<PaymentList />} />
              <Route path="riwayat-ujian" element={<RiwayatUjian />} />
              <Route path="soal-simulasi" element={<SoalSimulasi />} />
              <Route path="data-user" element={<DataUser />} />

              <Route path="soal-simulasi/add" element={<TambahPaketSoal />} />
              <Route path="soal-simulasi/edit/:id" element={<EditPaketSoal />} />
              <Route path="soal-simulasi/add-soal/:paketId" element={<SesiSoal />} />
              
              <Route path="soal-simulasi/soal-listening/:paketId" element={<SoalListening />} />
              <Route path="soal-simulasi/add-soal-listening/:paketId" element={<TambahSoalListening />} />
              <Route path="soal-simulasi/edit-soal-listening/:soalId" element={<EditSoalListening />} />

              <Route path="soal-simulasi/soal-structure/:paketId" element={<SoalStructure />} />
              <Route path="soal-simulasi/add-soal-structure/:paketId" element={<TambahSoalStructure />} />
              <Route path="soal-simulasi/edit-soal-structure/:soalId" element={<EditSoalStructure />} />

              <Route path="soal-simulasi/soal-written/:paketId" element={<SoalWritten />} />
              <Route path="soal-simulasi/add-soal-written/:paketId" element={<TambahSoalWritten />} />

              <Route path="soal-simulasi/soal-reading/:paketId" element={<SoalReading />} />
              <Route path="soal-simulasi/add-soal-reading/:paketId" element={<TambahSoalReading />} />
              <Route path="soal-simulasi/edit-soal-reading/:soalId" element={<EditSoalReading />} />


              {/* catch-all di bawah jika perlu */}
              {/* <Route path="*" element={<Navigate to="payments" replace />} /> */}
          </Route>

      
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    
  );
}

export default App;
