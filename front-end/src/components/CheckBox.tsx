import Check from "./icons/Check";

interface ICheckBoxProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked: 1 | 0;
}

export default function CheckBox(props: ICheckBoxProps) {
  console.log(props.checked);
  return (
    <>
      <label className="cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          onChange={props.onChange}
          checked={props.checked ? true : false}
        />
        <Check className="absolute peer-checked:block hidden z-1  " />
        <div className="w-5 h-5 border-2 border-gray-400 rounded-sm peer-checked:border-(--primary) relative"></div>
      </label>
    </>
  );
}
