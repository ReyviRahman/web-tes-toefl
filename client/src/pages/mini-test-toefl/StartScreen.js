import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import NavbarUser from '../../components/NavbarUser'
import Main from '../../components/Main'

const StartScreen = () => {
  const navigate = useNavigate();

  return (
    <div>
      <NavbarUser/>
      <Main>
        <div className='border border-abu text-center pt-10 sm:m-20 m-5 rounded-md'>
          <h1 className='text-lg font-semibold'>MINI TEST TOEFL</h1>
          <p className="text-sm text-gray-700 mt-2 mb-6 px-4">
            Gunakan Mini Test TOEFL ini sebagai pemanasan sebelum mengikuti simulasi TOEFL.
          </p>

          <h1>SECTION 1 LISTENING COMPREHENSION</h1>
          <h1 className='font-bold'>Question 1-5</h1>

          <h1 className='mt-10'>SECTION 2 STRUCTURE AND WRITTEN EXPRESSION</h1>
          <h1 className='font-bold'>Question 1-10</h1>

          <h1 className='mt-10'>SECTION 3 READING COMPREHENSION</h1>
          <h1 className='font-bold'>Question 1-5</h1>

          <button
            type="button"
            className="mt-6 w-full bg-primary text-white font-bold p-2 hover:bg-blue-600 rounded-b-md"
            onClick={() => {navigate('/listening')}}
          >
            Mulai Mini Test TOEFL
          </button>
        </div>
      </Main>
    </div>
  );
};

export default StartScreen;
