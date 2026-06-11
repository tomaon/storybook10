import { createSignal } from "solid-js";

export function Upper() {
  const [output, setOutput] = createSignal("");

  function onSubmit(e: SubmitEvent) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);

    setOutput((formData.get("text") as string).toUpperCase());
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <input name="text" type="text" />
        <button type="submit">Submit</button>
      </form>
      <output>{output()}</output>
    </>
  );
}
