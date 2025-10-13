import React from "react";

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Muhammad Hasif",
      rating: "⭐⭐⭐⭐⭐",
      image: "pic_1",
      review:
        "“The best working space so far in kelantan. You can finish your tas peacefully. Go have your lunch at common area with free flow cofee.. 100 extra points...”",
    },
    {
      id: 2,
      name: "Muhammad Hasif",
      rating: "⭐⭐⭐⭐⭐",
      image: "pic_2",
      review:
        "“The best working space so far in kelantan. You can finish your tas peacefully. Go have your lunch at common area with free flow cofee.. 100 extra points...”",
    },
    {
      id: 3,
      name: "Muhammad Hasif",
      rating: "⭐⭐⭐⭐⭐",
      image: "pic_3",
      review:
        "“The best working space so far in kelantan. You can finish your tas peacefully. Go have your lunch at common area with free flow cofee.. 100 extra points...”",
    },
  ];

  return (
    <div className="min-h-screen md:py-8 py-4">
      <div className=" w-full max-w-[100rem] mx-auto border border-black">
        {/* intro content */}
        <div className="border border-black text-center space-y-6">
          <h1 className="md:text-6xl text-4xl">Loved by creators & teams</h1>
          <p className="md:text-4xl text-2xl">Here is what members say</p>
        </div>


        {/*===================================================== carousel content slider=========================================================/}
        {/* start */}
        <div className="border border-black  grid grid-cols-1 md:grid-cols-3 mt-10 gap-4 md:gap-8 ">
          <div className="md:h-100 h-50   border border-black">
            <div>pic_1</div>
          </div>
          <div className="hidden md:flex md:h-100   h-50 border border-black">
            <div>pic_2</div>
          </div>
          <div className=" hidden md:flex md:h-100 h-50 border border-black">
            <div>pic_3</div>
          </div>
        </div>
        {/* end ===================================================================================================================*/}
      </div>

      {/* ================================marquee reviews 1 */}

      <div className="border border-black  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-4 md:gap-8 md:text-2xl">
        {/* card content */}

        {reviews.map((item, index) => (
          <div
            key={index}
            className=" border border-black flex flex-col justify-between p-4 gap-4"
          >
            {/* review_content */}
            <p>{item.review}</p>

            {/* rating */}
            <div className="">
              <i className="text-2xl ">{item.rating}</i>
            </div>

            {/* profile contents */}
            <div className="flex flex-row border border-black gap-2 ">
              <div className="border border-black p-4 rounded-4xl flex justify-center items-center">
                <div>{item.image}</div>
              </div>
              <div className="border border-black flex items-center  w-full">
                <p>{item.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* marquee reviews============================================ 2 */}

      <div className="border border-black  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-4 md:gap-8 md:text-2xl ">
        {/* card content */}

        {reviews.map((item, index) => (
          <div
            key={index}
            className=" border border-black flex flex-col justify-between p-4 gap-4"
          >
            {/* review_content */}
            <p>{item.review}</p>

            {/* rating */}
            <div className="">
              <i className="text-2xl ">{item.rating}</i>
            </div>

            {/* profile contents */}
            <div className="flex flex-row border border-black gap-2 ">
              <div className="border border-black p-4 rounded-4xl flex justify-center items-center">
                <div>{item.image}</div>
              </div>
              <div className="border border-black flex items-center  w-full">
                <p>{item.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* end */}
    </div>
  );
};

export default Reviews;
