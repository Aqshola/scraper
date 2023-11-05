import React from "react";
import Button from "@/components/base/Button";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";

type Props = {
  pages: number;
  currentPages: number;
  showManyPagesButton?: number;
  showButtonSection?: number;
  callback?: (tes?: any) => any;
};

function Pagination({
  callback = () => {},
  showManyPagesButton = 5,
  showButtonSection = 3,
  currentPages,
  ...props
}: Props) {
  let start = currentPages - 1; // because its one and u should substract so it become zero
  let end = start + showManyPagesButton;

  const showPrevButton = currentPages != 1;
  const showNextButton = currentPages != props.pages;

  if (currentPages <= showButtonSection) {
    start = 0; // because its one and u should substract so it become zero
    end = start + showManyPagesButton;
  } else {
    start = currentPages - showButtonSection;
    end = end - showButtonSection + 1;
  }

  if (currentPages == props.pages) {
    start = currentPages - showButtonSection - 2;
  }

  if (currentPages == props.pages - 1) {
    start = currentPages - showButtonSection - 1;
  }

  const listOfNumberPage = Array(props.pages)
    .fill(0)
    .map((_, el) => el + 1);

  function changePage(param: number) {
    callback(param);
  }
  return (
    <div className="flex gap-2">
      {/* {showPrevButton && (
        <div>
          <Button
            type="button"
            variant="blank"
            size={"sm"}
            onClick={() => changePage(currentPages - 1)}
          >
            <ArrowLeft2 />
          </Button>
        </div>
      )}

      {currentPages > showButtonSection && (
        <>
          <div>
            <Button variant="blank" onClick={() => changePage(1)}>
              {1}
            </Button>
          </div>
          <div className="flex items-end">
            <span className="text-2xl">...</span>
          </div>
        </>
      )} */}

      {listOfNumberPage.slice(start, end).map((data) => (
        <div key={data}>
          <Button
            variant={data == currentPages ? "primary" : "blank"}
            onClick={() => changePage(data)}
          >
            {data}
          </Button>
        </div>
      ))}

      {/* BUTTON LAST PAGE */}
      {/* {currentPages <= props.pages - showButtonSection - 2 && (
        <>
          <div className="flex items-end">
            <span className="text-2xl">...</span>
          </div>
          <div>
            <Button variant="blank" onClick={() => changePage(props.pages)}>
              {props.pages}
            </Button>
          </div>
        </>
      )}

      {showNextButton && (
        <div>
          <Button
            type="button"
            variant="blank"
            size="sm"
            onClick={() => changePage(currentPages + 1)}
          >
            <ArrowRight2 />
          </Button>
        </div>
      )} */}
    </div>
  );
}

export default Pagination;
