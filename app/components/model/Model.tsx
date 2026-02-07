import { Select, useId } from "@fluentui/react-components";
import type { JSXElement } from "@fluentui/react-components";


interface ModelProps {
  model: string;
  setMessages: Function;
  setModel: Function;
}
const ModelSelections = (props: ModelProps): JSXElement => {
  const selectId = useId();
  const { model, setModel, setMessages } = props;
  const setVal = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setModel(event.target.value);
    setMessages([]);
  }
  return (
    <>
      <div className="m-10 font-bold text-lg">Choose your model</div>
      <div className='w-2 flex flex-row m-5'>
        <label className="m-2" htmlFor={selectId}>Model</label>
        <Select id={selectId} value={model} onChange={setVal}>
          <option value="arcee">Arcee</option>
          <option value="deepseek">Deepseek</option>
          <option value="random">Random</option>
        </Select>
      </div>
    </>
  );
};


export default ModelSelections;