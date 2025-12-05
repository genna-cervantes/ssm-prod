import Sidebar from "../components/Sidebar"

export default function SigneeApproval() {
  return (
    <div className="flex w-full m-auto max-w-[1440px] bg-[#FFF4E0] justify-center items-center">
      <Sidebar />
      <div className="flex flex-col items-start w-full h-[1080px]">
        <div className='w-full h-[109px] border-b-2 border-[#A2A2A299]/60'></div>
        <div className='w-[1074px] flex flex-col flex-1 pl-6 pr-12 py-9'>
          <div className='flex flex-col gap-0.5 mb-8'>
            <div className='font-bold text-4xl'>Signee Approvals</div>
            <div>
              <p className='font-medium text-lg text-black/60 text-balance'>
                Review and Approve notes from petition signees.  
              </p>
            </div>
          </div> 
        </div>
      </div>
    </div>
  )
}
