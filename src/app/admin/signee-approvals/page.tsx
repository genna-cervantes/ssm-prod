import Sidebar from "../_components/Sidebar"
import Approvals from "../_components/Approvals"
import { getPetitionNotesWithEmailAction } from "@/src/actions/notes.actions"

export default async function SigneeApproval({ searchParams }: { searchParams: { page: string, limit: string } }) {

  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 9;

  const { ok: petitionNotesOk, data: petitionNotes } = await getPetitionNotesWithEmailAction(page, limit);

  return (
    <div className="flex w-full m-auto max-w-[1440px] bg-[#FFF4E0] justify-center items-center">
      <Sidebar />
      <div className="flex flex-col items-start w-full h-[1080px] overflow-auto">
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
          <div className="w-full py-2 px-1 flex flex-col gap-4">
            {petitionNotesOk && petitionNotes && petitionNotes.length > 0 ? petitionNotes.map((submission) => (
              <Approvals
                key={submission.id}
                submission={submission}
              />
            )) : <div className="flex justify-center items-center h-full">No submissions found</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
