import React from 'react';

export const DashboardQuote: React.FC = () => {
  return (
    <div className="mb-16 md:mb-24">
      <div className="content-wrapper">
        <div className="flex items-center justify-center py-6 sm:py-8">
          <blockquote className="flex gap-3 pt-2 text-2xl sm:text-3xl md:text-4xl lg:gap-4 lg:pt-0 lg:text-5xl text-slate-400 dark:text-slate-500">
            {/* Quote Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              role="img"
              fill="currentColor"
              className="-mt-1 h-8 sm:h-10 md:-mt-3 md:h-16 lg:h-20 text-slate-200 dark:text-slate-800 flex-shrink-0"
            >
              <path d="M7.27273 16.3833H0L5.30713 4H10.0737L7.27273 16.3833ZM17.199 16.3833H9.92629L15.2334 4H20L17.199 16.3833Z" />
            </svg>

            <span className="flex flex-col">
              <span className="leading-[1.2]">
                <em>Development: Turning</em>
              </span>

              <span className="flex items-center gap-2 leading-[1.2] lg:gap-4 my-1">
                <span className="mt-1 h-0.5 w-6 rounded-full bg-slate-300 lg:h-1 lg:w-20 dark:bg-slate-700"></span>
                <span>
                  <strong className="bg-gradient-to-r from-accent-600 to-accent-500 bg-clip-text font-extrabold text-transparent dark:from-accent-400 dark:to-accent-300">
                    Coffee
                  </strong>{" "}
                  into{" "}
                  <strong className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text font-extrabold text-transparent dark:from-blue-400 dark:to-cyan-300">
                    Code
                  </strong>
                </span>
                <span className="mt-1 h-0.5 w-6 rounded-full bg-slate-300 lg:h-1 lg:w-16 dark:bg-slate-700"></span>
              </span>

              <span className="leading-[1.2]">
                then{" "}
                <strong className="relative font-extrabold text-slate-800 dark:text-slate-100">
                  <span className="absolute -left-1 bottom-0 right-0 top-1 z-[-1] rounded-lg bg-accent-100 px-1 lg:-left-2 lg:-right-1 lg:bottom-0 lg:top-2 dark:bg-accent-900/40"></span>
                  Magic.
                </strong>
              </span>
            </span>
          </blockquote>
        </div>
      </div>
    </div>
  );
};
