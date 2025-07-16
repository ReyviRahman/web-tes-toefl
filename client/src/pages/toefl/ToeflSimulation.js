import React, { useEffect, useReducer, useState } from 'react'
import Main from '../../components/Main'
import Loader from '../../components/Loader'
import Error from '../../components/Error'
import axios from 'axios'
import StartScreen from '../../components/StartScreen'
import Soal from './Soal'
import FinishScreen from '../../components/FinishScreen'
import useAuth from '../../hooks/useAuth'
import Navbar from '../../components/Navbar'
import NavbarUser from '../../components/NavbarUser'

const initialState = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: [],
  secondsRemaining: null,
  sesi: ''
}

const initializer = (initialState) => {
  const savedState = localStorage.getItem('toeflState');
  if (savedState) {
    const parsedState = JSON.parse(savedState);
    return {
      ...initialState,
      index: parsedState.index || initialState.index,
      answer: parsedState.answer || initialState.answer
    }
  }
  return initialState
}

const reducer = (state, action) => {
  switch(action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready'
      }
    case 'dataFailed':
      return {
        ...state,
        status: 'error'
      }
    case 'start':
      return {
        ...state,
        status: 'active',
        secondsRemaining: action.payload
      }
    case 'restart':
      return {
        status: 'ready'
      }
    case 'finish':
      return {
        ...state,
        status: 'finished',
        secondsRemaining: 0
      }
    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1
      }
    case 'prevQuestion':
      const jumpMap = {
        35: 31,
        39: 35,
        43: 39,
        47: 43,
      };

      return {
        ...state,
        index: jumpMap[state.index] ?? state.index - 1,
      }
    case 'nextQuestion': {
      // Mapping indeks khusus ➜ target lompatan
      const jumpMap = {
        31: 35,
        35: 39,
        39: 43,
        43: 47,
      };
      return {
        ...state,
        // Jika index saat ini ada di jumpMap pakai nilai lompatannya,
        // kalau tidak, lanjut naik satu seperti biasa.
        index: jumpMap[state.index] ?? state.index + 1,
      };
    }
    case 'moveToIdx':
      return {
        ...state,
        index: action.payload
      }
    case 'newAnswer': {
      const { page, answer } = action.payload;
      
      const alreadyAnswered = state.answer.some(item => item.id === page);

      const updatedAnswers = alreadyAnswered
        ? state.answer.map(item =>
            item.id === page ? { ...item, answer } : item
          )
        : [...state.answer, { id: page, answer }];

      return {
        ...state,
        answer: updatedAnswers
      };
    }

    case 'getSesi':
      return {
        ...state,
        sesi: action.payload
      };
  }
}

const ToeflSimulation = () => {
  const { auth } = useAuth()
  console.log('auth dari toefl simulation', auth)
  const [{questions, status, index, answer, secondsRemaining, sesi}, dispatch] = useReducer(reducer, initialState, initializer)
  console.log('ini sesi', sesi)
  const numQuestions = questions.length

  useEffect(() => {
    const stateToSave = {index, answer}
    localStorage.setItem('toeflState', JSON.stringify(stateToSave));
  }, [index, answer])

  // useEffect(() => {
  //   const fetchDataSoal = async () => {
  //     try {
        
  //       const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/soal`);
  //       console.log('ini data soal', response.data);

  //       const newObject = {petunjuk: "petunjuk"};

  //       let soalToefl = response.data.soal

  //       soalToefl.splice(0, 0, newObject);
  //       soalToefl.splice(51, 0, newObject);
  //       soalToefl.splice(67, 0, newObject);
  //       soalToefl.splice(93, 0, newObject);

  //       dispatch({type: 'dataReceived', payload: response.data.soal})
  //     } catch (error) {
  //       dispatch({type: 'dataFailed'})
  //     }
  //   }

  //   fetchDataSoal()
  // }, [])

  useEffect(() => {
    const fetchDataSoal = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/soal`,
          { withCredentials: true }
        );
        let soalToefl = [...response.data.soal]; // clone untuk aman

        const petunjukObj = { petunjuk: 'petunjuk' };

        // Step 1: Gabungkan Part B dan Part C
        const gabungGrup = (startIndex, endIndex, type = 'group') => {
          const groupItems = soalToefl.slice(startIndex, endIndex + 1);
          const groupObject = {
            type,
            audio: groupItems[0].audio,
            items: groupItems,
          };
          // soalToefl.splice(startIndex, endIndex - startIndex + 1, groupObject);
          soalToefl.splice(startIndex, 1, groupObject);
        };

        // Gabung Part B
        gabungGrup(30, 33); // index ke-31 sampai 34
        gabungGrup(34, 37); // setelah gabung di atas, index geser -3, jadi 35–38 jadi 31–34

        // // Gabung Part C
        gabungGrup(38, 41); // 39–42
        gabungGrup(42, 45); // 43–46
        gabungGrup(46, 49); // 47–50

        // Step 2: Sisipkan petunjuk (setelah penggabungan agar index benar)
        soalToefl.splice(0, 0, petunjukObj);    // Awal
        soalToefl.splice(51, 0, petunjukObj);   // Sebelum structure
        soalToefl.splice(67, 0, petunjukObj);
        soalToefl.splice(93, 0, petunjukObj);

        console.log('ini soal toefl', soalToefl)

        // Step 3: Dispatch ke reducer
        dispatch({ type: 'dataReceived', payload: soalToefl });
      } catch (error) {
        if (error.response && error.response.status === 401) {
          window.location.href = "/login";
        } else {
          dispatch({ type: 'dataFailed' });
        }
      }
    };

    fetchDataSoal();
  }, []);


  return (
    <div>
      <NavbarUser />
      <Main>
        <div className='container mx-auto'>
          {status === 'loading' && <Loader />}
          {status === 'error' && <Error />}
          {status === 'ready' && <StartScreen dispatch={dispatch} nohp={auth.nohp}/>}
          {status === 'active' && (
            <>
              <Soal question={questions[index]} numQuestions={numQuestions} index={index} answer={answer} dispatch={dispatch} secondsRemaining={secondsRemaining} nohp={auth.nohp} sesi={sesi}/>
            </>
          )}
          {status === 'finished' && <FinishScreen dispatch={dispatch} nohp={auth.nohp} status={status} answer={answer} role={auth.role} />}
        </div>
      </Main>
    </div>
  )
}

export default ToeflSimulation