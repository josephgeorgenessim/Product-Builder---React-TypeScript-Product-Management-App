import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ReactNode } from 'react';


interface Iprops {
  isOpen: boolean;
  open_modal: () => void;
  close: () => void;
  title?: string;
  children?: ReactNode;
}


const Modal = ({ isOpen, open_modal, close, title, children }: Iprops) => {



  return (
    <>


      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 backdrop-blur-sm bg-white/30">
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <DialogPanel
                transition
                className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
              >
                <DialogTitle as="h3" className="text-base/7 font-medium text-black">
                  {title}
                </DialogTitle>
                {children}
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  )
}
export default Modal;
