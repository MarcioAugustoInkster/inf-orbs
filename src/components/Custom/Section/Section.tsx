import { FC } from 'react';
import { SectionProps } from './Section.interface';
import { twMerge } from 'tailwind-merge';

const Section: FC<SectionProps> = ((props) => {
  const { children, header, subheader, background } = props;
  return (
    <section className={twMerge("my-8 mx-1 md:mx-4", background)}>
      {header !== undefined &&
        <div className="mb-8">
          <h1 className="text-center text-4xl">{header}</h1>
          {subheader !== undefined && <h4 className="text-center text-xl mt-2">{subheader}</h4>}
        </div>
      }
      <div className="">
        {children}
      </div>
    </section>
  )
})

export default Section;
