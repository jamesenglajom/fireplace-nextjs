import React from 'react'

function NewsLetter() {
  return (
    <section className="my-[20px]">
        <div className="container mx-auto py-1 px-[100px]">
            <div className="rounded-[30px] bg-black text-white px-[70px] py-[50px] flex items-center gap-[30px]">
                <div className="w-full text-5xl font-extrabold">STAY UP TO DATE ABOUT OUR LATEST OFFERS</div>
                <div className="w-[450px] flex flex-col gap-[30px]">
                    <input  className="w-full rounded-full p-3" type="text" placeholder='Entery your email address' />
                    <button className="w-full rounded-full p-3 bg-white text-black font-bold">Subscribe to Newsletter</button>
                </div>
            </div>
        </div>
    </section>
  )
}

export default NewsLetter