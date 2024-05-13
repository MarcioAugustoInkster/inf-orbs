import { useRef } from 'react';
import Accordion from "../../components/Accordion/Accordion";
import Icon from "../../components/Custom/Icon/Icon";
import Section from "../../components/Custom/Section/Section";
import { regions } from '../../utils/LazyData/List/Region';
import { AccordionItemProps } from '../../components/Accordion/AccordionProps';

const Region = () => {
  const menuListRef = useRef<AccordionItemProps[]>([]);

  if (regions !== undefined) {
    menuListRef.current = regions;
  }
  return (
    <Section>
      <div className="flex items-center justify-center mb-8">
        <Icon icon="globe-americas" size="lg" color="info" />
        <h1 className="text-4xl ml-2">Choose a Region</h1>
      </div>
      <div className="m-auto w-96">
        <Accordion items={menuListRef.current} keepOthersOpen={false} />
      </div>
    </Section>
  )
}

export default Region;
