import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Avatar from './Avatar'
import axios from 'axios'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const Dropdown = ({nama, profilePic}) => {
  const navigate = useNavigate()
  const { setAuth } = useAuth()
  const handleLogout = async () => {
		try {
			await axios.get('http://localhost:3001/users/logout', { withCredentials: true }); 
			setAuth({"nik": "", "nama": "", "role": "", "profilePic" : ""})
      navigate('/')
		} catch (error) {
			console.error("Logout Error", error);
		}
	}

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className='flex items-center'>
        <MenuButton>
          <div className='flex items-center'>
            <h1 className='font-semibold me-3'>{nama}</h1>
            <div className="w-9 h-9 rounded-full overflow-hidden cursor-pointer">
              <img 
                  className='object-cover w-full h-full' 
                  alt='Avatar' 
                  src={profilePic} 
              />
            </div>
            <ChevronDownIcon className='w-8 h-8'/>
          </div>
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <button
            type='button'
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              onClick={handleLogout}
            >
              Sign out
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  )
}

export default Dropdown