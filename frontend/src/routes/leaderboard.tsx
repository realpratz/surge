import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { getRatingLevel } from '../utils'
import { Divide } from 'lucide-react'

export const Route = createFileRoute('/leaderboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [batch, setBatch] = useState(false)
  const [level, setLevel] = useState(false)

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/leaderboard`)
      .then((res) => {
        setLeaderboard(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching leaderboard: ", err)
        setLoading(false)
        setError(true)
      })
  }, [])

  if (loading)
    return (
      <div className="min-h-screen text-white flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mb-4"></div>
          <div className="text-lg animate-pulse">Loading...</div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen text-white flex items-center justify-center">
        <div className="text-red-400 animate-pulse">Error fetching leaderboard.</div>
      </div>
    );

  return (
    <div>
      <div className='border-b border-[#25293E]'>
        <div className='h-35 ml-10 mr-10'>
          <div className='mt-5 mb-7 ml-1'><h1 className="text-3xl font-bold">Campus <span className='text-[#919AC8]'>Leaderboard</span></h1></div>
          <div className='flex justify-between m-1'>
            <div><input type="text" placeholder='Search by name' className='rounded-3xl text-sm h-12 w-80 bg-[#25293E] pl-8' /></div>
            <div className='flex justify-between w-110 z-20'>
              <div className='flex flex-col'>
                <div className='rounded-3xl text-sm h-10 w-50 bg-[#25293E] flex justify-center items-center cursor-pointer mt-1 hover:bg-[#25294F]' onClick={() => setBatch(!batch)}>Batch</div>
                {batch && (
                  <div className='mt-2 text-xs flex flex-col justify-evenly items-center'>
                    <div className='bg-[#25293E] h-8 w-42 flex justify-center items-center hover:bg-[#25294F]'>2023</div>
                    <div className='bg-[#25293E] h-8 w-42 flex justify-center items-center hover:bg-[#25294F]'>2022</div>
                    <div className='bg-[#25293E] h-8 w-42 flex justify-center items-center hover:bg-[#25294F]'>2021</div>
                    <div className='bg-[#25293E] h-8 w-42 flex justify-center items-center hover:bg-[#25294F]'>2021</div>
                    <div className='bg-[#25293E] h-8 w-42 flex justify-center items-center hover:bg-[#25294F]'>2021</div>
                    <div className='bg-[#25293E] h-8 w-42 flex justify-center items-center hover:bg-[#25294F]'>2021</div>
                  </div>
                )}
              </div>
              <div className='flex flex-col'>
                <div className='rounded-3xl text-sm h-10 w-50 bg-[#25293E] flex justify-center items-center cursor-pointer mt-1 hover:bg-[#25294F]' onClick={() => setLevel(!level)}>Level</div>
                {level && (
                  <div className='mt-2 text-xs flex flex-col justify-evenly items-center'>
                    <div className='bg-[#25293E] h-8 w-42 flex justify-center items-center hover:bg-[#25294F] '>Newbie</div>
                    <div className='bg-[#25293E] h-8 w-42 flex justify-center items-center hover:bg-[#25294F] '>Pupil</div>
                    <div className='bg-[#25293E] h-8 w-42 flex justify-center items-center hover:bg-[#25294F] '>Specialist</div>
                    <div className='bg-[#25293E] h-8 w-42 flex justify-center items-center hover:bg-[#25294F] '>Expert</div>
                    <div className='bg-[#25293E] h-8 w-42 flex justify-center items-center hover:bg-[#25294F] '>Candidate Master</div>
                    <div className='bg-[#25293E] h-8 w-42 flex justify-center items-center hover:bg-[#25294F] '>Master</div>
                    <div className='bg-[#25293E] h-8 w-42 flex justify-center items-center hover:bg-[#25294F] '>International Master</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='h-80 ml-10 mr-10 flex justify-center items-end mb-15 mt-15'>
        <div className='flex justify-around items-end h-50 w-150 bg-[#1B1E30] rounded-xl'>
          <div className='relative w-1/3 h-50 flex flex-col justify-evenly z-10 pt-8'>
            <div className='absolute -top-13 left-16 flex justify-center items-center'><img src={leaderboard[1].pfpUrl} alt="PFP" className='h-18 w-18 border-[#5FCABB] border-4 rounded-full ' /></div>
            <div className='absolute top-1 left-21.5 text-lg flex justify-center items-center bg-[#5FCABB] rounded-full w-7'>2</div>
            <div className='text-base flex justify-center items-center'>{leaderboard[1].name}</div>
            <div className='text-xs flex justify-center items-center'>{leaderboard[1].batch || 'N/A'}</div>
            <div className='text-xs flex justify-center items-center'>{leaderboard[1].cfRating}</div>
            <div className='text-xs flex justify-center items-center'>{getRatingLevel(leaderboard[1].cfRating)}</div>
          </div>
          <div className='relative w-1/3 h-65 bg-[#25293E] flex flex-col rounded-t-3xl justify-evenly z-10 pt-10'>
            <div className='absolute -top-17 left-13 flex justify-center items-center'><img src={leaderboard[0].pfpUrl} alt="PFP" className='h-24 w-24 border-[#DCBE66] border-4 rounded-full ' /></div>
            <div className='absolute top-3 left-21.5 text-lg flex justify-center items-center bg-[#DCBE66] rounded-full w-7'>1</div>
            <div className='text-base flex justify-center items-center'>{leaderboard[0].name}</div>
            <div className='text-xs flex justify-center items-center'>{leaderboard[0].batch || 'N/A'}</div>
            <div className='text-xs flex justify-center items-center'>{leaderboard[0].cfRating}</div>
            <div className='text-xs flex justify-center items-center'>{getRatingLevel(leaderboard[0].cfRating)}</div>
            <div className='text-LG font-bold flex justify-center items-center'>WINNER</div>
          </div>
          <div className='relative w-1/3 h-50 flex flex-col justify-evenly z-10 pt-8'>
            <div className='absolute -top-13 left-16 flex justify-center items-center'><img src={leaderboard[2].pfpUrl} alt="PFP" className='h-18 w-18 border-[#DD7A6C] border-4 rounded-full ' /></div>
            <div className='absolute top-1 left-21.5 text-lg flex justify-center items-center bg-[#DD7A6C] rounded-full w-7'>3</div>
            <div className='text-base flex justify-center items-center'>{leaderboard[2].name}</div>
            <div className='text-xs flex justify-center items-center'>{leaderboard[2].batch || 'N/A'}</div>
            <div className='text-xs flex justify-center items-center'>{leaderboard[2].cfRating}</div>
            <div className='text-xs flex justify-center items-center'>{getRatingLevel(leaderboard[2].cfRating)}</div>
          </div>
        </div>
      </div>
      <div className='ml-10 mr-10 flex flex-col'>
        {leaderboard.slice(3).map((user, index) =>
          <div key={user.id} className='h-15 rounded-xl flex justify-around bg-[#25293E] m-1'>
            <div className='w-1/20 text-sm flex justify-center items-center'>{index + 4}</div>
            <div className='w-1/20 flex justify-center items-center'><img src={user.pfpUrl} alt="PFP" className='h-12 w-12 rounded-full ' /></div>
            <div className='w-4/20 text-base flex justify-center items-center'>{user.name}</div>
            <div className='w-1/20 text-sm flex justify-center items-center'>{user.batch || 'N/A'}</div>
            <div className='w-1/20 text-sm flex justify-center items-center'>{user.cfRating}</div>
            <div className='w-4/20 text-sm flex justify-center items-center'>{getRatingLevel(user.cfRating)}</div>
          </div>
        )}
      </div>
    </div>
  );
}
