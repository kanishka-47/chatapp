import { create } from 'zustand'

const useconversation = create((set) => ({
 selectedconversation:null,
  setselectedconversation: (selectedconversation) => set({selectedconversation}),
 message:[],
  setmessage: (message) => set({message}),
}))
export default useconversation;