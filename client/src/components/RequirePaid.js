import { useEffect, useState } from 'react';
import { useParams, Navigate, Outlet } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function RequirePaid() {
  const { paketId } = useParams();
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    // optional: pakai Swal loading
    Swal.fire({
      title: 'Memeriksa akses paket…',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/cek-akses`, { withCredentials: true })
      .then(({ data }) => {
        Swal.close();
        // cek akses & paketId sama
        if (data.bolehAkses && parseInt(data.paketId, 10) === parseInt(paketId, 10)) {
          setAllowed(true);
        } else {
          setAllowed(false);
        }
      })
      .catch(err => {
        Swal.close();
        console.error(err);
        setAllowed(false);
      })
      .finally(() => setLoading(false));
  }, [paketId]);

  if (loading) {
    // fallback sementara, tapi kita sudah pake Swal di atas
    return null;
  }

  if (!allowed) {
    // redirect ke halaman bayar untuk paket ini
    return <Navigate to={`paketsoal`} replace />;
  }

  // kalau allowed, render route anak (Outlet akan merender <ToeflSimulation>)
  return <Outlet />;
}
