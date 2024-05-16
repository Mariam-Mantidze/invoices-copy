import { useContext, useState, useEffect, useRef } from "react";
import { invoiceContext } from "../../../App";

function Main() {
  const content = useContext(invoiceContext);

  // using useref and useEffect to implement correct date
  const dateRef = useRef([]);
  useEffect(() => {
    const dates = content.invoiceData.map((e) => {
      const datestr = e.paymentDue;
      const parts = datestr.split("-");
      const date = new Date(parts[0], parts[1] - 1, parts[2]);
      const month = date.toLocaleString("en-us", { month: "long" });
      const day = date.getDate();
      const year = date.getFullYear();
      const fulldate = `${day} ${month} ${year}`;
      return { payDue: fulldate };
    });
    dateRef.current = dates;
  }, [content.invoiceData]);

  //   const fixedAmount = content.invoiceData.
  return (
    <main className="flex flex-col items-center gap-4 mb-10">
      {content.invoiceData.map((e, index) => {
        return (
          <section
            key={e.id}
            className="w-[327px] flex flex-col gap-6 bg-white rounded-[8px] shadow-invoice pt-[25px] px-6 pb-[22px]"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-[15px] text-[#0c0e16] font-[700] tracking-[-0.25px] leading-[1]">
                <span className="text-[#7e88c3]">#</span>
                {e.id}
              </h3>
              <span className="text-[13px] text-[#858bb2] font-[500] tracking-[-0.1px] leading-[1.15]">
                {e.clientName}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-[9px]">
                <p className="text-[13px] text-[#7e88c3] font-[500] tracking-[-0.1px] leading-[1.15]">
                  due{" "}
                  {dateRef.current[index] ? dateRef.current[index].payDue : ""}
                </p>
                <span className="text-[15px] text-[#0c0e16] font-[700] tracking-[-0.25px] leading-[1.6]">
                  £ {Number(e.total).toFixed(2)}
                </span>
              </div>
              <div
                className={`${
                  e.status == "paid"
                    ? "bg-green"
                    : e.status == "pending"
                    ? "bg-orange"
                    : "bg-black"
                } w-[104px] h-10 flex justify-center items-center gap-2 rounded-[8px] opacity-transparent pt-[14px] pb-[11px]`}
              >
                <div
                  className={`${
                    e.status == "paid"
                      ? "bg-[#33d69f]"
                      : e.status == "pending"
                      ? "bg-[#ff8f00]"
                      : "bg-[#373b53]"
                  } w-2 h-2 rounded-full`}
                ></div>
                <span
                  className={`${
                    e.status == "paid"
                      ? "text-[#33d69f]"
                      : e.status == "pending"
                      ? "text-[#ff8f00]"
                      : "text-[#373b53]"
                  } text-[13px] font-[700] tracking-[-0.1px] leading-[1.15]`}
                >
                  {e.status}
                </span>
              </div>
              <img
                className="hidden"
                src="/assets/icon-arrow-right.svg"
                alt="arror_right_icon"
              />
            </div>
          </section>
        );
      })}
    </main>
  );
}

export default Main;
