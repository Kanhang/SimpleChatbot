import { Select, useId } from "@fluentui/react-components";
import type { JSXElement } from "@fluentui/react-components";


interface AccountProps {
  account: number;
  setAccount: Function;
}

export const AccountSelections = (props: AccountProps): JSXElement => {
  const selectId = useId();
  const { account, setAccount } = props;
  const setVal = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAccount(event.target.value);
  }
  return (
    <>
      <div className="m-10 font-bold text-lg">Select an user account</div>
      <div className='w-2 flex flex-row m-5'>
        <label className="m-2" htmlFor={selectId}>Account</label>
        <Select id={selectId} value={account} onChange={setVal}>
          <option value={0}>Account 0</option> 
          <option value={1}>Account 1</option>
          <option value={2}>Account 2</option>
          <option value={3}>Account 3</option>
        </Select>
      </div>
    </>
  );
};

export default AccountSelections;