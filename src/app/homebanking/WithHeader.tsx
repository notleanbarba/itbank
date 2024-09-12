import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import type { OperationsDefinition, TagsDefinition } from "@types";
import type { ReactNode } from "react";

export default function WithHeader({
  className,
  title,
  submenuOptions,
  tags,
  header,
  children,
}: {
  className?: string;
  title: string;
  submenuOptions: OperationsDefinition;
  tags?: TagsDefinition;
  header?: ReactNode;
  children: ReactNode;
}) {
  const [activeTag, setActiveTag] = useState(0);
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <section className="content grid grid-cols-[auto_1fr] grid-rows-[min-content_auto] md:grid-cols-[20%_1fr_20%] bg-white flex-grow">
      <div
        className={`col-span-3 grid-flow-col bg-[#9aa7bf] h-min lg:grid lg:grid-cols-subgrid ${className ?? ""}`}
      >
        <div
          className={
            "flex flex-row gap-[2%] items-center h-[10vh] mx-16 lg:col-start-2"
          }
        >
          <div className="flex-grow text-xl bg-white h-[60%] rounded-lg border-black border-[1.3px] shadow-float flex items-center px-4">
            {title}
          </div>
          <button
            aria-label="operaciones"
            className="w-[10%] lg:w-[30%] bg-white h-[60%] rounded-lg border-black border-[1.3px] shadow-float flex items-center p-2 [anchor-name:--menu-selector]"
            type="button"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <span className="hidden text-base lg:block">
              Consultas y Operaciones
            </span>
            <FontAwesomeIcon icon={faChevronDown} className="mx-auto" />
          </button>
          <nav
            className={`bg-white h-min rounded-lg border-black border-[1.3px] shadow-float flex items-center px-4 fixed [position-anchor:--menu-selector] w-[anchor-size(width)] -translate-x-1/2 text-sm min-w-min box-border ${openMenu ? "" : "hidden"}`}
            style={{
              top: "anchor(bottom, 0)",
              left: "anchor(center, 0)",
            }}
          >
            {submenuOptions.map((operation) => {
              return (
                <button
                  key={`operation_${operation.id}`}
                  type="button"
                  className="py-2"
                  onClick={() => {
                    operation.callback();
                  }}
                >
                  {operation.text}
                </button>
              );
            })}
          </nav>
        </div>
        {header}
        <div className="flex flex-row px-16 lg:col-start-2">
          {tags?.map((tag, index) => {
            return (
              <div
                key={`header_tag_${index}`}
                className={`py-3 px-4 md:py-5 md:px-7 text-sm font-bold rounded-t-xl text-wrap w-min cursor-pointer lg:text-nowrap ${index === activeTag ? "bg-white text-black" : "bg-[#4f5457] text-white"}`}
                onClick={() => {
                  setActiveTag(index);
                  tag.callback?.();
                }}
                onKeyDown={() => {
                  setActiveTag(index);
                  tag.callback?.();
                }}
              >
                {tag.text}
              </div>
            );
          })}
        </div>
      </div>
      <div className="mx-16 mt-8 col-span-3 h-full lg:grid lg:grid-cols-subgrid [&>*]:lg:col-start-2 min-h-min">
        {children}
      </div>
    </section>
  );
}
