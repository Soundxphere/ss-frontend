import { Field } from "@ensdomains/thorin";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

interface TagProps {
  tag: string;
  index: number;
  handleDelete: (index: number) => void;
}

const Tag = ({ tag, index, handleDelete }: TagProps) => (
  <li
    key={index}
    className="flex gap-2 mx-2 px-2 items-center justify-between rounded-full bg-gray-700 my-2"
  >
    <span className="text-white">{tag}</span>
    <span
      className="flex cursor-pointer items-center justify-center rounded-full bg-gray-600 p-2 hover:bg-gray-500"
      onClick={() => handleDelete(index)}
    />
  </li>
);

const TagsInput = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [tags]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.trim();
    if ((e.keyCode === 32 || e.keyCode === 13) && value !== "") {
      setTags([...tags, value]);
      setInput("");
    }
    if (e.keyCode === 8 && value === "") {
      setTags(tags.slice(0, -1));
    }
  };

  const handleDelete = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <Field description="Input a space separated list of collaborators" label="Collaborators">
      <div className="relative flex w-full cursor-text items-center rounded-lg border">
        <ul className="flex flex-wrap items-center w-full">
          {tags.map((tag, index) => (
            <Tag tag={tag} index={index} handleDelete={handleDelete} />
          ))}
          <input
            type="text"
            id="tag-input"
            placeholder="Ens or Address"
            className="tag-input min-w-fit w-full flex-1 ml-2 border-none bg-transparent outline-none my-2"
            onKeyDown={handleKeyDown}
            value={input}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInput(e.target.value)
            }
            ref={inputRef}
          />
        </ul>
      </div>
    </Field>
  );
};

export default TagsInput;
