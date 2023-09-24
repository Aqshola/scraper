import React from "react";

type Props = {
  text: string;
  className?: string;
};

function CouponDiv(props: Props) {
  return (
    <div className={props.className + " " + "w-fit h-fit relative"}>
      <div className="relative block w-fit">
        <div className=" h-full relative">
          <div className="w-full  absolute z-10 text-center py-9 px-5">
            <p className="font-bold text-5xl text-ellipsis pl-5 truncate ">
              {props.text}
            </p>
          </div>
        </div>
        <svg
          className="relative z-0"
          width="489"
          height="118"
          viewBox="0 0 489 118"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask id="path-1-inside-1_21_58" fill="white">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 8C0 3.58172 3.58172 0 8 0H481C485.418 0 489 3.58172 489 8V40.3713C488.527 40.3481 488.05 40.3364 487.57 40.3364C474.935 40.3364 464.693 48.4641 464.693 58.4902C464.693 68.5163 474.935 76.6441 487.57 76.6441C488.05 76.6441 488.527 76.6323 489 76.6092V110C489 114.418 485.418 118 481 118H8C3.58173 118 0 114.418 0 110V76.6441C12.6347 76.6441 22.8772 68.5163 22.8772 58.4902C22.8772 48.4641 12.6347 40.3364 0 40.3364V8Z"
            />
          </mask>
          <g filter="url(#filter0_i_21_58)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 8C0 3.58172 3.58172 0 8 0H481C485.418 0 489 3.58172 489 8V40.3713C488.527 40.3481 488.05 40.3364 487.57 40.3364C474.935 40.3364 464.693 48.4641 464.693 58.4902C464.693 68.5163 474.935 76.6441 487.57 76.6441C488.05 76.6441 488.527 76.6323 489 76.6092V110C489 114.418 485.418 118 481 118H8C3.58173 118 0 114.418 0 110V76.6441C12.6347 76.6441 22.8772 68.5163 22.8772 58.4902C22.8772 48.4641 12.6347 40.3364 0 40.3364V8Z"
              fill="#A4E8FF"
            />
          </g>
          <path
            d="M489 40.3713L488.805 44.3665L493 44.5718V40.3713H489ZM489 76.6092H493V72.4087L488.805 72.614L489 76.6092ZM0 76.6441V72.6441H-4V76.6441H0ZM0 40.3364H-4V44.3364H0V40.3364ZM8 -4C1.37258 -4 -4 1.37258 -4 8H4C4 5.79086 5.79086 4 8 4V-4ZM481 -4H8V4H481V-4ZM493 8C493 1.37258 487.627 -4 481 -4V4C483.209 4 485 5.79086 485 8H493ZM493 40.3713V8H485V40.3713H493ZM487.57 44.3364C487.985 44.3364 488.397 44.3465 488.805 44.3665L489.195 36.3761C488.658 36.3497 488.116 36.3364 487.57 36.3364V44.3364ZM468.693 58.4902C468.693 51.4864 476.233 44.3364 487.57 44.3364V36.3364C473.638 36.3364 460.693 45.4419 460.693 58.4902H468.693ZM487.57 72.6441C476.233 72.6441 468.693 65.4941 468.693 58.4902H460.693C460.693 71.5386 473.638 80.6441 487.57 80.6441V72.6441ZM488.805 72.614C488.397 72.6339 487.985 72.6441 487.57 72.6441V80.6441C488.116 80.6441 488.658 80.6308 489.195 80.6044L488.805 72.614ZM493 110V76.6092H485V110H493ZM481 122C487.627 122 493 116.627 493 110H485C485 112.209 483.209 114 481 114V122ZM8 122H481V114H8V122ZM-4 110C-4 116.627 1.37259 122 8 122V114C5.79086 114 4 112.209 4 110H-4ZM-4 76.6441V110H4V76.6441H-4ZM18.8772 58.4902C18.8772 65.4941 11.3376 72.6441 0 72.6441V80.6441C13.9318 80.6441 26.8772 71.5386 26.8772 58.4902H18.8772ZM0 44.3364C11.3376 44.3364 18.8772 51.4864 18.8772 58.4902H26.8772C26.8772 45.4419 13.9318 36.3364 0 36.3364V44.3364ZM-4 8V40.3364H4V8H-4Z"
            fill="black"
            mask="url(#path-1-inside-1_21_58)"
          />
          <defs>
            <filter
              id="filter0_i_21_58"
              x="0"
              y="0"
              width="493"
              height="122"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="8" dy="8" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="shape"
                result="effect1_innerShadow_21_58"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

export default CouponDiv;
