import { Select, useId } from "@fluentui/react-components";
import type { JSXElement } from "@fluentui/react-components";


interface AgentProps {
  agent: string;
  setMessages: Function;
  setAgent: Function;
}
export const AgentSelections = (props: AgentProps): JSXElement => {
  const selectId = useId();
  const { agent, setAgent, setMessages } = props;
  const setVal = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAgent(event.target.value);
    setMessages([]);
  }
  return (
    <>
      <div className="m-10 font-bold text-lg">Front End AI Chating Bot</div>
      <div className='w-2 flex flex-row m-5'>
        <label className="m-2" htmlFor={selectId}>Agent</label>
        <Select id={selectId} value={agent} onChange={setVal}>
          <option value="CG">Code generation</option>
          <option value="CE">Concept explaining</option>
          <option value="IQ">Interview questions</option>
        </Select>
      </div>
    </>
  );
};

export default AgentSelections;