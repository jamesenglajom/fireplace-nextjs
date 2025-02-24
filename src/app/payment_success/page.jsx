'use client'
import { UIMCheckCircle } from "../components/icons/lib";
function SuccessPaymentPage() {
  return (
    <div className="container mx-auto h-[calc(100vh-210px)]">
        <div className="h-[100%] flex items-center justify-center">
          <div className="flex flex-col justify-center items-center gap-[20px] w-full">
            <div className="mb-5"><UIMCheckCircle width={150} height={150}/></div>
            <div className="flex flex-col gap-[8px] items-center">
              <div className="font-bold text-lg">Payment Successful</div>
              <div className="text-sm">Payment Number: u8137413890473</div>
            </div>
            <div className="border w-full"></div>
            <div className="text-sm">Amount Paid: Test</div>
            <div className="text-sm">Payed by: Test</div>
          </div>
        </div>
    </div>
  )
}

export default SuccessPaymentPage;